import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { ImageBackground } from "react-native";
import { Switch } from "react-native-paper";
import { useEffect } from "react";
import { db } from "./Context/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  getDocs,
} from "firebase/firestore";

export default function ChooseWorkoutScreen({ navigation }) {
  const [intervalltraining, setIntervalltraining] = useState(false);
  const [workoutArray, setWorkoutArray] = useState([]);

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const getDataFromFirestore = async () => {
    const q = query(collection(db, "Datenbank", "TestUser", "Workouts"));
    let tempArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tempArr.push(doc.id.toString());
    });
    setWorkoutArray();
    console.log(workoutArray);
  };

  const switchScreen = () => {
    if (intervalltraining) {
      navigation.navigate("HIITWorkout");
    } else if (!intervalltraining) {
      navigation.navigate("Workout");
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../images/background3.jpg")}
    >
      <View
        style={{
          backgroundColor: "rgba(128,128,128, 0.8)",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{ fontSize: 36, color: intervalltraining ? "red" : "white" }}
        >
          HIIT
        </Text>
        <Switch
          value={intervalltraining}
          onValueChange={() => setIntervalltraining(!intervalltraining)}
          color="red"
        ></Switch>
      </View>

      <Text style={{ color: "white", fontSize: 36 }}>Bitte Workout wählen</Text>
      <FlatList data={workoutArray}></FlatList>
      <Button mode="contained" onPress={() => switchScreen()}>
        Weiter
      </Button>
    </ImageBackground>
  );
}
