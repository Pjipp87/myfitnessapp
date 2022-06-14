import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Startpage from "./Components/Startpage";
import WelcomeScreen from "./Components/WelcomeScreen";

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
          if (route.name === "Startpage") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "WelcomeScreen") {
            iconName = focused ? "barbell-sharp" : "barbell-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen name="Startpage" component={Startpage} />
      <Tab.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerTitle: "Willkommen",
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
}
