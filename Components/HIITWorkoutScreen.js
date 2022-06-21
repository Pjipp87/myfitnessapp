import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Button, Portal, Modal, TextInput } from "react-native-paper";
import { getDatabase, ref, child, get, update, set } from "firebase/database";

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
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [setupModalVisible, setSetupModalVisible] = useState(true);
  const [exerciseObject, setExerciseObject] = useState({});
  const { workoutName } = route.params;
  const [now, setNow] = useState(0);

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

  const goBack = () => {
    setSetupModalVisible(false);
    navigation.navigate("ChooseWorkout");
  };
  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../images/BackgroundImages/iron-plate.jpg")}
    >
      <Portal>
        <Modal visible={setupModalVisible}>
          <View
            style={{
              backgroundColor: "white",
              alignItems: "center",
              paddingVertical: 20,
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
          </View>
        </Modal>
      </Portal>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>HIIT {workoutName}</Text>
        <Text style={{ color: "white" }}>Training: {activeSeconds}</Text>
        <Text style={{ color: "white" }}>Pause: {restSeconds}</Text>
        <Text style={{ color: "white" }}>Aktuelle</Text>
        <Item
          title={Object.keys(exerciseObject)[now]}
          seconds={0}
          opacity={1}
        ></Item>
        <Text style={{ color: "white" }}>Nächste</Text>
        <Item
          title={Object.keys(exerciseObject)[now + 1]}
          seconds={0}
          opacity={0.5}
        ></Item>
      </View>
      {/**
 <FlatList
        data={Object.keys(exerciseObject)}
        renderItem={({ item }) => <Item title={item} seconds={activeSeconds} />}
        style={{ width: "95%", height: "20%" }}
        ItemSeparatorComponent={() => (
          <Item title={"Pause"} seconds={restSeconds} opacity={1}/>
        )}
      ></FlatList>
 */}
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
          onPress={() => alert("start")}
        >
          Stop
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
          onPress={() => alert("start")}
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
