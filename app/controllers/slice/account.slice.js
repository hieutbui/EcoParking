import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccountState } from 'app/types';
import api from '../api';
import _ from 'lodash';
import utils from 'app/shared/utils';
import i18n from '../language/i18n';
import Assets from 'app/assets/Assets';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import { rootNavigation } from 'app/screens/AppNavigator';

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

export const thunkRegister = createAsyncThunk(
  '/register',
  /**
   *
   * @param {{name: string, file: object, email: string, gender: 'Male' | 'Female' | 'Other', password: string, phoneNumber: string, address: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.auth.register(payload);
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
        utils.showLoading({ message: i18n.t('Loading') + '...' });
        state.status = 'loggingIn';
      })
      .addCase(thunkLogin.rejected, (state, { payload }) => {
        utils.hideLoading();
        state.status = 'loggedOut';
        utils.toast({ message: i18n.t('Login failed') });
      })
      .addCase(thunkLogin.fulfilled, (state, { payload }) => {
        if (!_.isEmpty(payload)) {
          utils.hideLoading();
          state.status = 'loggedIn';
          state.userInfo = payload;
        }
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
      })
      .addCase(thunkRegister.pending, state => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkRegister.rejected, (state, { payload }) => {
        utils.hideLoading();
        utils.toast({ message: i18n.t('Cannot register') });
      })
      .addCase(thunkRegister.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        utils.showDialog({
          image: Assets.AppIcons.icSuccessDialog,
          title: i18n.t('Congratulations!'),
          message: i18n.t('Your account is ready to use'),
          options: [
            {
              type: 'positive',
              title: i18n.t('Go to Login'),
              onPress: () => NavigatorUtils.gotoLogin({}, rootNavigation),
            },
          ],
        });
      }),
});

export default AccountSlice.reducer;
