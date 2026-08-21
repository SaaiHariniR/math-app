# Developer Guide - Math Crossword Puzzle Application

## Architecture Overview

The application follows a layered architecture with clear separation of concerns:

### Layer 1: Screens

- **LevelSelectionScreen**: Main UI for browsing levels
- **GameScreen**: Primary game interface

### Layer 2: Components

Reusable UI elements:

- **NumericKeypad**: User input interface
- **Confetti**: Victory animation
- **RewardDisplay**: Coin reward UI
- **HintButton**: Hint toggle

### Layer 3: State Management

- **GameContext**: Global state using React Context API
  - Manages levels (locked/unlocked status)
  - Tracks total coins
  - Handles level completion

### Layer 4: Business Logic

- **gameLogic.js**: Validation and game calculations
- **storage.js**: Data persistence (ready for AsyncStorage integration)

### Layer 5: Constants

- **levels.js**: Game data, puzzle definitions, and answers

---

## File Structure with Descriptions

```
math_app/
├── App.js                              # Navigation setup & app root
├── index.js                            # React Native entry point
├── app.json                            # App metadata
├── package.json                        # Dependencies & scripts
├── .babelrc                            # Babel configuration
├── jest.setup.js                       # Testing setup
├── .gitignore                          # Git ignore rules
├── README.md                           # User documentation
├── SETUP.md                            # Installation guide
│
├── src/
│   ├── screens/
│   │   ├── LevelSelectionScreen.js    # Level grid (9 clue, locked/unlocked)
│   │   └── GameScreen.js              # Main game with keypad & clues
│   │
│   ├── components/
│   │   ├── NumericKeypad.js           # 4x4 keypad with numbers & operators
│   │   ├── Confetti.js                # Falling confetti animation
│   │   ├── RewardDisplay.js           # Animated coin reward display
│   │   └── HintButton.js              # Hint toggle button
│   │
│   ├── context/
│   │   └── GameContext.js             # Global state & level management
│   │
│   ├── constants/
│   │   └── levels.js                  # Puzzle data & level definitions
│   │
│   └── utils/
│       ├── gameLogic.js               # Validation & game calculations
│       └── storage.js                 # Data persistence interface
```

---

## Adding New Levels

### Step 1: Define Level Data in `src/constants/levels.js`

```javascript
2: {
  id: 2,
  name: 'Level 2: Multiplication',
  coins: 150,
  grid: [
    // Define your grid (can be used for visual display later)
    [1, 2, 3],
    [4, 5, 6],
  ],
  across: [
    { id: '1A', row: 0, col: 0, length: 3, hint: '2 × 3' },
    { id: '2A', row: 1, col: 0, length: 3, hint: '4 × 2' },
  ],
  down: [
    { id: '1D', row: 0, col: 0, length: 2, hint: 'First digit' },
  ],
  answers: {
    '1A': 6,
    '2A': 8,
    '1D': 14,
  },
}
```

### Step 2: Test the Level

1. Navigate to LevelSelectionScreen
2. Click the new level
3. Verify all clues and answers work correctly

---

## Customizing Appearance

### Change Color Theme

Edit color values in screen/component StyleSheets:

```javascript
// Primary brand color (currently Deep Blue)
#2E5090

// Success color (currently Green)
#4CAF50

// Accent color (currently Gold)
#FFD700

// Background (currently Beige)
#f5f5dc
```

Update in:

- `LevelSelectionScreen.js`
- `GameScreen.js`
- All components

### Modify Fonts

Change `fontSize` and `fontWeight` in any component's StyleSheet:

```javascript
styles.title = {
  fontSize: 32, // Increase for larger text
  fontWeight: "bold", // Use '600', '700', 'bold'
};
```

---

## State Management Flow

```
GameProvider (GameContext.js)
│
├── levels[]              # Array of level objects
│   └── { id, name, coins, unlocked, completed }
│
├── totalCoins            # User's total coin count
│
└── Functions:
    ├── completeLevel()   # Mark level as done, unlock next
    └── getLevelById()    # Fetch specific level
```

### Accessing State in Components

```javascript
import { GameContext } from "../context/GameContext";
import { useContext } from "react";

const MyComponent = () => {
  const { levels, totalCoins, completeLevel } = useContext(GameContext);

  // Use the state...
};
```

---

## Game Logic Reference

### Validation Functions

```javascript
// Check if user answer matches correct answer
validateAnswer(userAnswers, correctAnswers) → boolean

// Get cell coordinates from ID (e.g., "1A" → { num: 1, direction: 'A' })
getCellCoordinates(cellId) → { num, direction }

// Calculate completion percentage
calculatePercentageComplete(userAnswers, totalAnswers) → number
```

---

## Animation System

### Confetti Animation

- **Duration**: 2-3 seconds
- **Pieces**: 50 colored squares
- **Physics**: Random X/Y velocity, rotation, opacity fade
- **Trigger**: On level completion

### Reward Display Animation

- **Scale**: Starts at 0, scales to 1
- **Duration**: 500ms scale-in, 2s display, 500ms scale-out
- **Emotion**: Celebratory with coin display

---

## Performance Optimization

### Current Features

- ✅ Component-level memoization ready
- ✅ Efficient state management (Context API)
- ✅ Proper FlatList usage for level grid

### Future Optimization

- Add `React.memo()` to prevent unnecessary re-renders
- Implement lazy loading for levels
- Optimize animation frame rates
- Add image asset compression

---

## Testing Strategy

### Unit Tests Example

```javascript
// test/gameLogic.test.js
import {
  validateAnswer,
  calculatePercentageComplete,
} from "../utils/gameLogic";

describe("Game Logic", () => {
  test("validateAnswer returns true for correct answers", () => {
    const userAnswers = { "1A": 5, "2A": 8 };
    const correctAnswers = { "1A": 5, "2A": 8 };
    expect(validateAnswer(userAnswers, correctAnswers)).toBe(true);
  });
});
```

### Component Tests Example

```javascript
// test/LevelSelectionScreen.test.js
import { render, fireEvent } from "@testing-library/react-native";
import LevelSelectionScreen from "../screens/LevelSelectionScreen";

describe("LevelSelectionScreen", () => {
  test("renders level buttons", () => {
    const { getByText } = render(<LevelSelectionScreen />);
    expect(getByText("1")).toBeTruthy();
  });
});
```

---

## Deployment Guide

### Android Release Build

```bash
cd android
./gradlew assembleRelease
# APK location: android/app/build/outputs/apk/release/app-release.apk
```

### iOS Release Build

```bash
# Using Xcode
open ios/math_crossword.xcworkspace
# Select "Any iOS Device" and build
```

### Web Deployment (Expo)

```bash
npm run build:web
# Upload contents of dist/ to hosting service
```

---

## Common Development Tasks

### Debug Views

```javascript
// Add visual debugging overlay
console.log("🎮 Debug:", { userAnswers, selectedCell });
```

### Add Console Logging

```javascript
// Wrap state updates with logging
const handleComplete = () => {
  console.log("Level complete! Coins:", level.coins);
  completeLevel(levelId, level.coins);
};
```

### Performance Profiling

```javascript
// At top of component
const startTime = performance.now();

// At end
console.log(`Render took ${performance.now() - startTime}ms`);
```

---

## Extending Features

### Add Sound Effects

1. Install `react-native-sound`
2. Create `src/audio/sounds.js`
3. Import and play in completion handlers

### Add Animations

1. Use `Animated` API (already in use for Confetti/Reward)
2. Or integrate `react-native-reanimated` for advanced effects

### Add Persistence

1. Install `@react-native-async-storage/async-storage`
2. Implement `storage.js` functions
3. Save/load in GameContext useEffect

### Add Analytics

1. Install `react-native-firebase`
2. Track level completion events
3. Monitor user engagement

---

## Debugging Tips

1. **React DevTools**: Install and connect debugger
2. **Flipper**: Facebook's debugging platform for React Native
3. **Console.log**: Still your best friend!
4. **React Profiler**: Measure component performance
5. **Network Tab**: Debug API calls (if added later)

---

## API Integration (Future)

When adding backend support:

```javascript
// src/api/client.js
const API_BASE = "https://api.mathcrossword.com";

export const fetchLevels = () =>
  fetch(`${API_BASE}/levels`).then((r) => r.json());

export const saveProgress = (userId, progress) =>
  fetch(`${API_BASE}/progress`, {
    method: "POST",
    body: JSON.stringify({ userId, progress }),
  }).then((r) => r.json());
```

---

## Contributing Guidelines

1. **Code Style**: Follow existing patterns
2. **Naming**: Use clear, descriptive names
3. **Comments**: Explain complex logic
4. **Testing**: Add tests for new features
5. **Performance**: Consider impact of changes

---

## Quick Reference

| Task              | Command                                   |
| ----------------- | ----------------------------------------- |
| Start dev server  | `npm start`                               |
| Run on Android    | `npm run android`                         |
| Run on iOS        | `npm run ios`                             |
| Run tests         | `npm test`                                |
| Clean cache       | `npm start -- --reset-cache`              |
| Build Android APK | `cd android && ./gradlew assembleRelease` |

---

**Last Updated**: April 26, 2026
**Version**: 1.0.0
