import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_lGXbi1IAgrAvYdexNk_28xvUIoVRdcc",
  authDomain: "react-native-hw-4f66c.firebaseapp.com",
  projectId: "react-native-hw-4f66c",
  storageBucket: "react-native-hw-4f66c.appspot.com",
  messagingSenderId: "699871142072",
  appId: "1:699871142072:web:72ec85e41bab444404d44d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
