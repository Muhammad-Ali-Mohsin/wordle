import Letter from "./Letter";

export const defaultBoard = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

function Board() {
  // Creates 6 rows for each word attempt
  const rows = [];
  for (let i = 0; i < 6; i++) {
    // Creates 5 letter slots for each letter in each word
    const letters = [];
    for (let j = 0; j < 5; j++) {
      letters.push(<Letter letterPos={j} attemptVal={i} />);
    }
    rows.push(<div className="row">{letters}</div>);
  }

  return <div className="board">{rows}</div>;
}

export default Board;
