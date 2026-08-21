import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const NUM_COLUMNS = 4;
const BUTTON_WIDTH = (Dimensions.get("window").width - 40) / NUM_COLUMNS;

const NumericKeypad = ({ onNumberPress, onDelete, onSubmit }) => {
  const buttons = [
    ["1", "2", "3", "DEL"],
    ["4", "5", "6", "+"],
    ["7", "8", "9", "-"],
    ["0", "*", "/", "OK"],
  ];

  const handlePress = (value) => {
    if (value === "DEL") {
      onDelete();
    } else if (value === "OK") {
      onSubmit();
    } else {
      onNumberPress(value);
    }
  };

  const renderButton = (value) => {
    const isOperator = ["+", "-", "*", "/", "OK"].includes(value);
    const isDel = value === "DEL";

    return (
      <TouchableOpacity
        key={value}
        style={[
          styles.button,
          isOperator && styles.operatorButton,
          isDel && styles.deleteButton,
        ]}
        onPress={() => handlePress(value)}
      >
        <Text
          style={[
            styles.buttonText,
            (isOperator || isDel) && styles.operatorButtonText,
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((value) => renderButton(value))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    width: BUTTON_WIDTH - 5,
    height: 50,
    backgroundColor: "#E8F4F8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E3A8A",
  },
  operatorButton: {
    backgroundColor: "#2E5090",
  },
  deleteButton: {
    backgroundColor: "#FF6B6B",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  operatorButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default NumericKeypad;
