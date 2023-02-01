import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
  "comment/fetchCommentStatus",
  async () => {
    try {
      const { data } = await axios.get("/comments");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  comments: [],
  status: "loading",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = "loading";
      state.comments = [];
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "success";
      state.comments = action.payload;
      console.log(state, action);
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.status = "error";
      state.comments = [];
    });
  },
});

export const selectComment = (state) => state.comment;

export default commentSlice.reducer;
