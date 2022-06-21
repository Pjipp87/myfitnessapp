import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function IntervallWatch({
  pause,
  counterWorkout,
  pauseSec,
  WorkoutSec,
  pauseVisible,
  pauseFunc,
  workoutFunc,
  loop,
}) {
  if (pauseVisible && loop > 0) {
    return (
      <CountdownCircleTimer
        isPlaying={pause}
        duration={5}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 10 })}
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
        duration={10}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 5 })}
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
