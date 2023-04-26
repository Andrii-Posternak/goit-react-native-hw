import { useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AvatarForm } from "../../components/AvatarForm/AvatarForm";
import { styles } from "./RegisterStyle";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [inputFocusLogin, setInputFocusLogin] = useState(false);
  const [inputFocusEmail, setInputFocusEmail] = useState(false);
  const [inputFocusPassword, setInputFocusPassword] = useState(false);

  const hundleChangeLogin = (value) =>
    setFormData((prevState) => ({ ...prevState, login: value }));

  const hundleChangeEmail = (value) =>
    setFormData((prevState) => ({ ...prevState, email: value }));

  const hundleChangePassword = (value) =>
    setFormData((prevState) => ({ ...prevState, password: value }));

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
            style={[styles.input, inputFocusLogin && styles.inputFocus]}
            cursorColor="#212121"
            placeholder="Login"
            placeholderTextColor="#BDBDBD"
            value={formData.login}
            onChangeText={hundleChangeLogin}
            onFocus={() => setInputFocusLogin(true)}
            onBlur={() => setInputFocusLogin(false)}
          />

          <TextInput
            style={[styles.input, inputFocusEmail && styles.inputFocus]}
            cursorColor="#212121"
            placeholder="Email"
            placeholderTextColor="#BDBDBD"
            value={formData.email}
            onChangeText={hundleChangeEmail}
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
              value={formData.password}
              onChangeText={hundleChangePassword}
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
            onPress={() => {
              console.log(formData);
              setFormData(initialState);
            }}
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
