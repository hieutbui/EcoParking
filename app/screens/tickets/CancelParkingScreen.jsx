import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export const CancelParking = () => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Assets.AppColors.white,
      }}
    >
      <Header
        title={t('Cancel Parking')}
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.goBack()}
        style={{
          paddingBottom: Const.space_28,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Assets.AppColors.white,
          paddingHorizontal: Const.space_31,
        }}
      >
        <Text
          style={{
            fontFamily: Font.medium,
            fontSize: FontSize.s_20,
            color: Assets.AppColors.carbonGrey,
            flexWrap: 'wrap',
            flexShrink: 1,
          }}
        >
          {t(
            'Please select a payment refund method (only 80% will be refunded).',
          )}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Assets.AppColors.white,
          paddingBottom: Const.space_30,
          paddingHorizontal: Const.space_31,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: Const.space_17,
          }}
        >
          <Text
            style={{
              fontFamily: Font.regular,
              fontSize: FontSize.s_18,
              color: Assets.AppColors.textBlack,
              marginRight: Const.space_13,
            }}
          >
            {t('Paid')}: $4.81
          </Text>
          <Text
            style={{
              fontFamily: Font.semiBold,
              fontSize: FontSize.s_18,
              color: Assets.AppColors.textBlack,
            }}
          >
            {t('Refund')}: $4.81
          </Text>
        </View>
        <RadiusButton
          title={t('Continue')}
          type="positive"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
