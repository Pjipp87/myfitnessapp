import Navigation from "./Navigation";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Startpage from "./Components/Startpage";
import { createStackNavigator } from "@react-navigation/stack";
import CreateWorkoutScreen from "./Components/CreateWorkoutScreen";
import { Provider } from "react-native-paper";
import "react-native-get-random-values";
import { Context } from "./Components/Context/Context";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import merge from "deepmerge";
import { useState, useCallback, useMemo } from "react";
import ChooseWorkoutScreen from "./Components/ChooseWorkoutScreen";
import WorkoutScreen from "./Components/WorkoutScreen";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const DefaultThemeNew = {
  ...CombinedDefaultTheme,
  roundness: 2,
  colors: {
    ...CombinedDefaultTheme.colors,
    background: "#fefbe9",
    primary: "#fefbe9",
    accent: "#f0a04b",
    greenDark: "#183a1d",
    greenBright: "#e1eedd",
    header: "#cb7d8c",
    searchbar: "#ffffff",
    text: "black",
    listitem: "#f0a04b",
  },
};

const DarkThemeNew = {
  ...CombinedDarkTheme,
  roundness: 2,
  colors: {
    ...CombinedDarkTheme.colors,
    background: "#212121",
    header: "#000000",
    searchbar: "#e1eedd",
    accent: "#183a1d",
    text: "white",
    listitem: "#183a1d",
  },
};

const Stack = createStackNavigator();

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);

  let theme = isThemeDark ? DarkThemeNew : DefaultThemeNew;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <>
      <Context.Provider value={preferences}>
        <Provider>
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
                  WorkoutScreen={ChooseWorkoutScreen}
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
                <Stack.Screen
                  name="chooseWorkout"
                  component={ChooseWorkoutScreen}
                  options={{ headerTitle: "Workout wählen" }}
                />
                <Stack.Screen
                  name="Workout"
                  component={WorkoutScreen}
                  options={{ headerTitle: "Workout" }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="inverted" />
          </SafeAreaView>
        </Provider>
      </Context.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
