import { useNavigation } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Header } from 'app/shared/components/Header';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export const ParkingTicketScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: Assets.AppColors.white,
        flex: 1,
      }}
    >
      <Header
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.gotoBooking({}, navigation)}
        title={t('Parking Ticket')}
      />
    </View>
  );
};
