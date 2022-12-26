import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, instance } from "../../core/api/axios";
import { authInstance } from "../../core/api/axios";
import React from "react";

const initialState = {
  rooms: [],
  room: {},
  isLoading: false,
  error: null,
};

export const readAllRooms = createAsyncThunk(
  "rooms/READ_ROOMS",
  async (payload, thunkAPI) => {
    try {
      const response = await authInstance.get("/chat/rooms");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const getMemeById = createAsyncThunk(
//   "meme/GET_MEME_BY_ID",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await baseURL.get(`/api/memes/${payload}`);
//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

const chatRoomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: {
    [readAllRooms.pending]: (state) => {
      state.isLoading = true;
    },
    [readAllRooms.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.rooms = action.payload;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default chatRoomsSlice.reducer;
