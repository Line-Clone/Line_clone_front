import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import rooms from "../modules/chatRoomSlice";
import chat from "../modules/chatSlice";

const rootReducer = combineReducers({
  rooms: rooms,
  chat: chat,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
