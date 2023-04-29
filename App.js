import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Register } from "./src/Screens/RegistrationScreen/Register";
import { Login } from "./src/Screens/LoginScreen/Login";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#FF6C00" />
    );
  }

  return (
    <View
      // contentContainerStyle={{ flex: 1 }}
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        style={styles.image}
        source={require("./src/images/background.png")}
      >
        <StatusBar style="auto" />
        <Register />
        {/* <Login /> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
  },

  loader: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
