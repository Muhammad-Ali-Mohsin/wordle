import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const { board, correctWord, currentAttempt, setIncorrectLetters } =
    useContext(AppContext);
  const [letterState, setLetterState] = useState("");

  // Gets the letter on the board
  const letter = board[attemptVal][letterPos];

  // Sets the letter state. Wrapped in useEffect as the state only changes when a word
  // has been entered
  useEffect(() => {
    // Checks if the letter is part of a word that has been entered
    if (currentAttempt > attemptVal) {
      // Checks if the letter is in the correct position
      if (letter.toLowerCase() === correctWord[letterPos]) {
        setLetterState("correct-letter");
      } else {
        // Total count of that letter in the correct word
        const totalLetters = correctWord.split(letter.toLowerCase()).length - 1;

        // Find how many of the letter in the entered word are in the correct place
        // These should have priority for being shown as correct over the ones in the
        // incorrect locations
        let correctLetterCount = 0;
        for (let i = 0; i < 5; i++) {
          if (
            board[attemptVal][i] === letter &&
            letter.toLowerCase() === correctWord[i]
          ) {
            correctLetterCount += 1;
          }
        }

        // Finds how many remaining letters there are of that letter that are in the incorrect locations
        let incorrectLetterCount = totalLetters - correctLetterCount;

        // Loops up to the current letter (non-inclusive) and decrements if a letter is found to be
        // in the correct word but in the wrong position
        for (let i = 0; i < letterPos; i++) {
          if (
            board[attemptVal][i] === letter &&
            letter.toLowerCase() !== correctWord[i]
          ) {
            incorrectLetterCount -= 1;
          }
        }

        // If there are still more of the letter in incorrect locations, mark the letter as having an incorrect
        // location. Otherwise it is an incorrect letter as there are no more of that letter in the word.
        if (incorrectLetterCount > 0) {
          setLetterState("incorrect-location");
        } else {
          setLetterState("incorrect-letter");
        }
      }

      // Marks a letter as incorrect if it not in the word
      if (!correctWord.includes(letter.toLowerCase())) {
        setIncorrectLetters((prev) => [...prev, letter]);
      }
    }
  }, [currentAttempt]);

  return <div className={"letter " + letterState}>{letter}</div>;
}

export default Letter;
