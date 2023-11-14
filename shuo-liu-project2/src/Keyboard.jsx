import React, { useContext, useCallback, useEffect } from "react";
import { AppContext } from "../App";

// Key Component
function Key({ keyVal, disabled }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  const keyStyle = `key ${keyVal.length > 1 ? "big" : ""} ${disabled ? "disabled" : ""}`;

  return (
    <div className={keyStyle} onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

// Keyboard Component
function Keyboard() {
  const allKeys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"
  ];

  const { disabledLetters, gameOver, onSelectLetter, onEnter, onDelete } = useContext(AppContext);

  const handleKeyboard = useCallback((event) => {
    if (gameOver.gameOver) return;
    const key = event.key.toUpperCase();
    if (key === "ENTER") {
      onEnter();
    } else if (key === "BACKSPACE") {
      onDelete();
    } else if (allKeys.includes(key)) {
      onSelectLetter(key);
    }
  }, [gameOver, onSelectLetter, onEnter, onDelete]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      {allKeys.map(keyVal => (
        <Key key={keyVal} keyVal={keyVal} disabled={disabledLetters.includes(keyVal)} />
      ))}
    </div>
  );
}

export { Keyboard, Key };
