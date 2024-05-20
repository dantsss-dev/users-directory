import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (searchParam = "name=") => {
    const response = await axios.get(
      `https://gorest.co.in/public/v2/users?${searchParam}&page=1&per_page=12`
    );
    return response.data;
  }
);

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  const response = await axios.get(
    `https://gorest.co.in/public/v2/users?id=${userId}`
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUserStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";

        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";

        usersAdapter.upsertMany(state, action.payload);
      });
  },
});

export const { resetUserStatus } = usersSlice.actions;

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
