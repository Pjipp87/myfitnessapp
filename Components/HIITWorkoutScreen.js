import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { ImageBackground } from "react-native";
import { Button, Portal, Modal, TextInput, Surface } from "react-native-paper";
import { getDatabase, ref, child, get, update, set } from "firebase/database";
import { Audio } from "expo-av";

import { Picker } from "@react-native-picker/picker";

const Item = ({ title, seconds, opacity }) => (
  <View
    style={{
      paddingVertical: 5,
      elevation: 10,
      backgroundColor: "white",
      paddingVertical: 5,
      marginVertical: 5,
      opacity: opacity,
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
      <View
        style={{
          flexDirection: "row",

          width: "50%",
          justifyContent: "space-evenly",
        }}
      >
        <Text>Sekunden</Text>
        <Text>{seconds}</Text>
      </View>
    </View>
  </View>
);

export default function HIITWorkoutScreen({ route, navigation }) {
  const [sound, setSound] = useState();
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [setupModalVisible, setSetupModalVisible] = useState(true);
  const [exerciseObject, setExerciseObject] = useState({});
  const { workoutName } = route.params;
  const [now, setNow] = useState(0);
  const [workoutLength, setWorkoutLenght] = useState(0);
  const seconds = [
    { id: "Trainingssekunden", label: "", min: 0, max: 60 },
    { id: "Pausesekunden", label: "", min: 0, max: 60 },
  ];

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../sounds/mixkit-confirmation-tone-2867.wav")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  //#################################################################

  const [newTimer, setNewTimer] = useState(activeSeconds);
  const [startNewTimer, setStartNewTimer] = useState(activeSeconds);
  const [dropdownArray, setdropdownArray] = useState([]);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (startNewTimer && now <= workoutLength) {
      const timer =
        newTimer > 0 && setInterval(() => setNewTimer(newTimer - 1), 1000);
      if (newTimer === 0) {
        if (now - 1 === 3) {
          playSound();
          setStartNewTimer(false);
          setNewTimer(0);

          alert("Fertig");
        } else if (!pause) {
          playSound();
          setNewTimer(restSeconds);
          setPause(true);
        } else if (pause) {
          playSound();
          setNewTimer(activeSeconds);
          setNow(now - 1);
          setPause(false);

          setNow(now + 1);
        }
      }

      return () => clearInterval(timer);
    }
  }, [startNewTimer, newTimer]);

  const startCounddown = () => {
    playSound();
    setNewTimer(activeSeconds);
    setStartNewTimer(true);
    setNow(0);
  };

  //#################################################################

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    fetchData();
    //console.log("Ausgabe", exerciseObject);
    setWorkoutLenght(Object.keys(exerciseObject).length);
    console.log(workoutLength);
  }, [newTimer]);

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

  const goBack = () => {
    setSetupModalVisible(false);
    navigation.navigate("ChooseWorkout");
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      source={require("../images/BackgroundImages/iron-plate.jpg")}
    >
      <Portal>
        <Modal visible={setupModalVisible}>
          <Surface
            style={{
              backgroundColor: "white",
              alignItems: "center",
              paddingVertical: 20,
              elevation: 5,
            }}
          >
            <Text style={{ paddingVertical: 20 }}>
              Deine Einstellungen für das heutige Training
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <View>
                <Text>Trainingssekunden:</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 50,
                    textAlign: "center",
                    fontSize: 28,
                  }}
                  onChangeText={(text) => setActiveSeconds(text)}
                  keyboardType="numeric"
                ></TextInput>
              </View>
              <View>
                <Text>Pausensekunden:</Text>
                <TextInput
                  style={{
                    width: "100%",
                    height: 50,
                    textAlign: "center",
                    fontSize: 28,
                  }}
                  onChangeText={(text) => setRestSeconds(text)}
                  keyboardType="numeric"
                ></TextInput>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 20,
              }}
            >
              <Button onPress={() => goBack()}>Zurück</Button>
              <Button onPress={() => setSetupModalVisible(false)}>
                Speichern
              </Button>
            </View>
          </Surface>
        </Modal>
      </Portal>
      <View style={{ flex: 1, width: "100%" }}>
        <Text
          style={{
            width: "100%",
            color: "white",
            textAlign: "center",
            fontFamily: "BlackOpsOne_400Regular",
            paddingVertical: 10,
            fontSize: 40,
          }}
        >
          HIIT {workoutName}
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Training: {activeSeconds} Sekunden
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>
          Pause: {restSeconds} Sekunden
        </Text>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontFamily: "BlackOpsOne_400Regular",
            fontSize: 30,
            paddingTop: "10%",
          }}
        >
          Aktuelle Übung
        </Text>

        {!pause ? (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: "100%",
                color: "white",
                textAlign: "center",
                fontFamily: "BlackOpsOne_400Regular",
                paddingVertical: 10,
                fontSize: 50,
              }}
            >
              Pause
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "BlackOpsOne_400Regular",
                paddingVertical: 10,
                fontSize: 50,
              }}
            >
              {newTimer}
            </Text>
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: "100%",
                color: "white",
                textAlign: "center",
                fontFamily: "BlackOpsOne_400Regular",
                paddingVertical: 10,
                fontSize: 50,
              }}
            >
              {Object.keys(exerciseObject)[now]}
            </Text>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "BlackOpsOne_400Regular",
                paddingVertical: 10,
                fontSize: 50,
              }}
            >
              {newTimer}
            </Text>
          </View>
        )}

        {Object.keys(exerciseObject)[now + 1] ? (
          <>
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "BlackOpsOne_400Regular",
                fontSize: 28,
              }}
            >
              Nächste
            </Text>
            <Item
              title={Object.keys(exerciseObject)[now + 1]}
              seconds={activeSeconds}
              opacity={0.5}
            ></Item>
          </>
        ) : null}

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            paddingVertical: 25,
          }}
        ></View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          paddingBottom: 20,
        }}
      >
        <Button
          style={{
            borderRadius: 50,
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
          }}
          labelStyle={{ fontSize: 20 }}
          mode="contained"
          onPress={() => setNewTimer(false)}
        >
          X
        </Button>
        <Button
          style={{
            borderRadius: 50,
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
          }}
          labelStyle={{ fontSize: 20 }}
          mode="contained"
          onPress={() => startCounddown()}
        >
          Start
        </Button>
      </View>
      <Button
        mode="contained"
        labelStyle={{ color: "white" }}
        onPress={() => navigation.navigate("ChooseWorkout")}
      >
        Zurück
      </Button>
    </ImageBackground>
  );
}
