import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authInstance } from "../../core/api/axios";

const initialState = {
  id: 0,
  roomName: "",
  createUserName: "",
  messageList: [
    {
      sender: "",
      message: "",
    },
  ],
  isLoading: false,
  error: null,
};

export const getChat = createAsyncThunk(
  "chat/getChat",
  async (roomId, thunkAPI) => {
    console.log("chat 넘어온 값:", roomId);
    try {
      const response = await authInstance.get(`/api/chat/room/${roomId}`);
      console.log("chat response.data:", response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("get chat error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: {
    [getChat.fulfilled]: (state, action) => {
      console.log("chat action:", action.payload);
      state.messageList = action.payload;
    },
  },
});

export default chatSlice.reducer;
