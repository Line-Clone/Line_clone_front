import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authInstance } from "../../core/api/axios";

const initialState = {
  rooms: [],
  userInfo: {
    username: "",
    nickname: "",
  },
  isLoading: false,
  error: null,
};

export const createRoom = createAsyncThunk(
  "room/CREATE_ROOM",
  async (payload, thunkAPI) => {
    try {
      const response = await authInstance.post(`/chat/room?name=${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const readAllRooms = createAsyncThunk(
  "rooms/READ_ROOMS",
  async (payload, thunkAPI) => {
    try {
      const response = await authInstance.get("/chat/rooms");
      return thunkAPI.fulfillWithValue({
        rooms: response.data.chatRoomList,
        userInfo: response.data.userInfo,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      state.rooms = action.payload.rooms;
      state.userInfo = action.payload.userInfo;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createRoom.pending]: (state) => {
      state.isLoading = true;
    },
    [createRoom.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createRoom.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default chatRoomsSlice.reducer;
