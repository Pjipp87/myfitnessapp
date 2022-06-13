import { StatusBar } from "expo-status-bar";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.logo}
        source={require("./images/mainImage.jpg")}
      >
        <View style={{ flex: 0.3 }}>
          <Text style={{ fontSize: 36, fontWeight: "bold", color: "white" }}>
            MyFitnesApp
          </Text>
        </View>
        <Text style={{ color: "white", flex: 0.3 }}>
          Open up App.js to start working on your app!
        </Text>
        <Button
          title="Start"
          style={{ flex: 0.3 }}
          onPress={() => alert("klappt")}
        />
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
