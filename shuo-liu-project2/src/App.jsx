import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './GameContext';
import HomePage from './HomePage';
import Navbar from './Navbar'; 
import NormalGamePage from './NormalGamePage';
import HardGamePage from './HardGamePage';
import Rules from './Rules'
import Keyboard from './Keyboard';
import './App.css';

function App() {
  const [normalWords] = useState(['change', 'garden', 'school', 'public', 'normal']);
  const [hardWords] = useState(['journey', 'library', 'mystery', 'fashion', 'balloon']);


  return (
    <GameProvider>
      <Router>
      <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/game/normal" element={<NormalGamePage wordList={normalWords} />} />
            <Route path="/game/hard" element={<HardGamePage wordList={hardWords} />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}


export default App;
