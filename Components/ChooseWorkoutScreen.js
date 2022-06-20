import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { ImageBackground } from "react-native";
import { Switch } from "react-native-paper";
import { useEffect } from "react";
import { db } from "./Context/firebase";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, child, get } from "firebase/database";

const Item = ({ title, switchScreen }) => (
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
      <Button onPress={() => switchScreen({ title })}>Auswählen</Button>
    </View>
  </View>
);

export default function ChooseWorkoutScreen({ navigation }) {
  const [intervalltraining, setIntervalltraining] = useState(false);
  const [workoutArray, setWorkoutArray] = useState([]);
  const [workoutObj, setWorkoutObj] = useState({});

  const renderItem = ({ item }) => (
    <Item title={item} switchScreen={switchScreen} />
  );

  useEffect(() => {
    async function fetchData() {
      const dbRef = ref(getDatabase());
      const response = await get(child(dbRef, "testuser/workouts/"));
      if (response.exists()) {
        setWorkoutObj(response.val());
      } else {
        console.log("Fehler beim Abrufen der Datenbank in ChooseWorkoutScreen");
      }
    }
    fetchData();
    //console.log(workoutObj);
  }, []);

  const getDataFromFirestore = async () => {
    let tempObj;
  };

  const switchScreen = (name) => {
    if (intervalltraining) {
      navigation.navigate("HIITWorkout");
    } else if (!intervalltraining) {
      navigation.navigate("Workout", { workoutName: name.title });
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
          elevation: 5,
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
      <FlatList
        data={Object.keys(workoutObj)}
        renderItem={renderItem}
      ></FlatList>
      <Button mode="contained" onPress={() => switchScreen()}>
        Weiter
      </Button>
    </ImageBackground>
  );
}
