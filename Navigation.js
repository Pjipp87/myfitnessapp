import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./Components/WelcomeScreen";
import ProfileScreen from "./Components/ProfileScreen";
import SettingsScreen from "./Components/SettingsScreen";
import WorkoutScreen from "./Components/WorkoutScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "black" },
        headerTitleStyle: { color: "white" },
        tabBarStyle: { backgroundColor: "black" },
        tabBarLabelStyle: { color: "white" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Startseite") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Workout") {
            iconName = focused ? "barbell-sharp" : "barbell-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Einstellungen") {
            iconName = focused ? "settings" : "settings-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
        headerTitleAlign: "center",
      })}
    >
      <Tab.Screen name="Startseite" component={WelcomeScreen} />
      <Tab.Screen name="Workout" component={WorkoutScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Einstellungen" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
