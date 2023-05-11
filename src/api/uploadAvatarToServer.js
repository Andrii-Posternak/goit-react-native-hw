import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadAvatarToServer = async (image) => {
  try {
    const response = await fetch(image);
    const file = await response.blob();

    const uniqueID = Date.now().toString();
    const storageRef = ref(storage, `userAvatar/${uniqueID}`);

    const res = await uploadBytes(storageRef, file);

    // get url
    const userAvatarUrl = await getDownloadURL(storageRef);
    console.log("uniqueID==>", uniqueID);
    return userAvatarUrl;
  } catch (error) {
    alert(error.message);
  }
};
