import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./LoginStyle";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [padding, setPadding] = useState(144);
  const [isInputEmailInFocus, setIsInputEmailInFocus] = useState(false);
  const [isInputPasswordInFocus, setIsInputPasswordInFocus] = useState(false);

  const navigation = useNavigation();

  const handleChangeEmail = (value) =>
    setFormData((prevState) => ({ ...prevState, email: value }));

  const handleChangePassword = (value) =>
    setFormData((prevState) => ({ ...prevState, password: value }));

  const handleFocusEmail = () => {
    setIsInputEmailInFocus(true);
  };

  const handleFocusPassword = () => {
    setIsInputPasswordInFocus(true);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData(initialState);
    hideKeyboard();
    navigation.navigate("Home");
  };

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", (e) => {
      const keyboardHeight = e.endCoordinates.height;
      setPadding(keyboardHeight + 16);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setPadding(144);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ImageBackground
        style={styles.image}
        source={require("../../images/background.png")}
      >
        <ScrollView style={styles.scrollBox}>
          <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View style={{ ...styles.form, paddingBottom: padding }}>
              <Text style={styles.titleForm}>Login</Text>

              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  style={[
                    styles.input,
                    isInputEmailInFocus && styles.inputFocus,
                  ]}
                  maxLength={20}
                  cursorColor="#212121"
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  value={formData.email}
                  onChangeText={handleChangeEmail}
                  onFocus={handleFocusEmail}
                  onBlur={() => setIsInputEmailInFocus(false)}
                />

                <View style={styles.inputWrap}>
                  <TextInput
                    style={[
                      styles.input,
                      isInputPasswordInFocus && styles.inputFocus,
                    ]}
                    maxLength={20}
                    cursorColor="#212121"
                    placeholder="Password"
                    placeholderTextColor="#BDBDBD"
                    secureTextEntry={showPassword}
                    value={formData.password}
                    onChangeText={handleChangePassword}
                    onFocus={handleFocusPassword}
                    onBlur={() => setIsInputPasswordInFocus(false)}
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
              </KeyboardAvoidingView>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.navigate}>
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
