import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { getDatabase, ref, child, get } from "firebase/database";
import { TouchableOpacity } from "react-native";
import { async } from "@firebase/util";

const Item = ({ title, reps, sets, weight }) => (
  <TouchableOpacity
    style={{
      paddingVertical: 5,
      elevation: 10,
      backgroundColor: "white",
      paddingVertical: 5,
      marginVertical: 5,
    }}
    onPress={() => alert(reps, "ausgewählt!")}
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

export default function WorkoutScreen({ route }) {
  const { workoutName } = route.params;
  const [exerciseObject, setExerciseObject] = useState({});

  useEffect(() => {
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
    fetchData();
    //console.log("Ausgabe", exerciseObject);
  }, []);

  const setData = async () => {};

  return (
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../images/BackgroundImages/iron-plate.jpg")}
    >
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
          />
        )}
        style={{ width: "95%" }}
      ></FlatList>
    </ImageBackground>
  );
}
