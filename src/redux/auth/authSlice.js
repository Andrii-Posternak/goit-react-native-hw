import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userId: null,
  userName: null,
  userEmail: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
    }),

    logout: (state, { payload }) => ({
      ...authInitialState,
    }),

    authStateChange: (state, { payload }) => {
      return {
        ...state,
        isAuth: payload.isAuth,
      };
    },
  },
});

export const { updateUserProfile, logout, authStateChange } = authSlice.actions;

export const selectUserId = (state) => state.auth.userId;
export const selectUserName = (state) => state.auth.userName;
export const selectUserEmail = (state) => state.auth.userEmail;
export const selectIsAuth = (state) => state.auth.isAuth;
