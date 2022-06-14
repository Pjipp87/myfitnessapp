import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useEffect } from "react";
import {} from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Startpage({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  }, []);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../images/BackgroundImages/StartupPageBackground.jpg")}
    >
      <Animated.View
        style={{
          flex: 0.5,
          opacity: fadeAnim,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
            paddingBottom: "50%",
          }}
        >
          MyFitnessPal
        </Text>
      </Animated.View>
      <View
        style={{
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ marginTop: "50%", backgroundColor: "blue" }}
          icon={"arm-flex-outline"}
          onPress={() => navigation.navigate("Navigation")}
          mode="contained"
          textColor="red"
          labelStyle={{ color: "white", fontSize: 24, fontWeight: "bold" }}
        >
          Start
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "space-between",
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
