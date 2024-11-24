import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
  name: "Auth",
  initialState: {
    isAuth: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    update: (state, action) => {
      if (state.isAuth) {
        state.user = action.payload.user;
      }
    },
  },
});
export const { login, logout, update } = Auth.actions;
export const authReducer = Auth.reducer;
