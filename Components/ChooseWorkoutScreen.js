import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { ImageBackground } from "react-native";

export default function ChooseWorkoutScreen({ navigation }) {
  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../images/background3.jpg")}
    >
      <Text style={{ color: "white", fontSize: 36 }}>ChooseWorkoutScreen</Text>
      <Button mode="contained" onPress={() => navigation.navigate("Workout")}>
        Weiter
      </Button>
    </ImageBackground>
  );
}
