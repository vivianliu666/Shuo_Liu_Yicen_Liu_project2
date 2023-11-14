import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/game/normal">Normal Game</Link></li>
        <li><Link to="/game/hard">Hard Game</Link></li>
        <li><Link to="/rules">Rules</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;