import Assets from 'app/assets/Assets';
import { Font, FontSize } from 'app/constants/Styles';
import api from 'app/controllers/api';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export const BookingScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <Header title={t('MyParking')} />
      <View
        style={{
          flex: 1,
          backgroundColor: Assets.AppColors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: Font.semiBold,
            fontSize: FontSize.s_20,
            color: Assets.AppColors.feature,
          }}
        >
          Coming Soon!
        </Text>
      </View>
    </View>
  );
};
