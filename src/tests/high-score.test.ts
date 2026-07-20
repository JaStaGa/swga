import { describe, expect, it } from 'vitest'

import {
  getUpdatedHighScore,
  HIGH_SCORE_STORAGE_KEY,
  parseStoredHighScore,
} from '../high-score'

describe('high-score helpers', () => {
  it('uses the required storage key', () => {
    expect(HIGH_SCORE_STORAGE_KEY).toBe('swga:highScore')
  })

  it.each([
    ['0', 0],
    ['42', 42],
    ['9007199254740991', 9007199254740991],
  ])('parses the valid stored integer %s', (storedValue, expected) => {
    expect(parseStoredHighScore(storedValue)).toBe(expected)
  })

  it.each([
    [null, 0],
    ['not-a-number', 0],
    ['-1', 0],
    ['4.5', 0],
    ['4.0', 0],
    ['Infinity', 0],
    ['NaN', 0],
  ])('treats the invalid stored value %s as 0', (storedValue, expected) => {
    expect(parseStoredHighScore(storedValue)).toBe(expected)
  })

  it('updates only when the final score is greater than the saved score', () => {
    expect(getUpdatedHighScore(10, 11)).toBe(11)
    expect(getUpdatedHighScore(10, 10)).toBe(10)
    expect(getUpdatedHighScore(10, 9)).toBe(10)
  })
})
