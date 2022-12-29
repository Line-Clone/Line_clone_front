import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, instance } from "../../core/api/axios";
import { authInstance } from "../../core/api/axios";
import React from "react";

const initialState = {
  id: 11,
  roomName: "",
  createUserName: null,
  messageList: [],
  isLoading: false,
  error: null,
};

export const readBeforeChat = createAsyncThunk(
  "chat/READ_BEFORE_CHAT",
  async (payload, thunkAPI) => {
    try {
      const response = await authInstance.get(`/chat/room/join/${payload}`);
      return thunkAPI.fulfillWithValue(response.data.messageList);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [readBeforeChat.pending]: (state) => {
      state.isLoading = true;
    },
    [readBeforeChat.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messageList = action.payload;
    },
    [readBeforeChat.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default chatSlice.reducer;
