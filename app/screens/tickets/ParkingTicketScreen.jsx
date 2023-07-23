import { useNavigation, useRoute } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { thunkGetBooking } from 'app/controllers/slice/account.slice';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import utils, { useAppSelector } from 'app/shared/utils';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch } from 'react-redux';

export const ParkingTicketScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const route = useRoute();

  const dispatch = useDispatch();

  const previousScreen = route.params?.previous;

  const { account, ticket } = useAppSelector(state => state);

  const { name, phoneNumber, _id } = account.userInfo;
  const { singleTicket, parkName, carNumber, ticketDetailId } = ticket;

  const ticketStart = new Date(singleTicket?.checkedIn);
  const month = ticketStart?.toLocaleString('default', { month: 'short' });
  const day = ticketStart?.getDate();
  const year = ticketStart?.getFullYear();

  /**
   *
   * @param {Date} startTime
   * @param {Date} endTime
   */
  function calculateDuration(startTime, endTime) {
    const utcStart = Date.UTC(
      startTime?.getFullYear(),
      startTime?.getMonth(),
      startTime?.getDate(),
      startTime?.getHours(),
      startTime?.getMinutes(),
      startTime?.getMilliseconds(),
    );
    const utcEnd = Date.UTC(
      endTime?.getFullYear(),
      endTime?.getMonth(),
      endTime?.getDate(),
      endTime?.getHours(),
      endTime?.getMinutes(),
      endTime?.getSeconds(),
      endTime?.getMilliseconds(),
    );
    return Math.abs(((utcEnd - utcStart) / (1000 * 60 * 60)).toFixed(0));
  }

  const currentDate = new Date();

  const valueToCode = {
    ticketId:
      previousScreen === 'create'
        ? ticketDetailId
        : route.params?.ticketDetailId,
    time: currentDate,
  };

  const QRvalue = JSON.stringify(valueToCode);

  const QRSize = 200;

  const data = {
    name,
    parking: previousScreen === 'create' ? parkName : route.params?.parkName,
    duration:
      calculateDuration(
        new Date(singleTicket?.checkedIn),
        new Date(singleTicket?.checkedOut),
      ) + ' hours',
    hours:
      utils.to12HourTime(new Date(singleTicket?.checkedIn)) +
      ' - ' +
      utils.to12HourTime(new Date(singleTicket?.checkedOut)),
    vehicle: previousScreen === 'create' ? carNumber : route.params?.carNumber,
    date: month + ' ' + day + ', ' + year,
    phone: phoneNumber,
  };

  return (
    <View
      style={{
        backgroundColor: Assets.AppColors.white,
        flex: 1,
      }}
    >
      <Header
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => {
          dispatch(thunkGetBooking({ userId: _id }));
          NavigatorUtils.gotoBooking({}, navigation);
        }}
        title={t('Parking Ticket')}
        style={{
          marginBottom: Const.space_28,
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: Const.space_31 }}>
        <View
          style={{
            paddingHorizontal: Const.space_20,
            alignItems: 'center',
            paddingTop: Const.space_19,
            paddingBottom: Const.space_24,
            borderRadius: Const.space_23,
            borderStyle: 'dashed',
            borderColor: Assets.AppColors.inactiveColor,
            borderWidth: Const.space_2,
          }}
        >
          <Text
            style={{
              marginBottom: Const.space_17,
              textAlign: 'center',
              fontFamily: Font.medium,
              fontSize: FontSize.s_16,
              color: Assets.AppColors.starDust,
            }}
          >
            {t(
              'Scan this on the scanner machine when you are in the parking lot',
            )}
          </Text>
          <QRCode
            value={QRvalue}
            logo={Assets.AppIcons.icParkingFeature}
            size={QRSize}
          />
        </View>
        <View
          style={{
            paddingHorizontal: Const.space_20,
            paddingTop: Const.space_12,
            borderRadius: Const.space_23,
            borderStyle: 'solid',
            borderColor: Assets.AppColors.inactiveColor,
            borderWidth: Const.space_2,
            borderTopWidth: Const.space_0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              maxWidth: '49%',
            }}
          >
            <Text style={styles.ticketFieldName}>{t('Name')}</Text>
            <Text style={styles.ticketFieldData}>{data.name}</Text>
            <Text style={styles.ticketFieldName}>{t('Parking Area')}</Text>
            <Text style={styles.ticketFieldData}>{data.parking}</Text>
            <Text style={styles.ticketFieldName}>{t('Duration')}</Text>
            <Text style={styles.ticketFieldData}>{data.duration}</Text>
            <Text style={styles.ticketFieldName}>{t('Hours')}</Text>
            <Text style={styles.ticketFieldData}>{data.hours}</Text>
          </View>
          <View
            style={{
              maxWidth: '49%',
            }}
          >
            <Text style={styles.ticketFieldName}>{t('Vehicle')}</Text>
            <Text style={styles.ticketFieldData}>{data.vehicle}</Text>
            <Text style={styles.ticketFieldName}>{t('Date')}</Text>
            <Text style={styles.ticketFieldData}>{data.date}</Text>
            <Text style={styles.ticketFieldName}>{t('Phone')}</Text>
            <Text style={styles.ticketFieldData}>{data.phone}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: Const.space_31,
          paddingBottom: Const.space_30,
        }}
      >
        <RadiusButton
          title={t('Parking Timer')}
          type="positive"
          onPress={() => {
            NavigatorUtils.gotoParkingTimer({}, navigation);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketFieldName: {
    fontFamily: Font.medium,
    fontSize: FontSize.s_16,
    color: Assets.AppColors.starDust,
  },
  ticketFieldData: {
    fontFamily: Font.semiBold,
    fontSize: FontSize.s_15,
    color: Assets.AppColors.black,
    marginBottom: Const.space_15,
  },
});
