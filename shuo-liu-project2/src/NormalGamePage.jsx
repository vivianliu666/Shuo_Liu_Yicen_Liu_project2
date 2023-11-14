import React, { useState, useEffect } from 'react';
import { Keyboard } from './Keyboard';

function NormalGamePage({ wordList }) {
  const [targetWord, setTargetWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(6);
  const [feedback, setFeedback] = useState([]);
  const [gameStatus, setGameStatus] = useState('Normal Mode');
  const [attemptHistory, setAttemptHistory] = useState([]);

  useEffect(() => {
    const newTargetWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(newTargetWord);
  }, [wordList]);

  const handleKeyPress = (key) => {
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'DELETE') {
      setUserInput(userInput.slice(0, -1));
    } else if (userInput.length < 6) {
      setUserInput(userInput + key);
    }
  };

  const submitGuess = () => {
    if (userInput.length !== 6) {
      alert('Please enter a 6-letter word.');
      return;
    }

    const newFeedback = userInput.split('').map((letter, index) => {
      if (targetWord[index] === letter) {
        return { letter, backgroundColor: 'green' };
      } else if (targetWord.includes(letter)) {
        return { letter, backgroundColor: 'yellow' };
      }
      return { letter, backgroundColor: 'grey' };
    });

    setFeedback(newFeedback);
    setAttemptHistory([...attemptHistory, newFeedback]);
    setUserInput('');

    if (userInput === targetWord) {
      setGameStatus('Congratulations! Would you like to try again?');
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);

      if (newAttempts <= 0) {
        setGameStatus(`Game over! The word was ${targetWord}.`);
      }
    }
  };

  const resetGame = () => {
    const newTargetWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTargetWord(newTargetWord);
    setAttempts(6);
    setUserInput('');
    setFeedback([]);
    setAttemptHistory([]);
    setGameStatus('Normal Mode');
  };

  return (
    <div className="game-container">
      <h1>{gameStatus}</h1>
      <p>Attempts left: {attempts}</p>
      <div className="attempt-history">
        {attemptHistory.map((attempt, index) => (
          <div key={index}>
            {attempt.map((f, idx) => (
              <span key={idx} style={{backgroundColor: f.backgroundColor, color: 'black' }}>
                {f.letter.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
      {gameStatus === 'Normal Mode' && <Keyboard onKeyPress={handleKeyPress} />}
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default NormalGamePage;

