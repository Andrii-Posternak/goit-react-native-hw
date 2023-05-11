import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, authStateChange, logout } from "./authSlice";

export const authSignUp =
  ({ login, email, password, userAvatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: userAvatar,
      });

      const user = auth.currentUser;
      console.log("operation==>", user);
      const payload = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userAvatar: user.photoURL,
      };

      dispatch(updateUserProfile(payload));
    } catch (error) {
      alert(error.message);
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("inside login", user);

      const payload = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        userAvatar: user.photoURL,
      };

      dispatch(updateUserProfile(payload));
    } catch (error) {
      alert(error.message);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error) {
    alert(error.message);
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const payload = {
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userAvatar: user.photoURL,
        };
        console.log("currnt==>", user.photoURL);

        dispatch(updateUserProfile(payload));
        dispatch(authStateChange({ isAuth: true }));
      }
    });
  } catch (error) {
    alert(error.message);
  }
};
