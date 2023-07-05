import { useNavigation, useRoute } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import { RadiusView } from 'app/shared/components/RadiusView';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image } from 'react-native';

export const ParkingDetailScreen = () => {
  const route = useRoute();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { parkingInfo, duration, distance } = route?.params;
  const { address, available, image, name, parkType, quantity } = parkingInfo;
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
        <View
          style={{
            flexDirection: 'row',
            width: Const.deviceWidth - 62,
            justifyContent: 'space-evenly',
            marginTop: Const.space_40,
            marginBottom: Const.space_35,
          }}
        >
          <RadiusView
            text={distance}
            leftIcon={Assets.AppIcons.icLocationFeature}
          />
          <RadiusView
            text={parkType === 0 ? t('Planned') : t('Spontaneous')}
            leftIcon={Assets.AppIcons.icParkingFeature}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: Font.semiBold,
              fontSize: FontSize.s_24,
              color: Assets.AppColors.black,
              fontWeight: '600',
            }}
          >
            {t('Information')}
          </Text>
          <Text
            style={{
              fontFamily: Font.regular,
              fontSize: FontSize.s_20,
              color: Assets.AppColors.starDust,
              fontWeight: '500',
              fontStyle: 'italic',
            }}
          >
            {t('Time to drive: ') + duration}
          </Text>
          <Text
            style={{
              fontFamily: Font.medium,
              fontSize: FontSize.s_20,
              color: Assets.AppColors.feature,
              fontWeight: '500',
              fontStyle: 'italic',
            }}
          >
            {t('Available: ') + available + '/' + quantity}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: Const.space_31,
          marginBottom: Const.space_40,
        }}
      >
        <RadiusButton
          title={t('Cancel')}
          type="negative"
          style={{ width: (Const.deviceWidth - 62) / 2 - 20 }}
          onPress={() => {
            NavigatorUtils.goBack();
          }}
        />
        <RadiusButton
          title={t('Book Parking')}
          type="positive"
          style={{ width: (Const.deviceWidth - 62) / 2 - 20 }}
          onPress={() => {
            NavigatorUtils.gotoBookParking({}, navigation);
          }}
        />
      </View>
    </View>
  );
};
