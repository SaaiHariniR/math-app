import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/stack";
import LevelSelectionScreen from "./src/screens/LevelSelectionScreen";
import GameScreen from "./src/screens/GameScreen";
import { GameProvider } from "./src/context/GameContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#f5f5dc" },
          }}
        >
          <Stack.Screen
            name="LevelSelection"
            component={LevelSelectionScreen}
            options={{ title: "Select Level" }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ title: "Math Crossword" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}
