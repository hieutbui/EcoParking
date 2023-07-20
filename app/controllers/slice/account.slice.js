import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccountState } from 'app/types';
import api from '../api';
import _ from 'lodash';
import utils from 'app/shared/utils';
import i18n from '../language/i18n';
import Assets from 'app/assets/Assets';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import { rootNavigation } from 'app/screens/AppNavigator';
import Global from 'app/constants/Global';
import { store } from '../redux/AppStore';

/**
 * @type {AccountState}
 */
const initialState = {
  userInfo: {},
  status: 'loggedOut',
  ongoing: [],
  completed: [],
  canceled: [],
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

export const thunkUpdateProfile = createAsyncThunk(
  '/updateProfile',
  /**
   *
   * @param {{id: string, name: string, file: object, email: string, gender: 'Male' | 'Female' | 'Other', password: string, phoneNumber: string, address: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.auth.updateProfile(payload);
      return result.data;
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

export const thunkLogout = createAsyncThunk(
  '/logout',
  async (payload, __thunkAPI) => {
    try {
      console.log('logout');
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

export const thunkGetBooking = createAsyncThunk(
  '/getBooking',
  /**
   *
   * @param {{userId: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.auth.getBooking({ userId: payload.userId });
      return result.data;
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

export const thunkGetUserInfo = createAsyncThunk(
  '/getUserInfo',
  /**
   *
   * @param {{userId: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.auth.getUserInfo({ userId: payload.userId });
      return result.data;
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

export const thunkScanQR = createAsyncThunk(
  '/scanQR',
  /**
   *
   * @param {{ticketId: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.auth.scanQR(payload);
      return result.data;
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
        utils.hideLoading();
        if (!_.isEmpty(payload)) {
          state.status = 'loggedIn';
          state.userInfo = payload;
          Global.AccessToken = payload.accessToken;
        }
      })
      .addCase(thunkLogout.pending, state => {
        state.status = 'loggingOut';
      })
      .addCase(thunkLogout.rejected, state => {
        state.status = 'loggedOut';
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
        if (!_.isEmpty(payload)) {
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
        } else {
          utils.toast({ message: i18n.t('Cannot register') });
        }
      })
      .addCase(thunkUpdateProfile.pending, state => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkUpdateProfile.rejected, (state, { payload }) => {
        utils.hideLoading();
        utils.toast({ message: i18n.t('Cannot update profile') });
      })
      .addCase(thunkUpdateProfile.fulfilled, (state, { payload }) => {
        if (!_.isEmpty(payload)) {
          state.userInfo = payload;
          utils.hideLoading();
          utils.toast({ message: i18n.t('Update successfully') });
          NavigatorUtils.goBack();
        } else {
          utils.hideLoading();
          utils.toast({ message: i18n.t('Cannot update profile') });
        }
      })
      .addCase(thunkGetBooking.rejected, (state, { payload }) => {
        utils.hideLoading();
        utils.toast({ message: i18n.t('Cannot load booking') });
      })
      .addCase(thunkGetBooking.pending, state => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkGetBooking.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        if (payload) {
          const ongoingList = [];
          const completedList = [];
          const canceledList = [];
          payload.forEach(element => {
            if (element.status === 'completed') {
              completedList.push(element);
            } else if (element.status === 'canceled') {
              canceledList.push(element);
            } else if (
              element.status === 'paid' ||
              element.status === 'nowActive'
            ) {
              ongoingList.push(element);
            }
          });
          state.ongoing = ongoingList;
          state.completed = completedList;
          state.canceled = canceledList;
        }
      })
      .addCase(thunkGetUserInfo.pending, () => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkGetUserInfo.rejected, () => {
        utils.hideLoading();
        utils.toast({ message: i18n.t('Cannot get infos') });
      })
      .addCase(thunkGetUserInfo.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        if (!_.isEmpty(payload)) {
          state.userInfo = payload;
        } else {
          utils.toast({ message: i18n.t('Cannot get infos') });
        }
      })
      .addCase(thunkScanQR.pending, () => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkScanQR.rejected, () => {
        utils.hideLoading();
        utils.toast({ message: i18n.t('Cannot send ticket') });
      })
      .addCase(thunkScanQR.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        if (!_.isEmpty(payload)) {
          console.log({ payload });
          utils.toast({ message: i18n.t('Done') });
        } else {
          utils.toast({ message: i18n.t('Cannot send ticket info') });
        }
      }),
});

export default AccountSlice.reducer;
