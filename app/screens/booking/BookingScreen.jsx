import Assets from 'app/assets/Assets';
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
        <RadiusButton
          title="get route"
          type="positive"
          onPress={async () => {
            const route = await api.park.getDirection({
              startLongitude: 105.847556,
              startLatitude: 20.976937,
              endLongitude: 20.976937,
              endLatitude: 21.030765,
            });
            console.log({ direction: route?.routes[0]?.geometry });
          }}
        />
      </View>
    </View>
  );
};
