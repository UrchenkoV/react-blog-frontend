import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPost = createAsyncThunk("posts/fetchPosts", async (query) => {
  const req = query ? `?populate=desc` : "";

  const { data } = await axios.get("/posts" + req);
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

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostByIdStatus",
  async (id) => {
    const { data } = await axios.get(`/posts/${id}`);
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
  fullPost: {
    item: null,
    status: "loading",
  },
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    upadateFullPostOnAddComment(state, action) {
      state.fullPost.item.commentCount = state.fullPost.item.commentCount + 1;
      state.fullPost.item.comments.push(action.payload);
    },
  },

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
    //
    builder.addCase(fetchPostById.pending, (state) => {
      state.fullPost.status = "loading";
      state.fullPost.item = null;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.fullPost.status = "success";
      state.fullPost.item = action.payload;
    });
    builder.addCase(fetchPostById.rejected, (state) => {
      state.fullPost.status = "error";
      state.fullPost.item = null;
    });
  },
});

export const selectPost = (state) => state.post;

export const { upadateFullPostOnAddComment } = postSlice.actions;

export default postSlice.reducer;
