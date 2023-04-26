import { useState } from "react";
import { styles } from "./RegisterStyle";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../images/background.png")}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Registration</Text>

          <TextInput
            style={styles.input}
            cursorColor={"#212121"}
            placeholder={"Login"}
            placeholderTextColor={"#BDBDBD"}
          />
          <TextInput
            style={styles.input}
            cursorColor={"#212121"}
            placeholder={"Email"}
            placeholderTextColor={"#BDBDBD"}
          />

          <View style={styles.inputWrap}>
            <TextInput
              style={styles.input}
              cursorColor={"#212121"}
              placeholder={"Password"}
              placeholderTextColor={"#BDBDBD"}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity
              style={styles.inputBtn}
              activeOpacity={0.8}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.inputBtnTitle}>
                {showPassword ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => console.log("hello button")}
          >
            <Text style={styles.btnTitle}>Registration</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.navigate}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
