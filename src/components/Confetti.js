import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const ConfettiPiece = ({ delay }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const randomX = Math.random() * SCREEN_WIDTH;
    const randomRotation = Math.random() * 360;
    const randomDuration = 2000 + Math.random() * 1000;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: randomDuration,
        delay,
        useNativeDriver: false,
      }),
      Animated.timing(translateX, {
        toValue: randomX - SCREEN_WIDTH / 2,
        duration: randomDuration,
        delay,
        useNativeDriver: false,
      }),
      Animated.timing(rotation, {
        toValue: randomRotation,
        duration: randomDuration,
        delay,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: randomDuration,
        delay,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#95E1D3", "#F38181"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Animated.View
      style={[
        styles.piece,
        {
          transform: [
            { translateY },
            { translateX },
            { rotate: rotateInterpolate },
          ],
          opacity,
          backgroundColor: randomColor,
        },
      ]}
    />
  );
};

const Confetti = ({ isActive }) => {
  if (!isActive) return null;

  const pieces = Array.from({ length: 50 }, (_, i) => (
    <ConfettiPiece key={i} delay={i * 50} />
  ));

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 1000,
  },
  piece: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    left: SCREEN_WIDTH / 2,
    top: 0,
  },
});

export default Confetti;
