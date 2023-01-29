import { configureStore } from "@reduxjs/toolkit";
import post from "./post/slice";
import auth from "./auth/slice";

const store = configureStore({
  reducer: {
    post,
    auth,
  },
});

export default store;
