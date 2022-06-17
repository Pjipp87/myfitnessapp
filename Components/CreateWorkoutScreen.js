import { View, Text, StyleSheet, FlatList, Keyboard } from "react-native";
import React, { useContext, useState } from "react";
import { ImageBackground } from "react-native";
import { TextInput, Button, Portal, Modal } from "react-native-paper";
import {
  useFonts,
  BlackOpsOne_400Regular,
} from "@expo-google-fonts/black-ops-one";
import { v4 as uuidv4 } from "uuid";
import { Context } from "./Context/Context";

const Item = ({ title, id, deleteFromList }) => (
  <View
    style={{
      paddingVertical: 5,
      elevation: 10,
      backgroundColor: "white",
      paddingVertical: 5,
      marginVertical: 5,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: "BlackOpsOne_400Regular",
          paddingVertical: 10,
          fontSize: 20,
          paddingLeft: "5%",
        }}
      >
        {title}
      </Text>
      <Button onPress={() => deleteFromList({ id })}>Löschen</Button>
    </View>
  </View>
);

export default function CreateWorkoutScreen({ navigation }) {
  const [newWorkoutName, setNewWorkoutName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [frameOpacity, setFrameOpacity] = useState(0);
  const [exericeName, setExercieName] = useState("");
  const [listArr, setListArr] = useState([]);
  const { updateSQLDB } = useContext(Context);

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

  const addToList = () => {
    if (exericeName !== "") {
      var tempArr = [...listArr, { id: uuidv4(), title: exericeName }];
      setListArr(tempArr);
      setExercieName("");
      Keyboard.dismiss();
    } else {
      alert("Bitte in Namen für die Übung eingeben!");
    }
  };

  const deleteFromList = (itemid) => {
    const newList = listArr.filter((item) => item.id !== itemid.id);
    setListArr(newList);
  };

  const saveList = () => {
    updateSQLDB(["Data", "in", "array"]);
    //alert("Noch nicht implementiert!");
    navigation.navigate("Navigation");
  };

  //####################################################################

  const renderItem = ({ item }) => (
    <Item title={item.title} id={item.id} deleteFromList={deleteFromList} />
  );

  //#####################################################################

  return (
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

      <View style={{ opacity: frameOpacity, flex: 1, paddingBottom: 20 }}>
        <Text
          style={{
            paddingVertical: 5,
            fontSize: 38,
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
            paddingTop: 5,
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
          onChangeText={(text) => setExercieName(text)}
          value={exericeName}
        />

        <Button
          mode="contained"
          labelStyle={{ fontFamily: "BlackOpsOne_400Regular", fontSize: 20 }}
          style={{ marginTop: 30 }}
          onPress={() => addToList()}
        >
          Hinzufügen
        </Button>
        <Button
          mode="contained"
          labelStyle={{ fontFamily: "BlackOpsOne_400Regular", fontSize: 20 }}
          style={{ marginTop: 30, marginBottom: 50 }}
          onPress={() => saveList()}
        >
          Workout speichern
        </Button>
        <Text
          style={{
            fontSize: 28,
            color: "white",
            textAlign: "center",
            elevation: 5,
            fontFamily: "BlackOpsOne_400Regular",
          }}
        >
          Übersicht
        </Text>

        <FlatList
          data={listArr}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textInputField: { paddingTop: 10 },
});
