# Math Crossword Puzzle Application Specification

This document outlines the architecture and implementation details for a Math-based Crossword application featuring arithmetic challenges, level progression, and reward animations.

## 1. Application Overview
The application is a educational puzzle game where users solve crossword-style grids using numbers and arithmetic operators (+, -, *, /) instead of words.

## 2. Page 1: Level Selection Screen
### Functional Requirements:
- **Grid Layout:** Displays level buttons in a scrollable grid format.
- **Visual Differentiation:** - **Current/Unlocked Levels:** Displayed in vibrant colors (e.g., Deep Blue or Green).
    - **Locked Levels:** Displayed in a muted variant or greyscale (e.g., Light Grey) to indicate they are inaccessible.
- **Navigation:** Tapping an unlocked level navigates the user to the Game Screen.

## 3. Page 2: Game Screen
### Functional Requirements:
- **Crossword Grid:** A mix of numbers and operators forming equations horizontally (Across) and vertically (Down).
- **Arithmetic Logic:** Challenges include Addition, Subtraction, Multiplication, and Division.
- **Hint System (Bulb Icon):**
    - Located in the top action bar.
    - **Interaction:** When toggled, the correct numbers for empty cells appear in a **Light Grey color**, allowing the player to see the solution without fully completing the input.
- **Input Method:** A numeric keypad for entering values into the grid.

## 4. Completion Mechanics & Layering
Upon successful completion of a level, the application triggers a multi-layer success UI using a `Stack` architecture:

| Layer | Component | Description |
| :--- | :--- | :--- |
| **Layer 1 (Front)** | **Confetti** | Bits of colored paper falling from the top of the screen using physics-based animation. |
| **Layer 2 (Middle)** | **Rewards** | A display showing the number of **Coins** earned for the level. |
| **Layer 3 (Back)** | **Game Grid** | The completed puzzle remains visible but dimmed in the background. |

## 5. Technical Stack (Suggested)
- **Framework:** Flutter (Dart) or React Native.
- **State Management:** To track unlocked levels and coin counts.
- **Animation Library:** `confetti` package for the celebration effect.

## 6. UI/UX Properties
- **Theme:** Math Quiz aesthetic (clean lines, chalkboard or paper-style backgrounds).
- **Typography:** Bold, legible numbers.
- **Feedback:** Haptic feedback on button presses and satisfying sound effects during the confetti burst.
