import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'app/types/app';

/**
 * @type {AppState}
 */
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
