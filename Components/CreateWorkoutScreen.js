import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { TextInput } from "react-native-paper";

export default function CreateWorkoutScreen() {
  return (
    <ImageBackground
      source={require("../images/BackgroundImages/CreateWorkoutScreen.jpg")}
      style={{ flex: 1 }}
    >
      <View style={{ paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 36,
            color: "white",
            textAlign: "center",
            elevation: 30,
          }}
        >
          Dein Workout:
        </Text>
        <TextInput
          style={styles.textInputField}
          label="Workout Name"
          mode={"outlined"}
          selectionColor="blue"
          activeOutlineColor="black"
        ></TextInput>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textInputField: { marginVertical: 10, paddingTop: 10 },
});
