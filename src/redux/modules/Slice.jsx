import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL, instance } from '../../core/api/axios';
import { Cookies } from 'react-cookie';


const initialState = {
  memes: [],
  meme: {
    title: '',
    img: '',
    contents: '',
    answerValue: 0,
    exam1: '',
    exam2: '',
    exam3: '',
  },
  isLoading: false,
  error: null,
};

export const createMeme = createAsyncThunk('meme/CREATE_MEME', async (payload, thunkAPI) => {
  try {
    const formData = new FormData();
    const json = JSON.stringify(payload.meme);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('requestDto', blob);
    formData.append('data', payload.img);

    const response = await baseURL.post('/api/memepost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const readMemes = createAsyncThunk('meme/READ_MEMES', async (payload, thunkAPI) => {
  try {
    const response = await baseURL.get('/api/memes');
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateMemes = createAsyncThunk('meme/UPDATE_MEMES', async (payload, thunkAPI) => {
  try {
    const formData = new FormData();
    const json = JSON.stringify(payload.meme);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('requestDto', blob);
    formData.append('data', payload.img);

    const response = await baseURL.patch(`/api/meme/${payload.meme.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const giveAnswer = createAsyncThunk('meme/GIVE_ANSWER', async (payload, thunkAPI) => {
  try {
    const response = await baseURL.post(`api/memeanswer/${payload.memeid}`, {
      answerValue: payload.answerValue,
    });
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteMemes = createAsyncThunk('meme/DELETE_MEMES', async (payload, thunkAPI) => {
  try {
    const response = await baseURL.delete(`api/meme/${payload}`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getMemeById = createAsyncThunk('meme/GET_MEME_BY_ID', async (payload, thunkAPI) => {
  try {
    const data = await baseURL.get(`/api/memes/${payload}`);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [giveAnswer.pending]: (state) => {
      state.isLoading = true;
    },
    [giveAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [giveAnswer.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createMeme.pending]: (state) => {
      state.isLoading = true;
    },
    [createMeme.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createMeme.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [readMemes.pending]: (state) => {
      state.isLoading = true;
    },
    [readMemes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.memes = action.payload;
    },
    [readMemes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updateMemes.pending]: (state) => {
      state.isLoading = true;
    },
    [updateMemes.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [updateMemes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteMemes.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteMemes.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteMemes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getMemeById.pending]: (state) => {
      state.isLoading = true;
    },
    [getMemeById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.meme = action.payload;
    },
    [getMemeById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;