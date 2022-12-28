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
      console.log(response.data);
      console.log(response.data.userInfo);
      console.log(response.data.chatRoomList);
      return thunkAPI.fulfillWithValue({
        rooms: response.data.chatRoomList,
        userInfo: response.data.userInfo,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const readOneRoom = createAsyncThunk(
  "room/readOneRoom",
  async (roomId, thunkAPI) => {
    try {
      const response = await authInstance.get(`/api/chat/room/${roomId}`);
      console.log("readOne:", response);
      return thunkAPI.fulfillWithValue({
        rooms: response.data.chatRoomList,
        userinfo: response.data.userinfo,
      });
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
      state.rooms = action.payload.rooms;
      state.userInfo = action.payload.userInfo;
    },
    [readAllRooms.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [readOneRoom.fulfilled]: (state, action) => {
      console.log("oneroom payload:", action.payload);
      state.rooms = action.payload.rooms;
      state.userinfo = action.payload.userinfo;
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
