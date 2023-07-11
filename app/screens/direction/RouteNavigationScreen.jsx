import Assets from 'app/assets/Assets';
import { Header } from 'app/shared/components/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export const RouteNavigationScreen = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Assets.AppColors.white,
      }}
    />
  );
};
