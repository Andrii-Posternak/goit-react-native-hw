import { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
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
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isInputLoginInFocus, setIsInputLoginInFocus] = useState(false);
  const [isInputEmailInFocus, setIsInputEmailInFocus] = useState(false);
  const [isInputPasswordInFocus, setIsInputPasswordInFocus] = useState(false);

  const handleChangeLogin = (value) =>
    setFormData((prevState) => ({ ...prevState, login: value }));

  const handleChangeEmail = (value) =>
    setFormData((prevState) => ({ ...prevState, email: value }));

  const handleChangePassword = (value) =>
    setFormData((prevState) => ({ ...prevState, password: value }));

  const handleFocusLogin = () => {
    setIsInputLoginInFocus(true);
    setShowKeyboard(true);
  };

  const handleFocusEmail = () => {
    setIsInputEmailInFocus(true);
    setShowKeyboard(true);
  };

  const handleFocusPassword = () => {
    setIsInputPasswordInFocus(true);
    setShowKeyboard(true);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData(initialState);
    hideKeyboard();
  };

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setShowKeyboard(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setShowKeyboard(false);
    });
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../images/background.png")}
        >
          <View
            style={{ ...styles.form, paddingBottom: showKeyboard ? 16 : 80 }}
          >
            <AvatarForm />
            <Text style={styles.titleForm}>Registration</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={[styles.input, isInputLoginInFocus && styles.inputFocus]}
                maxLength={20}
                cursorColor="#212121"
                placeholder="Login"
                placeholderTextColor="#BDBDBD"
                value={formData.login}
                onChangeText={handleChangeLogin}
                onFocus={handleFocusLogin}
                onBlur={() => setIsInputLoginInFocus(false)}
              />

              <TextInput
                style={[styles.input, isInputEmailInFocus && styles.inputFocus]}
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
              <Text style={styles.btnTitle}>Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.navigate}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
