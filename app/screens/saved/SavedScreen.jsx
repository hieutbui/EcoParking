import Assets from 'app/assets/Assets';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export const SavedScreen = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title={t('MyBookmark')} />
      <View
        style={{
          backgroundColor: Assets.AppColors.white,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: Font.semiBold,
            color: Assets.AppColors.feature,
            fontSize: FontSize.s_20,
          }}
        >
          Coming Soon!
        </Text>
      </View>
    </View>
  );
};
