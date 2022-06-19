import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import WorkoutScreen from "./Components/WorkoutScreen";
import ChooseWorkoutScreen from "./Components/ChooseWorkoutScreen";

const Stack = createStackNavigator();

export default function WorkoutScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName="ChooseWorkout">
      <Stack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseWorkout"
        component={ChooseWorkoutScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
