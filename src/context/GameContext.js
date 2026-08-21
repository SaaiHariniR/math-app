import React, { createContext, useState, useCallback } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [levels, setLevels] = useState([
    { id: 1, name: "Level 1", coins: 100, unlocked: true, completed: false },
    { id: 2, name: "Level 2", coins: 150, unlocked: true, completed: false },
    { id: 3, name: "Level 3", coins: 200, unlocked: false, completed: false },
    { id: 4, name: "Level 4", coins: 250, unlocked: false, completed: false },
    { id: 5, name: "Level 5", coins: 300, unlocked: false, completed: false },
    { id: 6, name: "Level 6", coins: 350, unlocked: false, completed: false },
  ]);
  const [totalCoins, setTotalCoins] = useState(0);

  const completeLevel = useCallback((levelId, coins) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) => {
        if (level.id === levelId) {
          return { ...level, completed: true };
        }
        // Unlock next level
        if (level.id === levelId + 1) {
          return { ...level, unlocked: true };
        }
        return level;
      }),
    );
    setTotalCoins((prev) => prev + coins);
  }, []);

  const getLevelById = useCallback(
    (id) => {
      return levels.find((l) => l.id === id);
    },
    [levels],
  );

  return (
    <GameContext.Provider
      value={{
        levels,
        totalCoins,
        completeLevel,
        getLevelById,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
