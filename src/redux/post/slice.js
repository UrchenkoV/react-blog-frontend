import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPost = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

const initialState = {
  post: {
    items: [],
    status: "loading",
  },
  tag: {
    items: [],
    status: "loading",
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state) => {
      state.post.status = "loading";
      state.post.items = [];
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post.status = "success";
      state.post.items = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state) => {
      state.post.status = "error";
      state.post.items = [];
    });
    //
    builder.addCase(fetchTags.pending, (state) => {
      state.tag.status = "loading";
      state.tag.items = [];
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tag.status = "success";
      state.tag.items = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tag.status = "error";
      state.tag.items = [];
    });
    //
    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      state.post.items = state.post.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
