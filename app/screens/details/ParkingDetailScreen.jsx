import { useRoute } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image } from 'react-native';

export const ParkingDetailScreen = () => {
  const route = useRoute();
  const { t } = useTranslation();
  const { address, available, image, name, parkType, quantity } =
    route?.params?.parkingInfo;
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
        title={t('Parking Details')}
      />
      <View
        style={{
          marginHorizontal: Const.space_31,
          flex: 1,
          marginTop: Const.space_25,
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: Const.deviceWidth - 62,
              height: 176,
              borderRadius: Const.space_20,
            }}
          />
        ) : null}
        <View
          style={{
            marginTop: Const.space_28,
          }}
        >
          <Text
            style={{
              fontFamily: Font.semiBold,
              fontSize: FontSize.s_24,
              color: Assets.AppColors.black,
              fontWeight: '600',
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontFamily: Font.medium,
              fontSize: FontSize.s_20,
              color: Assets.AppColors.starDust,
              fontWeight: '500',
            }}
          >
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
};
