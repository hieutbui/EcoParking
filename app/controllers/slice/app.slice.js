import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  language: 'en',
};

const actions = {};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: actions,
  extraReducers: builder => {},
});

export default AppSlice.reducer;
