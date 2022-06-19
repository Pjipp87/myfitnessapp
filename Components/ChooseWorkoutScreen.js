import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

export default function ChooseWorkoutScreen({ navigation }) {
  return (
    <View>
      <Text>ChooseWorkoutScreen</Text>
      <Button onPress={() => navigation.navigate("Workout")}>klick</Button>
    </View>
  );
}
