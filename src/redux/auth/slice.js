import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

const initialState = {
  user: null,
  status: "loading",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "success";
      state.isAuth = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.user = null;
      state.status = "loading";
      state.isAuth = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
      state.isAuth = true;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.user = null;
      state.status = "error";
      state.isAuth = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
