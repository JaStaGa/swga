import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const scriptDirectory = path.dirname(scriptFile);
const projectRoot = path.resolve(scriptDirectory, "..");

const answersDirectory = path.join(
    projectRoot,
    "src",
    "data",
    "answers",
);

const acceptedGuessesDirectory = path.join(
    projectRoot,
    "src",
    "data",
    "accepted-guesses",
);

const minimumWordLength = 1;
const maximumWordLength = 20;
const lowercaseLettersOnly = /^[a-z]+$/;

function getWordFileName(wordLength) {
    return `${String(wordLength).padStart(2, "0")}.json`;
}

function getErrorMessage(error) {
    return error instanceof Error ? error.message : String(error);
}

async function readWordList(directory, wordLength) {
    const fileName = getWordFileName(wordLength);
    const filePath = path.join(directory, fileName);

    let fileContents;

    try {
        fileContents = await readFile(filePath, "utf8");
    } catch (error) {
        throw new Error(
            `Could not read ${filePath}: ${getErrorMessage(error)}`,
        );
    }

    let parsedData;

    try {
        parsedData = JSON.parse(fileContents);
    } catch (error) {
        throw new Error(
            `Invalid JSON in ${filePath}: ${getErrorMessage(error)}`,
        );
    }

    if (!Array.isArray(parsedData)) {
        throw new Error(`${filePath} must contain a JSON array.`);
    }

    return {
        filePath,
        words: parsedData,
    };
}

function validateWordEntries(filePath, words, expectedLength) {
    for (const word of words) {
        if (typeof word !== "string") {
            throw new Error(
                `${filePath} contains a non-string entry.`,
            );
        }

        if (!lowercaseLettersOnly.test(word)) {
            throw new Error(
                `${filePath} contains an invalid word: "${word}".`,
            );
        }

        if (word.length !== expectedLength) {
            throw new Error(
                `${filePath} contains "${word}", which has length ${word.length} instead of ${expectedLength}.`,
            );
        }
    }
}

function validateNoDuplicates(filePath, words) {
    const seenWords = new Set();

    for (const word of words) {
        if (seenWords.has(word)) {
            throw new Error(
                `${filePath} contains the duplicate word "${word}".`,
            );
        }

        seenWords.add(word);
    }
}

function validateAlphabeticalOrder(filePath, words) {
    const sortedWords = [...words].sort(
        (firstWord, secondWord) =>
            firstWord.localeCompare(secondWord),
    );

    for (let index = 0; index < words.length; index += 1) {
        if (words[index] !== sortedWords[index]) {
            throw new Error(
                `${filePath} is not alphabetically sorted near "${words[index]}".`,
            );
        }
    }
}

function validateAnswersAreAccepted(
    answerFilePath,
    answerWords,
    acceptedGuessFilePath,
    acceptedGuessWords,
) {
    const acceptedGuessSet = new Set(acceptedGuessWords);

    for (const answer of answerWords) {
        if (!acceptedGuessSet.has(answer)) {
            throw new Error(
                `${answerFilePath} contains "${answer}", but it is missing from ${acceptedGuessFilePath}.`,
            );
        }
    }
}

console.log("Checking SWGA word-data files...");

let checkedFileCount = 0;

for (
    let wordLength = minimumWordLength;
    wordLength <= maximumWordLength;
    wordLength += 1
) {
    const answers = await readWordList(
        answersDirectory,
        wordLength,
    );

    validateWordEntries(
        answers.filePath,
        answers.words,
        wordLength,
    );

    validateNoDuplicates(
        answers.filePath,
        answers.words,
    );

    validateAlphabeticalOrder(
        answers.filePath,
        answers.words,
    );

    checkedFileCount += 1;

    const acceptedGuesses = await readWordList(
        acceptedGuessesDirectory,
        wordLength,
    );

    validateWordEntries(
        acceptedGuesses.filePath,
        acceptedGuesses.words,
        wordLength,
    );

    validateNoDuplicates(
        acceptedGuesses.filePath,
        acceptedGuesses.words,
    );

    validateAlphabeticalOrder(
        acceptedGuesses.filePath,
        acceptedGuesses.words,
    );

    validateAnswersAreAccepted(
        answers.filePath,
        answers.words,
        acceptedGuesses.filePath,
        acceptedGuesses.words,
    );

    checkedFileCount += 1;
}

console.log(
    `Successfully validated the format, word entries, duplicates, alphabetical order, and answer coverage of ${checkedFileCount} JSON files.`,
);