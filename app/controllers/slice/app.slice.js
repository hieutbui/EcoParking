import { createSlice } from '@reduxjs/toolkit';
import { AppState } from 'app/types/app';

/**
 * @type {AppState}
 */
export const initialState = {
  language: 'en',
  flagAppLoadingHideDone: null,
};

const actions = {
  setFlagAppLoadingHideDone: (state, action) => {
    state.flagAppLoadingHideDone = action.payload;
  },
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: actions,
  extraReducers: builder => {},
});

export const { setFlagAppLoadingHideDone } = AppSlice.actions;
export default AppSlice.reducer;
