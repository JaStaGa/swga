import { describe, expect, it } from "vitest";

import {
  calculateRoundScore,
  evaluateGuess,
  isCorrectGuess,
  isValidAcceptedGuess,
  isValidGuessFormat,
} from "../game-logic/swga";

describe("SWGA game logic", () => {
  it("returns all green feedback for a perfect guess", () => {
    expect(evaluateGuess("apple", "apple")).toEqual([
      "green",
      "green",
      "green",
      "green",
      "green",
    ]);
  });

  it("returns all red feedback when no letters are available", () => {
    expect(evaluateGuess("zzzzz", "apple")).toEqual([
      "red",
      "red",
      "red",
      "red",
      "red",
    ]);
  });

  it("returns yellow feedback for letters that exist in a different position", () => {
    expect(evaluateGuess("stare", "crate")).toEqual([
      "red",
      "yellow",
      "green",
      "yellow",
      "green",
    ]);
  });

  it("handles duplicate letters in the guess without over-awarding yellows", () => {
    expect(evaluateGuess("aabc", "baaa")).toEqual([
      "yellow",
      "green",
      "yellow",
      "red",
    ]);
  });

  it("handles duplicate letters in the answer without over-awarding yellows", () => {
    expect(evaluateGuess("aab", "baa")).toEqual([
      "yellow",
      "green",
      "yellow",
    ]);
  });

  it("normalizes guess and answer case when evaluating feedback", () => {
    expect(evaluateGuess("APPLE", "apple")).toEqual([
      "green",
      "green",
      "green",
      "green",
      "green",
    ]);
  });

  it("returns the correct score for guesses 1 through 6", () => {
    expect(calculateRoundScore(1)).toBe(5);
    expect(calculateRoundScore(2)).toBe(4);
    expect(calculateRoundScore(3)).toBe(3);
    expect(calculateRoundScore(4)).toBe(2);
    expect(calculateRoundScore(5)).toBe(1);
    expect(calculateRoundScore(6)).toBe(0);
  });

  it("returns null for invalid score inputs", () => {
    expect(calculateRoundScore(0)).toBeNull();
    expect(calculateRoundScore(7)).toBeNull();
    expect(calculateRoundScore(1.5)).toBeNull();
  });

  it("validates guess format correctly", () => {
    expect(isValidGuessFormat("apple", 5)).toBe(true);
    expect(isValidGuessFormat("APPLE", 5)).toBe(true);
    expect(isValidGuessFormat("ApPlE", 5)).toBe(true);
    expect(isValidGuessFormat("appl", 5)).toBe(false);
    expect(isValidGuessFormat("app!e", 5)).toBe(false);
    expect(isValidGuessFormat("apple ", 5)).toBe(false);
  });

  it("validates accepted guesses", () => {
    const acceptedGuesses = ["apple", "crane", "spare"];

    expect(isValidAcceptedGuess("apple", acceptedGuesses)).toBe(true);
    expect(isValidAcceptedGuess("APPLE", acceptedGuesses)).toBe(true);
    expect(isValidAcceptedGuess("grape", acceptedGuesses)).toBe(false);
  });

  it("correctly identifies a correct guess", () => {
    expect(isCorrectGuess("apple", "apple")).toBe(true);
    expect(isCorrectGuess("APPLE", "apple")).toBe(true);
    expect(isCorrectGuess("apple", "grape")).toBe(false);
  });
});