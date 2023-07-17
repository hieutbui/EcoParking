import Assets from 'app/assets/Assets';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { ParkingInfo } from 'app/types';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import api from 'app/controllers/api';

export const SavedScreen = () => {
  const { t } = useTranslation();
  /**
   * @type {ParkingInfo[]}
   */
  const bookmarkData = [];
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
        <RadiusButton
          title="test"
          type="positive"
          onPress={async () => {
            await api.auth.createNewTicket({
              checkedIn: '2023-07-17T10:54:44.036Z',
              checkedOut: '2023-07-17T10:54:44.036Z',
              customerId: '649a530c5bc42395350de3b9',
              parkingId: '64a5a1f7a8ecc481377f7564',
            });
          }}
        />
      </View>
    </View>
  );
};
