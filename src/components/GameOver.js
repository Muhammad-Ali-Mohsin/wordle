import { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { correctWord, currentAttempt, results } = useContext(AppContext);

  return (
    <div>
      <h1 className="game-over-title">Game Over</h1>
      <h3>
        {results.guessedCorrectly
          ? "You guessed in " + currentAttempt + " attempts"
          : "Better luck next time!"}
      </h3>
      <p className="game-over-message">The correct word was:</p>
      <div className="correct-word">{correctWord.toUpperCase()}</div>

      <button
        className="play-again-button"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
}

export default GameOver;
