import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccountState } from 'app/types';
import api from '../api';

/**
 * @type {AccountState}
 */
const initialState = {
  userInfo: {},
  status: 'loggedOut',
};

export const thunkLogin = createAsyncThunk(
  '/login',
  /**
   *
   * @param {{email: string, password: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.auth.login(payload?.email, payload?.password);
      return result.data;
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

export const thunkLogout = createAsyncThunk(
  'logout',
  async (payload, __thunkAPI) => {
    try {
      console.log('logout');
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

const actions = {};

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: actions,
  extraReducers: builder =>
    builder
      .addCase(thunkLogin.pending, state => {
        state.status = 'loggingIn';
      })
      .addCase(thunkLogin.rejected, (state, { payload }) => {
        state.status = 'loggedOut';
      })
      .addCase(thunkLogin.fulfilled, (state, { payload }) => {
        state.status = 'loggedIn';
        state.userInfo = payload;
      })
      .addCase(thunkLogout.pending, state => {
        state.status = 'loggingOut';
        state.userInfo = {};
      })
      .addCase(thunkLogout.rejected, state => {
        state.status = 'loggedIn';
      })
      .addCase(thunkLogout.fulfilled, state => {
        state.status = 'loggedOut';
      }),
});

export default AccountSlice.reducer;
