import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchUser = createAsyncThunk("users/fetchUser", async (KOD_UR) => {
  try {
    const { data } = await axios.post("/user",{KOD_UR:KOD_UR});
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const fetchTwoYearsData = createAsyncThunk(
  "users/fetchTwoYearsData",
  async (KOD_UR) => {
    const { data } = await axios.post(`/data`,{KOD_UR:KOD_UR});
    return data;
  }
);
export const fetchActiveUsers = createAsyncThunk(
  "users/fetchActiveUsers",
  async () => {
    const { data } = await axios.get(`/users/active`);
    return data;
  }
);
export const fetchFiredUsers = createAsyncThunk(
  "users/fetchFiredUsers",
  async () => {
    const { data } = await axios.get(`/users/fired`);
    return data;
  }
);

const initialState = {
  user: {
    items: [],
    data:[],
    loading: "loading",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.user.items = [];
      state.user.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user.items = action.payload;
      state.user.status = "loaded";
    },
    [fetchUser.rejected]: (state) => {
      state.user.items = [];
      state.user.status = "error";
    },
    [fetchTwoYearsData.pending]: (state) => {
      state.user.data = [];
      state.user.status = "loading";
    },
    [fetchTwoYearsData.fulfilled]: (state, action) => {
      state.user.data = action.payload;
      state.user.status = "loaded";
    },
    [fetchTwoYearsData.rejected]: (state) => {
      state.user.data = [];
      state.user.status = "error";
    },
    [fetchActiveUsers.pending]: (state) => {
      state.users.items = [];
      state.users.status = "loading";
    },
    [fetchActiveUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchActiveUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = "error";
    },
    [fetchFiredUsers.pending]: (state) => {
      state.users.items = [];
      state.users.status = "loading";
    },
    [fetchFiredUsers.fulfilled]: (state, action) => {
      state.users.items = action.payload;
      state.users.status = "loaded";
    },
    [fetchFiredUsers.rejected]: (state) => {
      state.users.items = [];
      state.users.status = "error";
    },
  },
});

export const userReducer = userSlice.reducer;
