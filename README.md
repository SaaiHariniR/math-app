# Math Crossword Puzzle Application

A React Native educational puzzle game where users solve crossword-style grids using numbers and arithmetic operators.

## Features

- **Level Selection Screen**: Browse and select from multiple difficulty levels
- **Game Screen**: Solve math crossword puzzles with arithmetic equations
- **Hint System**: Bulb icon to reveal answers in light grey
- **Numeric Keypad**: Input numbers and operators (+, -, \*, /)
- **Confetti Animation**: Celebration effect upon level completion
- **Reward Display**: Shows coins earned for completing levels
- **Level Progression**: Unlock new levels by completing previous ones
- **Coin System**: Earn and track total coins across all levels

## Project Structure

```
src/
├── screens/
│   ├── LevelSelectionScreen.js    # Level selection with grid layout
│   └── GameScreen.js              # Main game screen
├── components/
│   ├── NumericKeypad.js           # Input keypad for numbers/operators
│   ├── Confetti.js                # Celebration animation
│   ├── RewardDisplay.js           # Coin reward display
│   └── HintButton.js              # Hint toggle button
├── context/
│   └── GameContext.js             # Global game state management
├── constants/
│   └── levels.js                  # Level data and game constants
└── utils/
    └── gameLogic.js               # Game logic utilities
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run on Android

```bash
npm run android
# or
react-native run-android
```

### Run on iOS

```bash
npm run ios
# or
react-native run-ios
```

### Run Web (using Expo)

```bash
npm run web
# or
expo start --web
```

## Game Mechanics

### Level Selection

- Browse available levels in a scrollable grid
- Unlocked levels show in vibrant colors (blue/green)
- Locked levels appear greyed out
- Complete levels show a checkmark badge
- Each level displays the coin reward

### Game Play

1. Select a level from the level selection screen
2. Solve the arithmetic crossword puzzle
3. Use the numeric keypad to enter numbers and operators
4. Press 'OK' to submit your answer when complete
5. Use hints (limited to 3 per level) to reveal answers in grey
6. Upon completion, watch the confetti animation and see your coin reward

### Completion Animation Stack (Layers)

- **Layer 1 (Front)**: Confetti falling from top with physics-based animation
- **Layer 2 (Middle)**: Reward display showing coins earned
- **Layer 3 (Back)**: Completed puzzle appears dimmed in background

## Game Controls

**Numeric Keypad**:

- Numbers: 0-9
- Operators: +, -, \*, /
- DEL: Delete last entry
- OK: Submit answer

**Game Screen**:

- Tap on a clue to select it
- Tap the bulb (💡) icon to reveal hints (limited uses)
- Tap back arrow to return to level selection

## Technical Stack

- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: React Context API
- **Animations**: React Native Animated API
- **Tools**: Node.js, npm/yarn

## Customization

### Adding New Levels

Edit `src/constants/levels.js`:

```javascript
export const LEVELS = {
  2: {
    id: 2,
    name: 'Level 2: Multiplication',
    coins: 150,
    grid: [...],
    across: [...],
    down: [...],
    answers: {...},
  },
};
```

### Changing Theme Colors

Update color values in component style sheets:

- Primary: `#2E5090` (Deep Blue)
- Secondary: `#4CAF50` (Green)
- Accent: `#FFD700` (Gold)
- Background: `#f5f5dc` (Beige)

## Troubleshooting

### Port Already in Use

```bash
lsof -i :8081  # Find process
kill -9 <PID>  # Kill process
```

### Module Not Found

```bash
npm install
npx react-native link
```

### Gradle Build Issues (Android)

```bash
./gradlew clean
npm run android
```

## Future Enhancements

- [ ] Leaderboard system
- [ ] Multiplayer mode
- [ ] Sound effects and haptic feedback
- [ ] Advanced difficulty levels
- [ ] Daily challenges
- [ ] User profile and statistics
- [ ] Accessibility features
- [ ] Progressive web app (PWA) support

## License

MIT

## Support

For issues or questions, please contact the development team.
