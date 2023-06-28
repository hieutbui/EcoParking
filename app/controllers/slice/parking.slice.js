import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ParkingState } from 'app/types';
import api from '../api';
import utils from 'app/shared/utils';
import i18n from '../language/i18n';
import _ from 'lodash';

/**
 * @type {ParkingState}
 */
const initialState = {
  parks: null,
};

export const thunkGetAllParks = createAsyncThunk(
  '/getAllParks',
  /**
   * @author hieubt
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.park.getAll();
      return result.data;
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

const actions = {};

const ParkingSlice = createSlice({
  name: 'park',
  initialState,
  reducers: actions,
  extraReducers: builder =>
    builder
      .addCase(thunkGetAllParks.pending, state => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
        console.log('/getAllParks pending');
      })
      .addCase(thunkGetAllParks.rejected, (state, { payload }) => {
        utils.hideLoading();
        state.parks = null;
        utils.toast({ message: 'Cannot get parking' });
      })
      .addCase(thunkGetAllParks.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        if (!_.isEmpty(payload)) {
          state.parks = payload;
        }
      }),
});

export default ParkingSlice.reducer;
