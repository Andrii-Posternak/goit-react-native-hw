import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 34,
    backgroundColor: "#ffffff",
  },

  imageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    overflow: "hidden",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 8,
  },

  cameraBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],

    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",

    alignItems: "center",
    justifyContent: "center",
  },

  uploadBtn: {
    marginRight: "auto",
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  form: {
    marginTop: 48,
  },

  input: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",

    color: "#212121",

    paddingBottom: 16,
    marginBottom: 32,
  },

  inputWrap: {
    position: "relative",
  },

  iconLocation: {
    position: "absolute",
    top: 4,
  },

  btn: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 32,
  },

  deleteBtn: {
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",

    justifyContent: "center",
    alignItems: "center",

    marginTop: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },

  //camera style
  camera: {
    width: "100%",
    height: "70%",

    alignItems: "center",
    justifyContent: "flex-end",

    paddingBottom: 34,
  },

  preview: {
    position: "absolute",
    top: 30,
    left: 20,

    width: width - 2 * 20,
    height: height - (88 + 20 + 60 + 54),
    borderWidth: 1,
    borderColor: "#ffffff",
  },

  photo: {
    width: "100%",
    height: "100%",
  },

  confirmBtn: {
    position: "absolute",
    bottom: 20,
    left: width / 2 - 80,

    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "green",

    alignItems: "center",
    justifyContent: "center",
  },

  rejectBtn: {
    position: "absolute",
    bottom: 20,
    right: width / 2 - 80,

    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",

    alignItems: "center",
    justifyContent: "center",
  },

  btnContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",

    alignItems: "center",
    justifyContent: "center",
  },

  takePhotoBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",

    alignItems: "center",
    justifyContent: "center",
  },

  changeCameraBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",

    alignItems: "center",
    justifyContent: "center",
  },
});
