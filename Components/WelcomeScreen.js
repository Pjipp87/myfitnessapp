import { View, ImageBackground, StyleSheet } from "react-native";
import { Button, Headline, Text } from "react-native-paper";
import React, { useRef } from "react";
//import AppLoading from "expo-app-loading";
import {
  useFonts,
  BlackOpsOne_400Regular,
} from "@expo-google-fonts/black-ops-one";
import { Animated } from "react-native";
import TypeWriter from "react-native-typewriter";

export default function WelcomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    BlackOpsOne_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../images/BackgroundImages/WelcomeScreenBackground.jpg")}
    >
      <View style={{ flex: 0.2, elevation: 50 }}>
        <TypeWriter
          typing={1}
          style={{
            flex: 0.5,
            justifyContent: "center",
            textAlignVertical: "center",
            fontFamily: "BlackOpsOne_400Regular",
            color: "white",
            fontSize: 40,
          }}
        >
          Zeit fürs Training
        </TypeWriter>
      </View>
      <View style={{ flex: 0.7 }}>
        <Button
          icon="plus"
          mode="contained"
          style={{ backgroundColor: "grey" }}
          onPress={() => navigation.navigate("CreateWorkout")}
        >
          Workout erstellen
        </Button>
        <Text style={{ color: "blue" }}>Hallo</Text>
      </View>
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
