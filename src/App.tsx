import { useState, type FormEvent } from 'react'
import './App.css'
import {
  canSubmitGuess,
  createInitialRunState,
  isCorrectGuess,
  isValidAcceptedGuess,
  isValidGuessFormat,
  submitGuess,
  type RunState,
} from './game-logic/swga'
import {
  getAcceptedGuessesForWordLength,
  getAnswerForRound,
  getInitialAnswer,
} from './data/wordData'

function App() {
  const [runState, setRunState] = useState<RunState>(() => createInitialRunState(getInitialAnswer()))
  const [guessInput, setGuessInput] = useState('')
  const [statusMessage, setStatusMessage] = useState('Enter a guess for the current round.')

  const currentAcceptedGuesses = Array.from(
    new Set([runState.currentAnswer, ...getAcceptedGuessesForWordLength(runState.currentWordLength)]),
  )
  const guessesRemaining = Math.max(0, 6 - runState.guesses.length)
  const canSubmit = canSubmitGuess(runState)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      setStatusMessage('The run is already over.')
      return
    }

    const normalizedGuess = guessInput.trim().toLowerCase()

    if (!normalizedGuess) {
      setStatusMessage('Please enter a guess before submitting.')
      return
    }

    if (!isValidGuessFormat(normalizedGuess, runState.currentWordLength)) {
      setStatusMessage('That guess is not the correct length for this round.')
      return
    }

    if (!isValidAcceptedGuess(normalizedGuess, currentAcceptedGuesses)) {
      setStatusMessage('That guess is not accepted for this round.')
      return
    }

    const wasCorrect = isCorrectGuess(normalizedGuess, runState.currentAnswer)
    const nextAnswer = getAnswerForRound(runState.currentRound + 1)
    const nextState = submitGuess(runState, normalizedGuess, currentAcceptedGuesses, nextAnswer)

    setRunState(nextState)
    setGuessInput('')

    if (nextState.status === 'completed') {
      setStatusMessage('You completed the full run!')
    } else if (nextState.status === 'lost') {
      setStatusMessage('No more guesses remain. The run is over.')
    } else if (wasCorrect) {
      setStatusMessage(`Correct! Advancing to round ${nextState.currentRound}.`)
    } else {
      setStatusMessage(`Not quite. ${guessesRemaining - 1} guesses remaining.`)
    }
  }

  const handleRestart = () => {
    setRunState(createInitialRunState(getInitialAnswer()))
    setGuessInput('')
    setStatusMessage('A fresh run begins. Enter your first guess.')
  }

  return (
    <main className="app-shell">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Playable MVP</p>
            <h1>SWGA</h1>
          </div>
          <button type="button" className="secondary-button" onClick={handleRestart}>
            Restart
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Round</span>
            <strong>{runState.currentRound}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Word length</span>
            <strong>{runState.currentWordLength}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Score</span>
            <strong>{runState.totalScore}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Highest reached</span>
            <strong>{runState.highestWordLengthReached}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Guesses left</span>
            <strong>{guessesRemaining}</strong>
          </div>
        </div>

        <form className="guess-form" onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="guess-input">
            Enter your guess
          </label>
          <div className="input-row">
            <input
              id="guess-input"
              className="guess-input"
              value={guessInput}
              onChange={(event) => setGuessInput(event.target.value)}
              placeholder={`Enter a ${runState.currentWordLength}-letter guess`}
              disabled={!canSubmit}
              autoComplete="off"
              spellCheck={false}
            />
            <button type="submit" className="primary-button" disabled={!canSubmit}>
              Submit
            </button>
          </div>
        </form>

        <div className="status-box" aria-live="polite">
          <strong>Status</strong>
          <p>{statusMessage}</p>
        </div>

        <div className="guess-history">
          <h2>Current round guesses</h2>
          {runState.guesses.length === 0 ? (
            <p className="empty-state">No guesses yet. Start the round with a valid word.</p>
          ) : (
            <div className="guess-list">
              {runState.guesses.map((submittedGuess) => (
                <div className="guess-card" key={`${submittedGuess.guess}-${submittedGuess.guessNumber}`}>
                  <div className="guess-label">{submittedGuess.guess}</div>
                  <div className="feedback-row">
                    {submittedGuess.feedback.map((feedback, index) => (
                      <span
                        className={`feedback-cell ${feedback}`}
                        key={`${submittedGuess.guess}-${submittedGuess.guessNumber}-${index}`}
                      >
                        {submittedGuess.guess[index]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
