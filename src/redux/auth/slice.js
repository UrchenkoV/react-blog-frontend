import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

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
      window.localStorage.removeItem("token");
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

    builder.addCase(fetchUser.pending, (state) => {
      state.user = null;
      state.status = "loading";
      state.isAuth = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
      state.isAuth = true;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = null;
      state.status = "error";
      state.isAuth = false;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.user = null;
      state.status = "loading";
      state.isAuth = false;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
      state.isAuth = true;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.user = null;
      state.status = "error";
      state.isAuth = false;
    });
  },
});

export const selectAuth = (state) => state.auth;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
