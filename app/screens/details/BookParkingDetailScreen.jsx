import { useNavigation, useRoute } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';

export const BookParkingDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [startTime, setStartTime] = useState(new Date());
  const [openStartTime, setOpenStartTime] = useState(false);

  const [endTime, setEndTime] = useState(new Date());
  const [openEndTime, setOpenEndTime] = useState(false);

  return (
    <View
      style={{
        backgroundColor: Assets.AppColors.white,
        flex: 1,
      }}
    >
      <Header
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.goBack()}
        title={t('Book Parking Details')}
        style={{
          marginBottom: Const.space_28,
        }}
      />
      <View
        style={{
          paddingHorizontal: Const.space_31,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: FontSize.s_20,
            color: Assets.AppColors.black,
            fontFamily: Font.semiBold,
            marginBottom: Const.space_20,
          }}
        >
          {t('Select Date')}
        </Text>
        <Calendar
          initialDate={selectedDate}
          style={{
            borderRadius: Const.space_20,
          }}
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
          hideArrows={true}
          hideExtraDays={true}
          enableSwipeMonths={true}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: 'rgba(243, 243, 243, 1)',
            textSectionTitleColor: Assets.AppColors.black,
            selectedDayBackgroundColor: Assets.AppColors.feature,
            selectedDayTextColor: '#ffffff',
            todayTextColor: Assets.AppColors.black,
            dayTextColor: Assets.AppColors.black,
            textDisabledColor: '#d9e1e8',
            monthTextColor: Assets.AppColors.black,
            textDayFontFamily: 'inter',
            textMonthFontFamily: Font.semiBold,
            textDayHeaderFontFamily: 'inter',
            textDayFontWeight: '400',
            textDayHeaderFontWeight: '700',
            textDayFontSize: 15,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 11,
          }}
        />
        <View
          style={{
            marginTop: Const.space_32,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: FontSize.s_20,
                color: Assets.AppColors.black,
                fontFamily: Font.semiBold,
                marginBottom: Const.space_16,
              }}
            >
              {t('Start Hour')}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(240, 240, 240, 1)',
                flexDirection: 'row',
                width: 150,
                height: 49,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderRadius: Const.space_10,
              }}
              onPress={() => setOpenStartTime(true)}
            >
              <Text
                style={{
                  fontSize: FontSize.s_20,
                  color: Assets.AppColors.black,
                  fontFamily: Font.semiBold,
                }}
              >
                {startTime.getHours() + ':' + startTime.getMinutes()}
              </Text>
              <Image
                source={Assets.AppIcons.icClock}
                style={{ resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: Const.space_17,
            }}
          >
            <Text
              style={{
                fontSize: FontSize.s_20,
                color: Assets.AppColors.black,
                fontFamily: Font.semiBold,
                marginBottom: Const.space_16,
              }}
            >
              {t('End Hour')}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(240, 240, 240, 1)',
                flexDirection: 'row',
                width: 150,
                height: 49,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderRadius: Const.space_10,
              }}
              onPress={() => setOpenEndTime(true)}
            >
              <Text
                style={{
                  fontSize: FontSize.s_20,
                  color: Assets.AppColors.black,
                  fontFamily: Font.semiBold,
                }}
              >
                {endTime.getHours() + ':' + endTime.getMinutes()}
              </Text>
              <Image
                source={Assets.AppIcons.icClock}
                style={{ resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            fontSize: FontSize.s_20,
            color: Assets.AppColors.black,
            fontFamily: Font.semiBold,
          }}
        >
          {t('Total')}
        </Text>
      </View>
      <RadiusButton
        type={'positive'}
        title={t('Continue')}
        onPress={() => {
          NavigatorUtils.gotoPayment(
            {
              type: 'booking',
              parkingId: route.params?.parkingId,
              carNumber: route.params?.carNumber,
              checkedIn: startTime.toISOString(),
              checkedOut: endTime.toISOString(),
            },
            navigation,
          );
        }}
        style={{
          marginBottom: Const.space_30,
          width: Const.deviceWidth - 62,
          alignSelf: 'center',
        }}
      />
      <DatePicker
        modal
        date={startTime}
        mode={'time'}
        open={openStartTime}
        onConfirm={date => {
          setStartTime(date);
          setOpenStartTime(false);
        }}
        onCancel={() => {
          setOpenStartTime(false);
        }}
      />
      <DatePicker
        modal
        date={endTime}
        mode={'time'}
        open={openEndTime}
        onConfirm={date => {
          setEndTime(date);
          setOpenEndTime(false);
        }}
        onCancel={() => {
          setOpenEndTime(false);
        }}
      />
    </View>
  );
};
