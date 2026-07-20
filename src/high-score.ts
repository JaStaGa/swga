export const HIGH_SCORE_STORAGE_KEY = 'swga:highScore'

export function parseStoredHighScore(storedValue: string | null): number {
  if (storedValue === null) {
    return 0
  }

  if (!/^\d+$/.test(storedValue)) {
    return 0
  }

  const parsedValue = Number(storedValue)

  return Number.isSafeInteger(parsedValue) && parsedValue >= 0 ? parsedValue : 0
}

export function getUpdatedHighScore(savedScore: number, finalScore: number): number {
  return finalScore > savedScore ? finalScore : savedScore
}
