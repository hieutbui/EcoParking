import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Ticket } from 'app/types';
import api from '../api';
import utils from 'app/shared/utils';
import i18n from '../language/i18n';
import Assets from 'app/assets/Assets';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import { rootNavigation } from 'app/screens/AppNavigator';

/**
 * @type {Ticket}
 */
export const initialState = {
  singleTicket: null,
};

const actions = {};

export const thunkCreateTicket = createAsyncThunk(
  '/createTicket',
  /**
   *
   * @param {{checkedIn: Date, checkedOut: Date, customerId: string, parkingId: string, carNumber: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.auth.createNewTicket(payload);
      return result.data;
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

const TicketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: actions,
  extraReducers: builder =>
    builder
      .addCase(thunkCreateTicket.rejected, state => {
        utils.hideDialog();
        utils.toast({ message: i18n.t('Can not create ticket') });
      })
      .addCase(thunkCreateTicket.pending, state => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkCreateTicket.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        state.singleTicket = payload;
        utils.showDialog({
          image: Assets.AppIcons.icSuccessDialog,
          title: i18n.t('Successful'),
          message: i18n.t('Successfully made payment for your parking'),
          options: [
            {
              type: 'positive',
              title: i18n.t('View Parking Ticket'),
              onPress: () => {
                utils.hideDialog();
                NavigatorUtils.gotoParkingTicket({}, rootNavigation);
              },
            },
          ],
        });
      }),
});

export default TicketSlice.reducer;
