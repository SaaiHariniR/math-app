export const validateAnswer = (userAnswers, correctAnswers) => {
  for (const key in correctAnswers) {
    if (userAnswers[key] !== correctAnswers[key]) {
      return false;
    }
  }
  return true;
};

export const checkCellCorrectness = (cellId, userValue, answer) => {
  return userValue === answer;
};

export const getCellCoordinates = (cellId) => {
  // Parse cellId like "1A" or "1D" to get row, col, and direction
  const match = cellId.match(/(\d+)([AD])/);
  if (!match) return null;

  const num = parseInt(match[1]);
  const direction = match[2]; // 'A' for Across, 'D' for Down

  return { num, direction };
};

export const calculatePercentageComplete = (userAnswers, totalAnswers) => {
  const filled = Object.values(userAnswers).filter(
    (v) => v !== null && v !== "",
  ).length;
  return Math.round((filled / totalAnswers) * 100);
};
