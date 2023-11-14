import React, { useState, useEffect } from 'react';
import normalWordList from './normalWords.json';
import hardWordList from './hardWords.json';

const normalWords = ['friend', 'guitar', 'forest', 'planet', 'animal'];
const hardWords = ['journey', 'diamond', 'gallery', 'fashion', 'balloon'];

function GamePage() {
  const [difficulty, setDifficulty] = useState('normal'); 
  const [wordList, setWordList] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(difficulty === 'normal' ? 6 : 5);
  const [feedback, setFeedback] = useState([]);
  const [attemptHistory, setAttemptHistory] = useState([]);

  // Load game state from localStorage when component mounts
  useEffect(() => {
    const savedGameState = localStorage.getItem('wordleGameState');
    if (savedGameState) {
      const gameState = JSON.parse(savedGameState);
      setDifficulty(gameState.difficulty);
      setWordList(gameState.wordList);
      setTargetWord(gameState.targetWord);
      setUserInput(gameState.userInput);
      setAttempts(gameState.attempts);
      setFeedback(gameState.feedback);
      setAttemptHistory(gameState.attemptHistory);
    } else {
      const words = difficulty === 'normal' ? normalWords : hardWords;
      setWordList(words);
      setTargetWord(words[Math.floor(Math.random() * words.length)]);
    }
  }, [difficulty]);

  // Save game state to localStorage every time the state changes
  useEffect(() => {
    const gameState = {
      difficulty,
      wordList,
      targetWord,
      userInput,
      attempts,
      feedback,
      attemptHistory
    };
    localStorage.setItem('wordleGameState', JSON.stringify(gameState));
  }, [difficulty, wordList, targetWord, userInput, attempts, feedback, attemptHistory]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.length !== targetWord.length) {
      alert(`Please enter a ${targetWord.length}-letter word.`);
      return;
    }

    const newFeedback = userInput.split('').map((letter, index) => {
      if (targetWord[index] === letter) {
        return { letter, color: 'green' };
      } else if (targetWord.includes(letter)) {
        return { letter, color: 'yellow' };
      }
      return { letter, color: 'grey' };
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const currentWordList = difficulty === 'normal' ? normalWordList : hardWordList;
    
      if (!currentWordList.includes(userInput.toLowerCase())) {
        alert("Please enter a valid English word.");
        return;
      }

    setFeedback(newFeedback);
    setAttempts(attempts - 1);
    setAttemptHistory([...attemptHistory, newFeedback]);
    setUserInput('');

    if (userInput === targetWord) {
      alert('Congratulations! You guessed the word!')
      return;
    }

    if (attempts <= 1) {
      alert(`Game over! The word was ${targetWord}.`);
    }
  };

  const handleReset = () => {
    const words = difficulty === 'normal' ? normalWords : hardWords;
    const newTargetWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(newTargetWord);
    setAttempts(difficulty === 'normal' ? 6 : 5);
    setUserInput('');
    setFeedback([]);
    setAttemptHistory([]);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  useEffect(() => {
    handleReset();
  }, [difficulty]);

  return (
    <div className="game-container">
      <h1>Welcome to Wordle</h1>
      <p>Attempts left: {attempts}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          maxLength={targetWord.length}
          autoFocus
          className="word-input"
        />
        <button type="submit" className="submit-button">Guess</button>
      </form>
      <div className="attempt-history">
        {attemptHistory.map((attempt, index) => (
          <div key={index} className="attempt">
            {attempt.map((f, idx) => (
              <span key={idx} className={`feedback-letter ${f.color}`}>
                {f.letter.toUpperCase()}
              </span>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleReset} className="reset-button">Reset Game</button>
      <div>
        <label>
          Choose difficulty: 
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default GamePage;


