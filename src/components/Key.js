import { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey, incorrect }) {
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

  // Determines which function should be called based on the key clicked
  const onKeyClick = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  // Checks whether the key should be big or marked as incorrect (greyed out)
  const className =
    "key" + (bigKey ? " big-key" : "") + (incorrect ? " incorrect-key" : "");

  return (
    <div className={className} onClick={onKeyClick}>
      {keyVal}
    </div>
  );
}

export default Key;
