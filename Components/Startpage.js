import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Animated,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
} from "react-native";
import React, { useRef, useEffect } from "react";
import {} from "react-native";

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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.logo}
        source={require("../images/mainImage.jpg")}
      >
        <Animated.View style={{ flex: 0.4, opacity: fadeAnim }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "white",
            }}
          >
            MyFitnesApp
          </Text>
        </Animated.View>
        <Text style={{ color: "white", flex: 0.4 }}>
          Startseite meines Fitness-App Projects
        </Text>
        <Button
          title="Start"
          style={{ flex: 0.2 }}
          onPress={() => navigation.navigate("Navigation")}
        />
      </ImageBackground>

      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
