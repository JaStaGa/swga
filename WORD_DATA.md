# SWGA Word Data

SWGA uses two separate word collections:

* **Answer pools:** Curated words that may be selected as the answer for a round.
* **Accepted guesses:** A larger dictionary of words that players may submit as guesses.

## File Organization

Words are divided by length:

```text
src/data/answers/01.json through 20.json
src/data/accepted-guesses/01.json through 20.json
```

For example, every word in `05.json` must contain exactly five letters.

## General Requirements

Every stored word must:

* Use lowercase English letters only: `a` through `z`
* Contain no spaces, hyphens, apostrophes, punctuation, or numbers
* Match the length represented by its filename
* Appear only once within its file
* Be stored in alphabetical order

## Answer-Pool Requirements

Answer words should be recognizable and reasonably guessable for their length.

Answer pools should exclude:

* Proper names
* Abbreviations and acronyms
* Offensive or inappropriate words
* Extremely obscure words
* Alternate spellings that would feel unfair without warning

Every answer word must also appear in the accepted-guesses file for the same word length.

## Accepted-Guess Requirements

Accepted-guess files may contain more words than the answer pools, including less common valid words.

They should still exclude:

* Proper names
* Abbreviations and acronyms
* Entries containing non-letter characters
* Words that should not be accepted in the game

## Validation

The validation script will check:

* Valid JSON formatting
* Correct word lengths
* Lowercase letters only
* Duplicate entries
* Alphabetical ordering
* Whether every answer is also an accepted guess

Word sources and manual-review decisions will be documented here as the data is added.
