import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const HintButton = ({ onPress, hints, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>
        💡 Hints: {hints}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFE66D",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2E5090",
  },
  activeButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#2E7D2E",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E5090",
  },
  activeText: {
    color: "#FFFFFF",
  },
});

export default HintButton;
