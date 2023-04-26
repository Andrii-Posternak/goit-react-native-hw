import { useState } from "react";
import { styles } from "./RegisterStyle";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AvatarForm } from "../../components/AvatarForm/AvatarForm";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [inputFocusName, setInputFocusName] = useState(false);
  const [inputFocusEmail, setInputFocusEmail] = useState(false);
  const [inputFocusPassword, setInputFocusPassword] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../images/background.png")}
      >
        <View style={styles.form}>
          <AvatarForm />
          <Text style={styles.titleForm}>Registration</Text>

          <TextInput
            style={[styles.input, inputFocusName && styles.inputFocus]}
            cursorColor="#212121"
            placeholder="Login"
            placeholderTextColor="#BDBDBD"
            onFocus={() => setInputFocusName(true)}
            onBlur={() => setInputFocusName(false)}
          />
          <TextInput
            style={[styles.input, inputFocusEmail && styles.inputFocus]}
            cursorColor="#212121"
            placeholder="Email"
            placeholderTextColor="#BDBDBD"
            onFocus={() => setInputFocusEmail(true)}
            onBlur={() => setInputFocusEmail(false)}
          />

          <View style={styles.inputWrap}>
            <TextInput
              style={[styles.input, inputFocusPassword && styles.inputFocus]}
              cursorColor="#212121"
              placeholder="Password"
              placeholderTextColor="#BDBDBD"
              secureTextEntry={showPassword}
              onFocus={() => setInputFocusPassword(true)}
              onBlur={() => setInputFocusPassword(false)}
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
            onPress={() => console.log(inputRef.current.isFocused())}
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
