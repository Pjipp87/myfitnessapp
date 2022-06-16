import Navigation from "./Navigation";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Startpage from "./Components/Startpage";
import { createStackNavigator } from "@react-navigation/stack";
import CreateWorkoutScreen from "./Components/CreateWorkoutScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Startpage"
            component={Startpage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Navigation"
            component={Navigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateWorkout"
            component={CreateWorkoutScreen}
            options={{
              headerBackTitleStyle: {
                color: "white",
                backgroundColor: "green",
              },
              headerTitle: "Neues Workout erstellen",
              headerTitleStyle: { color: "white" },
              headerStyle: { backgroundColor: "grey" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
