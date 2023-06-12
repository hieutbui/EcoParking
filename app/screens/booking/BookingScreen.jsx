import Assets from 'app/assets/Assets';
import { Header } from 'app/shared/components/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export const BookingScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <Header title={t('MyParking')} />
      <View style={{ flex: 1, backgroundColor: Assets.AppColors.white }} />
    </View>
  );
};
