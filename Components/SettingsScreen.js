import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function SettingsScreen() {
  const [newTimer, setNewTimer] = useState(50);
  const [startNewTimer, setStartNewTimer] = useState(false);

  useEffect(() => {
    if (startNewTimer) {
      const timer =
        newTimer > 0 && setInterval(() => setNewTimer(newTimer - 1), 1);

      if (newTimer === 0) {
        // countdown is finished
        setStartNewTimer(false);
        // update your redux state here
        // updateReduxCounter(0);
        alert("Timer beendet");
      }

      return () => clearInterval(timer);
    }
  }, [startNewTimer, newTimer]);

  return (
    <View>
      <Text>SettingsScreen Test</Text>
      <View>
        <View>
          <Text style={{ marginVertical: 20 }}>Soundtest</Text>
          <Button mode="contained" onPress={() => playSound()}>
            Soundtest
          </Button>
        </View>
        <View>
          <Text style={{ marginVertical: 20 }}>Timertest</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Counter</Text>
            <Text>{newTimer}</Text>
            <Button
              onPress={() => {
                setStartNewTimer(true);
              }}
            >
              Start
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
