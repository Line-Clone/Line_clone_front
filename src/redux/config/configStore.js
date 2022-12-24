import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({

});

const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;