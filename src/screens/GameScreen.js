import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { GameContext } from "../context/GameContext";
import { LEVELS } from "../constants/levels";
import { validateAnswer } from "../utils/gameLogic";
import NumericKeypad from "../components/NumericKeypad";
import Confetti from "../components/Confetti";
import RewardDisplay from "../components/RewardDisplay";
import HintButton from "../components/HintButton";

const GameScreen = ({ route, navigation }) => {
  const { levelId } = route.params;
  const { completeLevel } = useContext(GameContext);
  const level = LEVELS[levelId] || LEVELS[1];

  const [userAnswers, setUserAnswers] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);

  const handleNumberPress = (num) => {
    if (selectedCell && !levelComplete) {
      setUserAnswers((prev) => ({
        ...prev,
        [selectedCell]: parseInt(num),
      }));
    }
  };

  const handleDelete = () => {
    if (selectedCell) {
      setUserAnswers((prev) => ({
        ...prev,
        [selectedCell]: null,
      }));
    }
  };

  const handleSubmit = () => {
    const allAnswersObj = {};
    [...level.across, ...level.down].forEach((clue) => {
      allAnswersObj[clue.id] = userAnswers[clue.id] || null;
    });

    if (validateAllCells()) {
      setLevelComplete(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowReward(true);
      }, 300);
    }
  };

  const validateAllCells = () => {
    // Check if all cells are filled correctly
    const allClues = [...level.across, ...level.down];
    for (const clue of allClues) {
      if (userAnswers[clue.id] !== level.answers[clue.id]) {
        return false;
      }
    }
    return true;
  };

  const handleCellPress = (clueId) => {
    setSelectedCell(clueId);
  };

  const handleHintPress = () => {
    if (hintsRemaining > 0 && !showHints) {
      setShowHints(true);
      setHintsRemaining((prev) => prev - 1);
    }
  };

  const handleRewardComplete = () => {
    completeLevel(levelId, level.coins);
    setShowReward(false);
    setTimeout(() => {
      navigation.navigate("LevelSelection");
    }, 500);
  };

  const getAnswerDisplay = (clueId) => {
    if (userAnswers[clueId] !== undefined && userAnswers[clueId] !== null) {
      return userAnswers[clueId];
    }
    if (showHints && level.answers[clueId]) {
      return "•";
    }
    return "";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{level.name}</Text>
        <HintButton
          onPress={handleHintPress}
          hints={hintsRemaining}
          isActive={showHints}
        />
      </View>

      <ScrollView style={styles.cluesContainer}>
        <View style={styles.clueSection}>
          <Text style={styles.sectionTitle}>📍 Across</Text>
          {level.across &&
            level.across.map((clue) => (
              <TouchableOpacity
                key={clue.id}
                style={[
                  styles.clueButton,
                  selectedCell === clue.id && styles.selectedClue,
                ]}
                onPress={() => handleCellPress(clue.id)}
              >
                <View style={styles.clueContent}>
                  <Text style={styles.clueNumber}>{clue.id}</Text>
                  <Text style={styles.clueHint}>{clue.hint}</Text>
                </View>
                <Text style={styles.clueAnswer}>
                  {getAnswerDisplay(clue.id)}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.clueSection}>
          <Text style={styles.sectionTitle}>📍 Down</Text>
          {level.down &&
            level.down.map((clue) => (
              <TouchableOpacity
                key={clue.id}
                style={[
                  styles.clueButton,
                  selectedCell === clue.id && styles.selectedClue,
                ]}
                onPress={() => handleCellPress(clue.id)}
              >
                <View style={styles.clueContent}>
                  <Text style={styles.clueNumber}>{clue.id}</Text>
                  <Text style={styles.clueHint}>{clue.hint}</Text>
                </View>
                <Text style={styles.clueAnswer}>
                  {getAnswerDisplay(clue.id)}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      {!levelComplete && (
        <NumericKeypad
          onNumberPress={handleNumberPress}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      )}

      <Confetti isActive={showConfetti} />
      <RewardDisplay
        coins={level.coins}
        isVisible={showReward}
        onComplete={handleRewardComplete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5dc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2E5090",
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  cluesContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  clueSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E5090",
    marginBottom: 10,
  },
  clueButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  selectedClue: {
    borderColor: "#4CAF50",
    backgroundColor: "#F0F8F0",
  },
  clueContent: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  clueNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E5090",
    minWidth: 25,
  },
  clueHint: {
    fontSize: 14,
    color: "#555555",
    flex: 1,
  },
  clueAnswer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    minWidth: 40,
    textAlign: "center",
  },
});

export default GameScreen;
