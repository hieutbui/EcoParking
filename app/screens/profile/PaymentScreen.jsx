import { useNavigation, useRoute } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import { RadioButton } from 'app/shared/components/RadioButton';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export const PaymentScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [isSelectGoogle, setIsSelectGoogle] = useState(false);
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
        style={{ marginBottom: Const.space_28 }}
        title={t('Payment')}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: Const.space_31,
        }}
      >
        <Text
          style={{
            fontSize: FontSize.s_20,
            color: Assets.AppColors.black,
            fontFamily: Font.semiBold,
          }}
        >
          {t('Choose Payment Methods')}
        </Text>
        <View
          style={{
            marginTop: Const.space_24,
          }}
        >
          <RadioButton
            type={'payment'}
            title="Google"
            message="test"
            isSelected={isSelectGoogle}
            onPress={() => {
              setIsSelectGoogle(true);
            }}
            leftIcon={Assets.AppIcons.icBookingActive}
          />
        </View>
      </View>
      {route.params?.type === 'booking' ? (
        <View
          style={{
            paddingHorizontal: Const.space_31,
          }}
        >
          <RadiusButton
            type={'positive'}
            title={t('Continue')}
            onPress={() => {
              NavigatorUtils.gotoReviewSummary({}, navigation);
            }}
            style={{
              alignSelf: 'center',
              marginBottom: Const.space_30,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};
