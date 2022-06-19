import { View, Text } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";

export default function WorkoutScreen() {
  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../images/BackgroundImages/iron-plate.jpg")}
    >
      <Text style={{ color: "white" }}>Standard Workout</Text>
    </ImageBackground>
  );
}
