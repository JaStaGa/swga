import { useState, type FormEvent } from 'react'
import './App.css'
import {
  canSubmitGuess,
  createInitialRunState,
  isCorrectGuess,
  isRepeatedGuess,
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
  const [statusTone, setStatusTone] = useState<'info' | 'success' | 'warning'>('info')

  const currentAcceptedGuesses = Array.from(
    new Set([runState.currentAnswer, ...getAcceptedGuessesForWordLength(runState.currentWordLength)]),
  )
  const guessesRemaining = Math.max(0, 6 - runState.guesses.length)
  const canSubmit = canSubmitGuess(runState)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      setStatusMessage('The run is already over.')
      setStatusTone('warning')
      return
    }

    const normalizedGuess = guessInput.trim().toLowerCase()

    if (!normalizedGuess) {
      setStatusMessage('Please enter a guess before submitting.')
      setStatusTone('warning')
      return
    }

    if (!isValidGuessFormat(normalizedGuess, runState.currentWordLength)) {
      setStatusMessage(`Use exactly ${runState.currentWordLength} lowercase letters for this round.`)
      setStatusTone('warning')
      return
    }

    if (!isValidAcceptedGuess(normalizedGuess, currentAcceptedGuesses)) {
      setStatusMessage('That word is not in the accepted word bank for this round.')
      setStatusTone('warning')
      return
    }

    if (isRepeatedGuess(runState, normalizedGuess)) {
      setStatusMessage('You already guessed that word.')
      setStatusTone('warning')
      return
    }

    const wasCorrect = isCorrectGuess(normalizedGuess, runState.currentAnswer)
    const nextAnswer = wasCorrect
      ? getAnswerForRound(runState.currentRound + 1)
      : undefined
    const nextState = submitGuess(runState, normalizedGuess, currentAcceptedGuesses, nextAnswer)

    setRunState(nextState)
    setGuessInput('')

    if (nextState.status === 'completed') {
      setStatusMessage('You completed the full run!')
      setStatusTone('success')
    } else if (nextState.status === 'lost') {
      setStatusMessage(`No more guesses remain. The word was "${runState.currentAnswer.toUpperCase()}".`)
      setStatusTone('warning')
    } else if (wasCorrect) {
      setStatusMessage(`Correct! You advance to round ${nextState.currentRound} with a ${nextState.currentWordLength}-letter word.`)
      setStatusTone('success')
    } else {
      setStatusMessage(`Not quite. ${guessesRemaining - 1} guesses remaining.`)
      setStatusTone('info')
    }
  }

  const handleRestart = () => {
    setRunState(createInitialRunState(getInitialAnswer()))
    setGuessInput('')
    setStatusMessage('A fresh run begins. Enter your first guess.')
    setStatusTone('info')
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

        <div className="stats-row">
          <div className="stat-pill">
            <span>Round</span>
            <strong>{runState.currentRound}</strong>
          </div>
          <div className="stat-pill">
            <span>Word length</span>
            <strong>{runState.currentWordLength}</strong>
          </div>
          <div className="stat-pill">
            <span>Score</span>
            <strong>{runState.totalScore}</strong>
          </div>
          <div className="stat-pill">
            <span>Highest</span>
            <strong>{runState.highestWordLengthReached}</strong>
          </div>
          <div className="stat-pill">
            <span>Guesses left</span>
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

        <div className={`status-box ${statusTone}`} aria-live="polite">
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
                  <div className="feedback-row" aria-label={`${submittedGuess.guess} feedback`}>
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
