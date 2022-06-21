import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { CountdownTimer, FlipNumber } from "react-native-flip-countdown-timer";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { Audio } from "expo-av";

export default function SettingsScreen() {
  const [sound, setSound] = useState();
  const [counter, setCounter] = useState(10);
  const [playing, setPlaying] = useState(true);
  const [pause, setPause] = useState(false);
  const [pauseVisible, setPauseVisible] = useState(false);
  const [loop, setloop] = useState(1);

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

  const test = () => {
    playSound();
    setPause(true);
    setPauseVisible(true);
  };

  const test2 = () => {
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

  function UHR() {
    if (pauseVisible && loop > 0) {
      return (
        <CountdownCircleTimer
          isPlaying={pause}
          duration={5}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: counter })}
          onUpdate={(remainingTime) =>
            remainingTime === 0 ? test2() : undefined
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
          isPlaying={playing}
          duration={counter}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 5 })}
          onUpdate={(remainingTime) =>
            remainingTime === 0 ? test() : undefined
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
      return <Text>Fertig</Text>;
    }
  }

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
            <Text>{counter}</Text>
            <Button onPress={() => startCounter()}>Start</Button>
            <Button onPress={() => stop()}>Stop</Button>
          </View>
          <UHR pause={pause}></UHR>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
