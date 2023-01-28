import { configureStore } from "@reduxjs/toolkit";
import post from "./post/slice";

const store = configureStore({
  reducer: {
    post,
  },
});

export default store;
