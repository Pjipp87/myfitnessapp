import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Button, TextInput, Portal, Modal } from "react-native-paper";
import { getDatabase, ref, child, get, update, set } from "firebase/database";
import { TouchableOpacity } from "react-native";
import { database } from "./Context/firebase";
import { async } from "@firebase/util";

const Item = ({ title, reps, sets, weight, showModal, uuid }) => (
  <TouchableOpacity
    style={{
      paddingVertical: 5,
      elevation: 10,
      backgroundColor: "white",
      paddingVertical: 5,
      marginVertical: 5,
    }}
    onPress={() => showModal(title, reps, sets, weight, uuid)}
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
      <View
        style={{
          flexDirection: "row",

          width: "50%",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Text>Sets:</Text>
          <Text>{sets}</Text>
        </View>
        <View>
          <Text>Reps:</Text>
          <Text>{reps}</Text>
        </View>
        <View>
          <Text>KG</Text>
          <Text>{weight}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default function WorkoutScreen({ route, navigation }) {
  const { workoutName } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseObject, setExerciseObject] = useState({});
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState(0);
  const [uuid, setUuid] = useState("");
  var today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  useEffect(() => {
    fetchData();
    //console.log("Ausgabe", exerciseObject);
  }, []);

  async function fetchData() {
    const dbRef = ref(getDatabase());
    const response = await get(
      child(dbRef, "testuser/workouts/" + workoutName + "/")
    );
    if (response.exists()) {
      setExerciseObject(response.val());
    } else {
      console.log("Fehler beim Abrufen der Datenbank in ChooseWorkoutScreen");
    }
  }

  const showModal = (title, reps, sets, weight, uuid) => {
    setTitle(title);
    setReps(reps);
    setSets(sets);
    setWeight(weight);
    setUuid(uuid);
    setModalVisible(true);
  };

  const closeModal = () => {
    setTitle("");
    setReps(0);
    setSets(0);
    setWeight(0);
    setUuid("");
    setModalVisible(false);
  };

  const saveData = () => {
    console.log("Title:", title);
    console.log("Wiederholungen", reps);
    console.log("Sätze", sets);
    console.log("Gewicht", weight);
    console.log("UUID", uuid);
    const db = getDatabase();
    try {
      update(ref(db, "testuser/workouts/" + workoutName + "/" + title), {
        ExersiceName: title,
        ExersiceID: uuid,
        repeats: reps,
        sets: sets,
        weight: weight,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    fetchData();
    closeModal();
  };

  const saveDataToDB = () => {
    /**
     * TODO: RealtimeDatabase abfreage avlidieren. Sicherstellen, das kein Workout überschrieben wird
     */
    const db = getDatabase();
    for (const key in exerciseObject) {
      console.log(key + ":" + exerciseObject[key]["ExersiceID"]);
      try {
        update(
          ref(
            db,
            "testuser/history/" +
              date +
              "/" +
              workoutName +
              "/" +
              exerciseObject[key]["ExersiceName"] +
              "/"
          ),
          {
            ExersiceName: exerciseObject[key]["ExersiceName"],
            ExersiceID: exerciseObject[key]["ExersiceID"],
            repeats: exerciseObject[key]["repeats"],
            sets: exerciseObject[key]["sets"],
            weight: exerciseObject[key]["weight"],
          }
        );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      try {
        update(
          ref(
            db,
            "testuser/workouts/" +
              workoutName +
              "/" +
              exerciseObject[key]["ExersiceName"] +
              "/"
          ),
          {
            ExersiceName: exerciseObject[key]["ExersiceName"],
            ExersiceID: exerciseObject[key]["ExersiceID"],
            repeats: 0,
            sets: 0,
            weight: 0,
          }
        );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    console.log(date);
    navigation.navigate("ChooseWorkout");
  };

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../images/BackgroundImages/iron-plate.jpg")}
    >
      <Portal>
        <Modal visible={modalVisible} onDismiss={() => closeModal()}>
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "BlackOpsOne_400Regular",
                fontSize: 28,
                paddingTop: 10,
              }}
            >
              {title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
                paddingVertical: 25,
              }}
            >
              <View style={{ width: "30%" }}>
                <Text>Sätze:</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(textSets) => setSets(textSets)}
                ></TextInput>
              </View>
              <View style={{ width: "30%" }}>
                <Text>Wiederholungen</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(textReps) => setReps(textReps)}
                ></TextInput>
              </View>
              <View style={{ width: "30%" }}>
                <Text>Gewicht:</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(textWeight) => setWeight(textWeight)}
                ></TextInput>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
                paddingBottom: 25,
              }}
            >
              <Button mode="contained" onPress={() => closeModal()}>
                Abbrechen
              </Button>
              <Button mode="contained" onPress={() => saveData()}>
                Speichern
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <Text
        style={{
          color: "white",
          fontFamily: "BlackOpsOne_400Regular",
          fontSize: 36,
          marginVertical: 50,
          textShadowColor: "green",
          textShadowRadius: 100,
        }}
      >
        {workoutName} Workout
      </Text>
      <FlatList
        data={Object.keys(exerciseObject)}
        renderItem={({ item }) => (
          <Item
            title={item}
            reps={exerciseObject[item].repeats}
            sets={exerciseObject[item].sets}
            weight={exerciseObject[item].weight}
            uuid={exerciseObject[item].ExersiceID}
            showModal={showModal}
          />
        )}
        style={{ width: "95%" }}
      ></FlatList>
      <Button
        style={{ marginBottom: 25 }}
        mode="contained"
        onPress={() => navigation.navigate("ChooseWorkout")}
      >
        Workout abbrechen
      </Button>
      <Button
        style={{ marginBottom: 25 }}
        mode="contained"
        onPress={() => saveDataToDB()}
      >
        Heutiges Workout Speichern
      </Button>
    </ImageBackground>
  );
}
