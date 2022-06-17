import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { TextInput, Button, Portal, Modal } from "react-native-paper";
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

export default function CreateWorkoutScreen({ navigation }) {
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [frameOpacity, setFrameOpacity] = useState(0);

  let [fontsLoaded] = useFonts({
    BlackOpsOne_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  const nameNewWorkout = () => {
    if (newWorkoutName !== "") {
      setFrameOpacity(1), setShowNameModal(false);
    } else {
      alert("Bitte einen Namen eingeben");
    }
  };

  //####################################################################

  const renderItem = ({ item }) => <Item title={item.title} />;

  //#####################################################################

  return (
    <Portal>
      <ImageBackground
        source={require("../images/BackgroundImages/iron-plate.jpg")}
        style={{ flex: 1 }}
      >
        <Portal>
          <Modal visible={showNameModal}>
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: "grey",
                borderWidth: 5,
              }}
            >
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
                onChangeText={(text) => setNewWorkoutName(text)}
              ></TextInput>
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <Button
                  mode="contained"
                  labelStyle={{ fontFamily: "BlackOpsOne_400Regular" }}
                  onPress={() => navigation.navigate("Navigation")}
                >
                  Abbrechen
                </Button>
                <Button
                  mode="contained"
                  labelStyle={{ fontFamily: "BlackOpsOne_400Regular" }}
                  onPress={() => nameNewWorkout()}
                >
                  Hinzufügen
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>

        <View style={{ opacity: frameOpacity }}>
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
          <Text
            style={{
              fontSize: 28,
              color: "white",
              textAlign: "center",
              elevation: 40,
              fontFamily: "BlackOpsOne_400Regular",
              paddingTop: 20,
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
            labelStyle={{ fontFamily: "BlackOpsOne_400Regular", fontSize: 20 }}
            style={{ marginTop: 30 }}
          >
            Hinzufügen
          </Button>
          <Button
            mode="contained"
            labelStyle={{ fontFamily: "BlackOpsOne_400Regular", fontSize: 20 }}
            style={{ marginTop: 30, marginBottom: 50 }}
          >
            Workout speichern
          </Button>
          <Text
            style={{
              fontSize: 28,
              color: "white",
              textAlign: "center",
              elevation: 40,
              fontFamily: "BlackOpsOne_400Regular",
              paddingTop: 20,
            }}
          >
            Übersicht
          </Text>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </Portal>
  );
}

const styles = StyleSheet.create({
  textInputField: { marginVertical: 10, paddingTop: 10 },
});
