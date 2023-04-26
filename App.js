import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Register } from "./src/Screens/RegistrationScreen/Register";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Hello mans</Text>
      <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <Register />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
