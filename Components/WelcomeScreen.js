import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../images/BackgroundImages/WelcomeScreenBackground.jpg")}
    >
      <Text style={{ color: "blue" }}>Hallo</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
