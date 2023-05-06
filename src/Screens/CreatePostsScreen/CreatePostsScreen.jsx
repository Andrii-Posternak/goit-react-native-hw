import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  MaterialIcons,
  SimpleLineIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./CreatePostsScreenStyle";

const initialState = {
  name: "",
  latitude: "",
  longitude: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  //camera
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);

  //form
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(null);
  const [location, setLocation] = useState(initialState);

  //input
  const [isInputDescriptionInFocus, setIsInputDescriptionInFocus] =
    useState(false);
  const [isInputLocationInFocus, setIsInputLocationInFocus] = useState(false);

  //all permissions
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    if (isCameraOpen) {
      (async () => {
        try {
          //get  permissions
          const cameraPermission = await Camera.requestCameraPermissionsAsync();
          const mediaPermission = await MediaLibrary.requestPermissionsAsync();
          const locationPermission =
            await Location.requestForegroundPermissionsAsync();

          setHasPermission(
            cameraPermission.status === "granted" &&
              mediaPermission.status === "granted" &&
              locationPermission.status === "granted"
          );
        } catch (error) {
          alert(error.message);
        }
      })();
    }
  }, [isCameraOpen]);

  const toggleCamera = () => {
    if (hasPermission === false) {
      alert(
        "No permission to access camera, media or location. You must grant permission."
      );
    } else {
      setIsCameraOpen(!isCameraOpen);
    }
  };

  const toggleCameraType = () => {
    if (cameraType === "back") {
      return setCameraType(CameraType.front);
    }
    return setCameraType(CameraType.back);
  };

  const takePhoto = async () => {
    try {
      const { uri } = await cameraRef.takePictureAsync();
      const { coords } = await Location.getCurrentPositionAsync({});

      setPhoto(uri);
      setLocation((prevState) => ({
        ...prevState,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));

      toggleCamera();
    } catch (error) {
      alert(error.message);
    }
  };

  const uploadPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!location.name) {
        return alert("Enter location first");
      }

      if (!result.canceled) {
        await Location.requestForegroundPermissionsAsync();
        const [coords] = await Location.geocodeAsync(location.name);

        setLocation((prevState) => ({
          ...prevState,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }));
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const hasData = () => {
    if (photo && description && location.name) {
      return true;
    }
    return false;
  };

  const deletePost = () => {
    setPhoto(null);
    setDescription(null);
    setLocation(initialState);
  };

  const publishPost = () => {
    if (!hasData()) {
      alert("Add photo and fill in all fields");
    } else {
      deletePost();
      navigation.navigate("Posts", { photo, description, location });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {isCameraOpen ? (
        <Camera style={styles.camera} type={cameraType} ref={setCameraRef}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              activeOpacity={0.5}
              onPress={toggleCamera}
            >
              <Ionicons name="arrow-back" size={24} color="#212121" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.takePhotoBtn}
              activeOpacity={0.5}
              onPress={takePhoto}
            >
              <MaterialIcons name="photo-camera" size={24} color="#212121" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.changeCameraBtn}
              activeOpacity={0.5}
              onPress={toggleCameraType}
            >
              <Ionicons
                name="camera-reverse-outline"
                size={24}
                color="#212121"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.photo} source={{ uri: photo }} />
            <TouchableOpacity
              style={
                photo
                  ? { ...styles.cameraBtn, backgroundColor: "#ffffff4d" }
                  : styles.cameraBtn
              }
              activeOpacity={0.5}
              onPress={toggleCamera}
            >
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={photo ? "#ffffff" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.uploadBtn}
            activeOpacity={0.5}
            onPress={uploadPhoto}
          >
            <Text style={styles.text}>
              {photo ? "Edit photo" : "Upload photo"}
            </Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <TextInput
              style={[
                styles.text,
                styles.input,
                isInputDescriptionInFocus && { borderBottomColor: "#FF6C00" },
              ]}
              maxLength={40}
              cursorColor="#212121"
              placeholder="Description"
              placeholderTextColor="#BDBDBD"
              value={description}
              onChangeText={(value) => setDescription(value)}
              onFocus={() => setIsInputDescriptionInFocus(true)}
              onBlur={() => setIsInputDescriptionInFocus(false)}
            />
            <View style={styles.inputWrap}>
              <TextInput
                style={[
                  styles.text,
                  styles.input,
                  { paddingLeft: 28 },
                  isInputLocationInFocus && {
                    borderBottomColor: "#FF6C00",
                  },
                ]}
                maxLength={40}
                cursorColor="#212121"
                placeholder="Location"
                placeholderTextColor="#BDBDBD"
                value={location.name}
                onChangeText={(value) =>
                  setLocation((prevState) => ({ ...prevState, name: value }))
                }
                onFocus={() => setIsInputLocationInFocus(true)}
                onBlur={() => setIsInputLocationInFocus(false)}
              />
              <SimpleLineIcons
                style={styles.iconLocation}
                name="location-pin"
                size={24}
                color="#BDBDBD"
              />
            </View>

            <TouchableOpacity
              style={[styles.btn, hasData() && { backgroundColor: "#FF6C00" }]}
              activeOpacity={0.5}
              onPress={() => publishPost()}
            >
              <Text style={[styles.text, hasData() && { color: "#ffffff" }]}>
                Publish
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.5}
            onPress={deletePost}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};
