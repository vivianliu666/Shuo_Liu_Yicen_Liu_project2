import React, { createContext, useContext } from 'react';

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const normalWords = ['change', 'garden', 'school', 'public', 'normal'];
  const hardWords = ['journey', 'library', 'mystery', 'fashion', 'balloon'];

  return (
    <GameContext.Provider value={{ normalWords, hardWords }}>
      {children}
    </GameContext.Provider>
  );
};
