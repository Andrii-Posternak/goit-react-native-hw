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
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });

      const user = auth.currentUser;
      const payload = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
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
      console.log("inside login");
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const payload = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
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
        };

        dispatch(updateUserProfile(payload));
        dispatch(authStateChange({ isAuth: true }));
      }
    });
  } catch (error) {
    alert(error.message);
  }
};
