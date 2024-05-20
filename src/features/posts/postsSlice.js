import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_TOKEN } from "../../constant/constants";

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUsersPosts",
  async (userId = "") => {
    const response = await axios.get(
      `https://gorest.co.in/public/v2/users/${userId}/posts`,
      { headers: { Authorization: `Bearer ${API_TOKEN}` } }
    );
    return response.data;
  }
);

export const AddNewUserPost = createAsyncThunk(
  "posts/AddNewUserPost",
  async (initialPost) => {
    const response = await axios.post(
      `https://gorest.co.in/public/v2/users/${initialPost.user_id}/posts`,
      initialPost,
      { headers: { Authorization: `Bearer ${API_TOKEN}` } }
    );
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPostStatus } = postsSlice.actions;

export default postsSlice.reducer;

export const { selectAll: selectAllPosts, selectById: selectPostById } =
  postsAdapter.getSelectors((state) => state.posts);
