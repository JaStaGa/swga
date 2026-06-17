# SWGA

SWGA, or Simple Word Game App, is a progressive word-guessing game built with React, TypeScript, and Vite.

Players begin by guessing a one-letter word. Each successfully completed round increases the answer length by one letter. A run continues until the player fails a round or completes the 20-letter round.

## Current Status

SWGA is currently in the rules, project setup, and data-preparation stage.

Completed so far:

* Core game terminology defined
* Six-guess rule defined
* Maximum answer length set to 20 letters
* React, TypeScript, and Vite project created
* GitHub repository created
* Initial source folders established
* Development roadmap added

Scoring is still being finalized before implementation begins.

## Planned Gameplay

* Six guesses per round
* Green feedback for a correct letter in the correct position
* Yellow feedback for a correct letter in the wrong position
* Absent-letter feedback for letters not used in the answer
* Increasing word length after each successful round
* Score based on the number of guesses required
* Practice and ranked modes
* Local statistics and online leaderboards

## Technology

* React
* TypeScript
* Vite
* CSS
* Browser local storage
* A backend and database planned for later phases

## Project Structure

```text
src/
├── components/    Reusable interface components
├── data/          Word lists and static game data
├── game-logic/    Guess evaluation, scoring, and progression
├── tests/         Game-logic and interface tests
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Local Development

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the planned development phases and current progress.
