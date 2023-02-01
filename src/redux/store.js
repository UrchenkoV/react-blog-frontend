import { configureStore } from "@reduxjs/toolkit";
import post from "./post/slice";
import auth from "./auth/slice";
import comment from "./comment/slice";

const store = configureStore({
  reducer: {
    post,
    auth,
    comment,
  },
});

export default store;
