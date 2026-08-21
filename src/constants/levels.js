// Level 1: Simple Addition and Subtraction
export const LEVELS = {
  1: {
    id: 1,
    name: "Level 1: Addition & Subtraction",
    coins: 100,
    grid: [
      [null, null, null, "+", null, "=", null],
      [null, null, null, null, null, null, null],
      [null, null, null, "+", null, "=", null],
      ["+", "+", "+", null, null, null, null],
      ["=", "=", "=", null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    across: [
      { id: "1A", row: 0, col: 0, length: 3, hint: "2 + 3" },
      { id: "2A", row: 0, col: 4, length: 1, hint: "Result of 2 + 3" },
      { id: "3A", row: 2, col: 0, length: 3, hint: "4 + 2" },
      { id: "4A", row: 2, col: 4, length: 1, hint: "Result of 4 + 2" },
      { id: "5A", row: 4, col: 0, length: 3, hint: "Sum of column 1" },
      { id: "6A", row: 4, col: 4, length: 3, hint: "Sum of column 2" },
    ],
    down: [
      {
        id: "1D",
        row: 0,
        col: 0,
        length: 5,
        hint: "First number in first row",
      },
      {
        id: "2D",
        row: 0,
        col: 2,
        length: 5,
        hint: "Third number in first row",
      },
    ],
    answers: {
      "1A": 5,
      "2A": 5,
      "3A": 6,
      "4A": 6,
      "5A": 11,
      "6A": 11,
      "1D": 24,
      "2D": 56,
    },
  },
};

// Game data constants
export const OPERATORS = ["+", "-", "*", "/"];
export const OPERATOR_SYMBOLS = {
  "+": "ADD",
  "-": "SUBTRACT",
  "*": "MULTIPLY",
  "/": "DIVIDE",
};
