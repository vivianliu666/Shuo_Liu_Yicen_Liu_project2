import React from 'react';

export default function Rules() {
  return (
    <div className="rules-container">
      <h1>Rules for Wordle</h1>
      <ol className="rules-ol">
        <li>
          <strong>Choose Your Difficulty:</strong>
          <ul>
            <li>Normal Mode: Find a 6-letter word with 6 chances to guess.</li>
            <li>Hard Mode: Find a 7-letter word with 5 chances to guess.</li>
          </ul>
        </li>
        <li>
          <strong>Making a Guess:</strong>
          <ul>
            <li>Type your guess into the input field and submit it.</li>
            <li>Each guess must be a valid word with the correct number of letters (6 for Normal, 7 for Hard).</li>
          </ul>
        </li>
        <li>
          <strong>Feedback Interpretation:</strong>
          <ul>
            <li><span style={{ color: 'green' }}>Green</span>: The letter is in the word and in the correct position.</li>
            <li><span style={{ color: 'yellow' }}>Yellow</span>: The letter is in the word but in the wrong position.</li>
            <li><span style={{ color: 'grey' }}>Grey</span>: The letter is not in the word.</li>
          </ul>
        </li>
        <li>
          <strong>Winning the Game:</strong>
          <ul>
            <li>Correctly guess the word within the allowed number of attempts to win.</li>
            <li>If you guess the word correctly, you can choose to play again.</li>
          </ul>
        </li>
        <li>
          <strong>If You Run Out of Attempts:</strong>
          <ul>
            <li>The game ends if you use all your attempts without guessing the word.</li>
            <li>The correct word will be revealed at the end of the game.</li>
            <li>You can choose to try again or change the difficulty.</li>
          </ul>
        </li>
        <li>
          <strong>Resetting the Game:</strong>
          <ul>
            <li>You can reset the game at any time to start with a new word.</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
