import { useContext, useCallback, useEffect } from "react";
import { AppContext } from "../App";
import Key from "./Key";

function Keyboard() {
  const { onEnter, onDelete, onSelectLetter, incorrectLetters } =
    useContext(AppContext);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // Determines which function to call when a key on the keyboard is pressed
  // Wrapped in useCallback so the function doesn't get recreated when it's not needed
  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      [...keys1, ...keys2, ...keys3].forEach((key) => {
        if (event.key.toUpperCase() === key) {
          onSelectLetter(key);
        }
      });
    }
  });

  // Adds an event listener to check for when the keyboard is used
  // Wrapped in useEffect as the event listener only needs to be set once
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => {
          return (
            <Key keyVal={key} incorrect={incorrectLetters.includes(key)} />
          );
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return (
            <Key keyVal={key} incorrect={incorrectLetters.includes(key)} />
          );
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey={true} />
        {keys3.map((key) => {
          return (
            <Key keyVal={key} incorrect={incorrectLetters.includes(key)} />
          );
        })}
        <Key keyVal={"DELETE"} bigKey={true} />
      </div>
    </div>
  );
}

export default Keyboard;
