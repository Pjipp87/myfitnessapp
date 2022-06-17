import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { TextInput, Button } from "react-native-paper";
import {
  useFonts,
  BlackOpsOne_400Regular,
} from "@expo-google-fonts/black-ops-one";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View style={{ paddingVertical: 5 }}>
    <Text
      style={{
        backgroundColor: "white",
        textAlign: "center",
        fontFamily: "BlackOpsOne_400Regular",
        paddingVertical: 10,
        fontSize: 20,
      }}
    >
      {title}
    </Text>
  </View>
);

export default function CreateWorkoutScreen() {
  const [newWorkoutName, setNewWorkoutName] = useState("Dein neues Workout");

  let [fontsLoaded] = useFonts({
    BlackOpsOne_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  //####################################################################

  const renderItem = ({ item }) => <Item title={item.title} />;

  //#####################################################################

  return (
    <ImageBackground
      source={require("../images/BackgroundImages/iron-plate.jpg")}
      style={{ flex: 1 }}
    >
      <View style={{ paddingTop: 20 }}>
        <Text
          style={{
            fontSize: 36,
            color: "white",
            textAlign: "center",
            elevation: 30,
            fontFamily: "BlackOpsOne_400Regular",
          }}
        >
          Neues Workout:
        </Text>
        <TextInput
          style={styles.textInputField}
          label="Workout Name"
          mode={"outlined"}
          selectionColor="blue"
          activeOutlineColor="black"
        ></TextInput>
      </View>
      <Text
        style={{
          fontSize: 28,
          color: "white",
          textAlign: "center",
          elevation: 40,
          fontFamily: "BlackOpsOne_400Regular",
        }}
      >
        Übungsname:
      </Text>
      <TextInput
        style={styles.textInputField}
        label="Name der Übung"
        mode={"outlined"}
        selectionColor="blue"
        activeOutlineColor="black"
      />

      <Button
        mode="contained"
        labelStyle={{ fontFamily: "BlackOpsOne_400Regular" }}
      >
        Hinzufügen
      </Button>
      <Text
        style={{
          paddingVertical: 30,
          fontSize: 30,
          color: "white",
          textAlign: "center",

          fontFamily: "BlackOpsOne_400Regular",
        }}
      >
        {newWorkoutName}
      </Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textInputField: { marginVertical: 10, paddingTop: 10 },
});
