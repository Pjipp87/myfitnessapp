import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";

import { Audio } from "expo-av";

export default function SettingsScreen() {
  const [sound, setSound] = useState();

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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
