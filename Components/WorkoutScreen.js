import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { db } from "./Context/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function WorkoutScreen({ route }) {
  const { workoutName } = route.params;
  const [exercises, setExercises] = useState({});

  useEffect(() => {
    async function fetchdata() {
      let result = await getExercies();
      setExercises(result);
    }
    fetchdata();
  }, []);

  const getExercies = async () => {
    const docRef = doc(
      db,
      "Datenbank",
      "TestUser",
      "Workouts",
      `${workoutName}`
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../images/BackgroundImages/iron-plate.jpg")}
    >
      <Text style={{ color: "white" }}>{workoutName} Workout</Text>
    </ImageBackground>
  );
}
