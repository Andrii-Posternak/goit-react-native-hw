import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  image: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "flex-end",
  },

  form: {
    width: "100%",
    height: 550,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    // paddingVertical: 32,
    paddingTop: 92,
    paddingBottom: 32,
    color: "red",
  },

  titleForm: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",

    marginBottom: 32,
  },

  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,

    padding: 16,
    marginBottom: 16,

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  inputFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#ffffff",
  },

  inputWrap: {
    position: "relative",
  },

  inputBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },

  inputBtnTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,

    marginTop: 28,
    marginBottom: 16,
  },

  btnTitle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },

  navigate: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});
