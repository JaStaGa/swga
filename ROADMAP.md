# SWGA Project Roadmap

SWGA is a progressive word-guessing game in which each successful round increases the answer length by one letter. Development is planned across eight phases, beginning with the game rules and frontend foundation and ending with a ranked web beta.

The detailed Google Doc TODO remains the source of truth for individual tasks and scheduling changes. This roadmap summarizes the major repository milestones.

## Phase 1: Rules and Foundation

**Target: June 21–July 5, 2026**

* [x] Finalize the six-guess rule
* [x] Finalize scoring
* [x] Set the maximum answer length to 20 letters
* [x] Define loss, completion, ties, and invalid guesses
* [x] Define guess, round, run, and ranked run
* [x] Choose React, TypeScript, and Vite
* [x] Create the local project and GitHub repository
* [x] Establish the component, game-logic, data, and test folders
* [x] Add the project roadmap
* [x] Replace the default Vite README
* [x] Add answer pools for word lengths 1–20
* [x] Add a larger accepted-guess dictionary
* [x] Validate and clean all word data
* [x] Manually review starter answer pools

## Phase 2: Core Game Engine

**Target: July 12–August 2, 2026**

* [x] Build the green, yellow, and absent-letter feedback algorithm
* [x] Process correctly positioned letters before misplaced letters
* [x] Handle repeated-letter guesses correctly
* [x] Add tests for short words, long words, and duplicate letters
* [x] Build the game-state and round-progression system
* [x] Select and store the current answer
* [x] Record submitted guesses
* [x] Advance from one-letter words through 20-letter words
* [x] End a run after six unsuccessful guesses
* [x] Implement the 5, 4, 3, 2, 1, and 0-point scoring system
* [ ] Track total score and highest level reached
* [x] Add completion behavior after the 20-letter round

## Phase 3: Playable Interface

**Target: August 9–August 23, 2026**

* [ ] Build the game board and word tiles
* [ ] Add physical-keyboard input
* [ ] Add an on-screen keyboard
* [ ] Add Enter and Delete controls
* [ ] Display invalid-word messages
* [ ] Create responsive desktop and mobile layouts
* [ ] Display letter feedback with accessible contrast
* [ ] Display the current level, score, and remaining guesses
* [ ] Add start, active-game, and results screens
* [ ] Add restart controls
* [ ] Store the local high score
* [ ] Complete a playable offline MVP from one through 20 letters

## Phase 4: Testing and Web Release

**Target: August 30–September 13, 2026**

* [ ] Play at least 20 complete test runs
* [ ] Record confusing, unfair, or overly obscure answers
* [ ] Test common mobile screen sizes
* [ ] Test refresh and restart behavior
* [ ] Fix major gameplay bugs
* [ ] Connect the GitHub repository to Vercel
* [ ] Confirm production builds
* [ ] Test the live site on desktop and mobile
* [ ] Add a feedback link
* [ ] Run a small private beta
* [ ] Review difficulty progression and player confusion
* [ ] Adjust instructions, scoring, colors, and word pools

## Phase 5: Accounts and Backend

**Target: September 20–October 11, 2026**

* [ ] Design the database and backend project
* [ ] Store users, profiles, sessions, guesses, and scores
* [ ] Add ranked-run limits
* [ ] Add email and password registration
* [ ] Add email verification
* [ ] Add login, logout, and password reset
* [ ] Add unique display names and username restrictions
* [ ] Add account deletion and basic moderation controls
* [ ] Save completed game sessions
* [ ] Store score, highest level, total guesses, and timestamps
* [ ] Store the word-sequence identifier
* [ ] Record whether each run was practice or ranked

## Phase 6: Leaderboards and Score Security

**Target: October 18–November 8, 2026**

* [ ] Build the all-time leaderboard
* [ ] Rank by total score and highest word length reached
* [ ] Define leaderboard tie-breaking information
* [ ] Link leaderboard entries to player profiles or display names
* [ ] Build the weekly leaderboard
* [ ] Define weekly start and end times
* [ ] Display current-week results and the previous winner
* [ ] Establish clear time-zone rules
* [ ] Move ranked-run validation to the server
* [ ] Validate answers, guesses, scoring, and timestamps
* [ ] Reject impossible game durations
* [ ] Record suspicious activity
* [ ] Add separate practice and ranked modes
* [ ] Allow unlimited practice runs
* [ ] Limit ranked runs to five per day
* [ ] Keep practice scores off official leaderboards

## Phase 7: Coins, Rules, and Promotion

**Target: November 15–November 29, 2026**

* [ ] Design the coin economy
* [ ] Award one coin for each completed level
* [ ] Define the cost of an additional ranked run
* [ ] Keep coins nontransferable and nonredeemable for cash
* [ ] Prevent purchased coins from buying entries into cash-prize contests
* [ ] Prepare the privacy policy
* [ ] Prepare the terms of use
* [ ] Define the account-deletion policy
* [ ] Draft contest eligibility and date rules
* [ ] Define prize amounts and tie-breaking procedures
* [ ] Define cheating and disqualification rules
* [ ] Create a promotional page and video outline
* [ ] Explain the game and demonstrate a complete round
* [ ] Show the developer score and leaderboard
* [ ] Link to official rules before advertising any prize

## Phase 8: Release Candidate

**Target: December 6–December 13, 2026**

* [ ] Configure the website as a Progressive Web App
* [ ] Add home-screen installation support
* [ ] Test loading and offline behavior
* [ ] Complete performance testing
* [ ] Test across major browsers
* [ ] Publish the final ranked web beta
* [ ] Monitor errors and suspicious scores
* [ ] Evaluate whether engagement supports advertising
* [ ] Decide whether to run a legally reviewed cash contest
* [ ] Decide whether to begin iOS and Android packaging

## Current Development Focus

The current milestone is Phase 2: finishing the core game engine.

Recently completed:

1. Populated answer and accepted-guess word data for lengths 1–20.
2. Added automated word-data validation.
3. Manually reviewed the starter answer pools.
4. Implemented the core letter-feedback algorithm.
5. Implemented scoring logic.
6. Added automated tests for feedback, duplicate-letter behavior, scoring, guess-format validation, and accepted-guess validation.
7. Implemented the run-state and round-progression system.
8. Added automated tests for invalid guesses, six-guess losses, score accumulation, round advancement, and completion after round 20.

Next tasks:

1. Add at least one explicit long-word feedback test.
2. Track highest level reached / highest word length reached.
3. Clean up any remaining game-logic edge cases before connecting the logic to the UI.
