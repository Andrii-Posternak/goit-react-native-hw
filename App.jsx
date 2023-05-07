import "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Register } from "./src/Screens/RegistrationScreen/Register";
import { Login } from "./src/Screens/LoginScreen/Login";
import { Home } from "./src/Screens/Home/Home";
import { CommentsScreen } from "./src/Screens/CommentsScreen/CommentsScreen";
import { MapScreen } from "./src/Screens/MapScreen/MapScreen";
import { styles } from "./src/Screens/Home/HomeStyle";

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        size="large"
        color="#FF6C00"
      />
    );
  }

  const isAuth = true;

  return (
    <NavigationContainer>
      {isAuth ? (
        <MainStack.Navigator initialRouteName="Home">
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            options={{
              headerStyle: styles.header,
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerTitle,
            }}
            name="Comments"
            component={CommentsScreen}
          />
          <MainStack.Screen
            options={{
              headerStyle: styles.header,
              headerTitleAlign: "center",
              headerTitleStyle: styles.headerTitle,
            }}
            name="Map"
            component={MapScreen}
          />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
