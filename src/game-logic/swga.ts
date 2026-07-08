export type GuessFeedback = "green" | "yellow" | "red";

function normalizeGuess(guess: string): string {
  return guess.toLowerCase();
}

export function evaluateGuess(
  guess: string,
  answer: string,
): GuessFeedback[] {
  const normalizedGuess = normalizeGuess(guess);
  const normalizedAnswer = normalizeGuess(answer);

  if (normalizedGuess.length !== normalizedAnswer.length) {
    throw new Error("Guess and answer must have the same length.");
  }

  const feedback: GuessFeedback[] = Array(normalizedGuess.length).fill("red");
  const remainingLetters = new Map<string, number>();

  for (const letter of normalizedAnswer) {
    remainingLetters.set(letter, (remainingLetters.get(letter) ?? 0) + 1);
  }

  for (let index = 0; index < normalizedGuess.length; index += 1) {
    if (normalizedGuess[index] === normalizedAnswer[index]) {
      feedback[index] = "green";
      remainingLetters.set(
        normalizedGuess[index],
        (remainingLetters.get(normalizedGuess[index]) ?? 0) - 1,
      );
    }
  }

  for (let index = 0; index < normalizedGuess.length; index += 1) {
    if (feedback[index] === "green") {
      continue;
    }

    const letter = normalizedGuess[index];
    const remainingCount = remainingLetters.get(letter) ?? 0;

    if (remainingCount > 0) {
      feedback[index] = "yellow";
      remainingLetters.set(letter, remainingCount - 1);
    }
  }

  return feedback;
}

export function calculateRoundScore(guessNumber: number): number | null {
  if (!Number.isInteger(guessNumber) || guessNumber < 1 || guessNumber > 6) {
    return null;
  }

  return Math.max(0, 6 - guessNumber);
}

export function isCorrectGuess(guess: string, answer: string): boolean {
  return normalizeGuess(guess) === normalizeGuess(answer);
}

export function isValidGuessFormat(guess: string, wordLength: number): boolean {
  if (!Number.isInteger(wordLength) || wordLength < 1) {
    return false;
  }

  const normalizedGuess = normalizeGuess(guess);

  return /^[a-z]+$/.test(normalizedGuess) && normalizedGuess.length === wordLength;
}

export function isValidAcceptedGuess(
  guess: string,
  acceptedGuesses: readonly string[],
): boolean {
  return acceptedGuesses.some(
    (acceptedGuess) => normalizeGuess(acceptedGuess) === normalizeGuess(guess),
  );
}