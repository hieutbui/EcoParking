import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Ticket } from 'app/types';
import api from '../api';
import utils from 'app/shared/utils';
import i18n from '../language/i18n';
import Assets from 'app/assets/Assets';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import { rootNavigation } from 'app/screens/AppNavigator';
import _ from 'lodash';

/**
 * @type {Ticket}
 */
export const initialState = {
  singleTicket: null,
  parkName: '',
  carNumber: '',
  ticketDetailId: '',
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

export const thunkGetSingleTicket = createAsyncThunk(
  '/getSingleTicket',
  /**
   *
   * @param {{ticketDetailId: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.ticket.getSingleTicket(payload);
      return result.data;
    } catch (error) {
      return __thunkAPI.rejectWithValue(error);
    }
  },
);

export const thunkCancelTicket = createAsyncThunk(
  '/getCancelTicket',
  /**
   *
   * @param {{ticketDetailId: string}} payload
   */
  async (payload, __thunkAPI) => {
    try {
      const result = await api.ticket.cancelTicket(payload);
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
        utils.hideLoading();
        utils.toast({ message: i18n.t('Can not create ticket') });
      })
      .addCase(thunkCreateTicket.pending, state => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkCreateTicket.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        if (!_.isEmpty(payload)) {
          state.singleTicket = payload?.singleTicket;
          state.parkName = payload?.parkName;
          state.carNumber = payload?.carNumber;
          state.ticketDetailId = payload?.ticketDetailId;
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
                  NavigatorUtils.gotoParkingTicket(
                    { previous: 'create' },
                    rootNavigation,
                  );
                },
              },
            ],
          });
        } else {
          utils.toast({ message: i18n.t('Can not create ticket') });
        }
      })
      .addCase(thunkGetSingleTicket.pending, () => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkGetSingleTicket.rejected, () => {
        utils.hideLoading();
        utils.toast({ message: i18n.t('Can not create ticket') });
      })
      .addCase(thunkGetSingleTicket.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        if (!_.isEmpty(payload)) {
          state.singleTicket = payload;
        } else {
          utils.toast({ message: i18n.t('Can not get ticket detail') });
        }
      })
      .addCase(thunkCancelTicket.pending, () => {
        utils.showLoading({ message: i18n.t('Loading') + '...' });
      })
      .addCase(thunkCancelTicket.rejected, () => {
        utils.hideLoading();
        utils.toast({ message: i18n.t('Can not cancel ticket') });
      })
      .addCase(thunkCancelTicket.fulfilled, (state, { payload }) => {
        utils.hideLoading();
        utils.showDialog({
          image: Assets.AppIcons.icSuccessDialog,
          title: i18n.t('Successful'),
          message: i18n.t(
            'You have successfully canceled your parking order. 80% funds will be returned to your account',
          ),
          options: [
            {
              type: 'positive',
              title: i18n.t('OK'),
              onPress: () => {
                utils.hideDialog();
                NavigatorUtils.gotoBooking({});
              },
            },
          ],
        });
      }),
});

export default TicketSlice.reducer;
