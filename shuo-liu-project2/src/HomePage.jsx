import React from 'react';
import { Link } from 'react-router-dom';
import { useGameContext } from './GameContext'; 

function HomePage() {
    const { normalWords, hardWords } = useGameContext();
    
    return (
        <div>
            <h1>Welcome to My Wordle Game!</h1>

            <p>Please select your game level:</p>
            <div>
                <Link to={{ pathname: "/game/normal", state: { wordList: normalWords }}}>
                    <button>Normal (6-letter words, 6 chances)</button>
                </Link>
            </div>
            <div>
                <Link to={{ pathname: "/game/hard", state: { wordList: hardWords }}}>
                    <button>Hard (7-letter words, 5 chances)</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
