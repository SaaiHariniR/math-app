# Setup Instructions for Math Crossword Puzzle Application

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
cd math_app
npm install
```

### 2. Start Development

```bash
# For Android
npm run android

# For iOS (macOS only)
npm run ios

# For Web
npm run web
```

## Detailed Setup Guide

### Prerequisites

Before starting, ensure you have:

- **Node.js** v14+ ([download](https://nodejs.org/))
- **npm** v6+ or **yarn** v1.22+
- **Git**

### For Android Development

1. **Android Studio** - [Download](https://developer.android.com/studio)
2. **Android SDK** (API Level 21+)
3. **Java Development Kit (JDK)** 11+

### For iOS Development (macOS only)

1. **Xcode** v12+
2. **CocoaPods** - Install with: `sudo gem install cocoapods`
3. **iOS SDK** 12+

---

## Installation Steps

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url> math_app
cd math_app
```

### 2. Install Node Modules

```bash
npm install
# or
yarn install
```

### 3. Install React Native CLI

```bash
npm install -g react-native-cli
```

### 4. For Android Setup

#### Set up Android environment variables (Windows):

```bash
# Add to your system environment variables:
ANDROID_HOME = C:\Users\<YourUsername>\AppData\Local\Android\sdk
JAVA_HOME = C:\Program Files\Java\jdk-11
```

Then add to PATH:

```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%JAVA_HOME%\bin
```

#### Verify Android setup:

```bash
react-native doctor
```

### 5. For iOS Setup (macOS)

```bash
# Install CocoaPods if not already installed
sudo gem install cocoapods

# Navigate to iOS folder and install pods
cd ios
pod install
cd ..
```

---

## Running the Application

### Option 1: Android Emulator

```bash
# Start Android emulator first
# Open Android Studio > AVD Manager > Click play button on device

# Then run the app
npm run android
```

### Option 2: iOS Simulator (macOS)

```bash
npm run ios
```

### Option 3: Physical Device

#### Android:

1. Enable USB debugging on your device
2. Connect your device via USB
3. Run: `npm run android`

#### iOS:

1. Connect your device
2. Open Xcode
3. Select your device as target
4. Run: `npm run ios`

### Option 4: Web (Expo)

```bash
npm run web
```

Requires Expo CLI:

```bash
npm install -g expo-cli
```

---

## Project Structure Overview

```
math_app/
├── src/
│   ├── screens/                  # Screen components
│   │   ├── LevelSelectionScreen.js
│   │   └── GameScreen.js
│   ├── components/               # Reusable UI components
│   │   ├── NumericKeypad.js
│   │   ├── Confetti.js
│   │   ├── RewardDisplay.js
│   │   └── HintButton.js
│   ├── context/                  # State management
│   │   └── GameContext.js
│   ├── constants/                # Game data
│   │   └── levels.js
│   └── utils/                    # Utility functions
│       ├── gameLogic.js
│       └── storage.js
├── App.js                        # Main app component
├── index.js                      # Entry point
├── package.json                  # Dependencies
├── README.md                     # Documentation
└── SETUP.md                      # This file
```

---

## Troubleshooting

### Issue: "node_modules not found"

**Solution:**

```bash
rm -rf node_modules
npm install
```

### Issue: Metro bundler won't start

**Solution:**

```bash
# Clear cache and restart
npm start -- --reset-cache
```

### Issue: Android build fails

**Solution:**

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Issue: Port 8081 already in use

**Solution on Windows:**

```bash
# Find process using port 8081
netstat -ano | findstr :8081

# Kill the process
taskkill /PID <PID> /F
```

### Issue: "ANDROID_HOME not set"

**Solution:**
Set the environment variable in Command Prompt:

```bash
set ANDROID_HOME=C:\Users\<YourUsername>\AppData\Local\Android\sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

### Issue: iOS Pod installation fails

**Solution:**

```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
```

---

## Development Commands

### Development Workflow

```bash
# Start Metro bundler
npm start

# In another terminal, run for Android
npm run android

# Or run for iOS (macOS)
npm run ios

# Or run web version
npm run web
```

### Testing

```bash
npm test
```

### Code Quality

```bash
npm run lint
```

### Build Release APK (Android)

```bash
cd android
./gradlew assembleRelease
cd ..
```

### Build Release IPA (iOS)

```bash
# Open Xcode and build for release
open ios/math_crossword.xcworkspace
```

---

## Configuration Files

### app.json

Contains metadata about your app:

- App name
- Version
- Build settings

### package.json

Contains:

- Project dependencies
- Development scripts
- Project metadata

### .babelrc

Babel configuration for code transformation

### jest.setup.js

Jest testing configuration

---

## Common Issues & Solutions

| Issue                   | Cause                    | Solution                         |
| ----------------------- | ------------------------ | -------------------------------- |
| "Cannot find module..." | Missing dependency       | Run `npm install`                |
| Blank white screen      | Metro bundler failed     | Run `npm start -- --reset-cache` |
| "Android SDK not found" | ANDROID_HOME not set     | Set environment variable         |
| Port 8081 in use        | Another process using it | Kill process on port 8081        |
| iOS build fails         | Pod dependency issue     | Run `pod install` in ios/        |

---

## Performance Tips

1. **Split code**: Keep component files small
2. **Use React.memo()**: Prevent unnecessary re-renders
3. **Optimize images**: Use appropriately sized assets
4. **Lazy load**: Load screens only when needed

---

## Next Steps

1. ✅ Install dependencies
2. ✅ Run the application
3. 📖 Read [README.md](README.md) for feature overview
4. 🎮 Test the app on your device
5. 🔧 Customize levels in `src/constants/levels.js`
6. 🎨 Modify colors and styles in component files

---

## Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)
- [Android Developer Guide](https://developer.android.com/guide)
- [Apple Developer Resources](https://developer.apple.com/resources/)

---

## Support

For issues or questions:

1. Check the Troubleshooting section
2. Review [React Native Documentation](https://reactnative.dev/)
3. Check GitHub issues
4. Contact the development team

---

**Happy Coding! 🚀**
