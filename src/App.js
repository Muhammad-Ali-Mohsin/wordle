import "./App.css";
import Board, { defaultBoard } from "./components/Board";
import Keyboard from "./components/Keyboard";
import { createContext, useEffect, useState } from "react";
import wordBank from "./word-bank.txt";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(defaultBoard);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [words, setWords] = useState(new Set());
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [results, setResults] = useState({
    gameOver: false,
    guessedCorrectly: false,
  });

  // Loads in the words and then picks a random word
  // Empty dependency list so it only runs once on page load
  useEffect(() => {
    const getGameData = async () => {
      let words;
      let correctWord;

      await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
          const wordsArr = result.split("\r\n");
          correctWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
          words = new Set(wordsArr);
        });

      return { words, correctWord };
    };

    getGameData().then((gameData) => {
      setWords(gameData.words);
      setCorrectWord(gameData.correctWord);
    });
  }, []);

  const onSelectLetter = (letter) => {
    // Makes sure the cursor hasn't reached the end of the word of the current attempt
    if (cursorPosition < 5) {
      // Creates a new board with the entered letter and sets it as the current board
      const newBoard = [...board];
      newBoard[currentAttempt][cursorPosition] = letter;
      setBoard(newBoard);

      // Moves the cursor to the next letter slot
      setCursorPosition(cursorPosition + 1);
    }
  };

  const onDelete = () => {
    // Makes sure there is a valid letter to delete
    if (cursorPosition !== 0) {
      // Removes the letter from the board
      const newBoard = [...board];
      newBoard[currentAttempt][cursorPosition - 1] = "";
      setBoard(newBoard);

      // Moves the cursor back by one letter slot
      setCursorPosition(cursorPosition - 1);
    }
  };

  const onEnter = () => {
    // Makes sure a full word has been entered
    if (cursorPosition === 5) {
      const currentWord = board[currentAttempt].join("").toLowerCase();

      // Makes sure the current word is a valid word and if it is, it gets accepted
      if (words.has(currentWord)) {
        setCurrentAttempt(currentAttempt + 1);
        setCursorPosition(0);
      } else {
        alert("Word not in word list!");
      }

      // Checks if the word is the correct word or if 6 words have been entered
      // Either of these are game over conditions
      if (currentWord === correctWord) {
        setResults({ gameOver: true, guessedCorrectly: true });
      } else if (currentAttempt === 5) {
        setResults({ gameOver: true, guessedCorrectly: false });
      }
    }
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          cursorPosition,
          setCursorPosition,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          incorrectLetters,
          setIncorrectLetters,
          setResults,
          results,
        }}
      >
        <div className="game">
          <Board />
          {results.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
