import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from "react-native";
import { GameContext } from "../context/GameContext";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BUTTON_SIZE = (SCREEN_WIDTH - 60) / 3;

const LevelSelectionScreen = ({ navigation }) => {
  const { levels, totalCoins } = useContext(GameContext);

  const handleLevelPress = (level) => {
    if (level.unlocked) {
      navigation.navigate("Game", { levelId: level.id });
    }
  };

  const renderLevelButton = ({ item: level }) => (
    <TouchableOpacity
      style={[
        styles.levelButton,
        {
          backgroundColor: level.unlocked
            ? level.completed
              ? "#4CAF50"
              : "#1E3A8A"
            : "#E0E0E0",
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
        },
      ]}
      onPress={() => handleLevelPress(level)}
      disabled={!level.unlocked}
    >
      <Text
        style={[
          styles.levelButtonText,
          {
            color: level.unlocked ? "#FFFFFF" : "#999999",
          },
        ]}
      >
        {level.id}
      </Text>
      {level.completed && <Text style={styles.completedBadge}>✓</Text>}
      {!level.unlocked && <Text style={styles.lockedBadge}>🔒</Text>}
      <Text
        style={[
          styles.coinsText,
          {
            color: level.unlocked ? "#FFD700" : "#CCCCCC",
          },
        ]}
      >
        {level.coins}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Math Crossword</Text>
        <View style={styles.coinsDisplay}>
          <Text style={styles.coinLabel}>Total Coins:</Text>
          <Text style={styles.coinValue}>{totalCoins}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        <FlatList
          data={levels}
          renderItem={renderLevelButton}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={styles.row}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.instructionText}>
          Tap an unlocked level to start playing
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5dc",
  },
  header: {
    padding: 20,
    backgroundColor: "#2E5090",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  coinsDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  coinLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  coinValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
  },
  gridContainer: {
    padding: 20,
    alignItems: "center",
  },
  row: {
    justifyContent: "space-around",
    marginBottom: 15,
  },
  levelButton: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  levelButtonText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  completedBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  lockedBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    fontSize: 16,
  },
  coinsText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  instructionText: {
    fontSize: 14,
    color: "#666666",
    fontStyle: "italic",
  },
});

export default LevelSelectionScreen;
