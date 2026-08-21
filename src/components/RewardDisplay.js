import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const RewardDisplay = ({ coins, isVisible, onComplete }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(2000),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        if (onComplete) {
          onComplete();
        }
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.rewardBox}>
        <Text style={styles.label}>Level Complete!</Text>
        <Text style={styles.coinsEarned}>{coins}</Text>
        <Text style={styles.coinsLabel}>Coins Earned</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  rewardBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E5090",
    marginBottom: 20,
  },
  coinsEarned: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#FFD700",
    marginVertical: 10,
  },
  coinsLabel: {
    fontSize: 18,
    color: "#666666",
    fontWeight: "600",
  },
});

export default RewardDisplay;
