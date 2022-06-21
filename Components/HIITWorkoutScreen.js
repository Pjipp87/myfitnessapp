import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Button, Portal, Modal, TextInput } from "react-native-paper";
import { getDatabase, ref, child, get, update, set } from "firebase/database";
import { Audio } from "expo-av";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

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
  const [counterWorkout, setCounterWorkout] = useState(false);
  const [pause, setPause] = useState(false);
  const [pauseVisible, setPauseVisible] = useState(false);
  const [loop, setloop] = useState();

  function IntervallWatch() {
    if (pauseVisible && loop > 0) {
      return (
        <CountdownCircleTimer
          isPlaying={pause}
          duration={restSeconds}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: activeSeconds })}
          onUpdate={(remainingTime) =>
            remainingTime === 0 ? pauseFunc() : undefined
          }
        >
          {({ remainingTime, color }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>Pause</Text>
              <Text style={{ color, fontSize: 40 }}>
                {remainingTime === 0 ? "Pause" : remainingTime}
              </Text>
            </View>
          )}
        </CountdownCircleTimer>
      );
    } else if (!pauseVisible && loop > 0) {
      return (
        <CountdownCircleTimer
          isPlaying={counterWorkout}
          duration={activeSeconds}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: restSeconds })}
          onUpdate={(remainingTime) =>
            remainingTime === 0 ? workoutFunc() : undefined
          }
        >
          {({ remainingTime, color }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>Workout</Text>
              <Text style={{ color, fontSize: 40 }}>
                {remainingTime === 0 ? "Pause" : remainingTime}
              </Text>
            </View>
          )}
        </CountdownCircleTimer>
      );
    } else {
      return null;
    }
  }

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../sounds/mixkit-confirmation-tone-2867.wav")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

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

  const workoutFunc = () => {
    playSound();
    setPause(true);
    setPauseVisible(true);
    setNow(now + 1);
  };

  const pauseFunc = () => {
    console.log(loop);
    if (loop === 0) {
      setPause(false);
      setPlaying(false);
      playSound();
      setPauseVisible(false);
    } else {
      setloop(loop - 1);
      playSound();
      setPause(true);
      setPauseVisible(false);
    }
  };

  const startTimer = () => {
    setloop(Object.keys(exerciseObject).length);
    setCounterWorkout(true);
  };

  const stopTimer = () => {
    setCounterWorkout(false);
    setNow(0);
    setCounterWorkout(false);
    setPause(false);
    setPauseVisible(false);
  };

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
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            paddingVertical: 25,
          }}
        >
          <IntervallWatch
            pause={pause}
            counterWorkout={counterWorkout}
            pauseSec={restSeconds}
            WorkoutSec={activeSeconds}
            pauseVisible={pauseVisible}
            pauseFunc={pauseFunc}
            workoutFunc={workoutFunc}
            loop={loop}
          ></IntervallWatch>
        </View>
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
          onPress={() => stopTimer()}
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
          onPress={() => startTimer()}
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
