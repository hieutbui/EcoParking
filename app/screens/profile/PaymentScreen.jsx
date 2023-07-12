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
  const [isSelectPaypal, setIsSelectPaypal] = useState(false);
  const [isSelectApple, setIsSelectApple] = useState(false);
  const [isSelected, setIsSelected] = useState('');
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
            isSelected={isSelectGoogle}
            onPress={() => {
              setIsSelectGoogle(true);
              setIsSelectApple(false);
              setIsSelectPaypal(false);
              setIsSelected('google');
            }}
            leftIcon={Assets.AppIcons.icGoogle}
            style={{
              marginBottom: Const.space_22,
            }}
          />
          <RadioButton
            type={'payment'}
            title="Paypal"
            isSelected={isSelectPaypal}
            onPress={() => {
              setIsSelectGoogle(false);
              setIsSelectApple(false);
              setIsSelectPaypal(true);
              setIsSelected('paypal');
            }}
            leftIcon={Assets.AppIcons.icPaypal}
            style={{
              marginBottom: Const.space_22,
            }}
          />
          <RadioButton
            type={'payment'}
            title="Apple"
            isSelected={isSelectApple}
            onPress={() => {
              setIsSelectGoogle(false);
              setIsSelectApple(true);
              setIsSelectPaypal(false);
              setIsSelected('apple');
            }}
            leftIcon={Assets.AppIcons.icApple}
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
              NavigatorUtils.gotoReviewSummary(
                {
                  parkingId: route.params?.parkingId,
                  carNumber: route.params?.carNumber,
                  checkedIn: route.params?.checkedIn,
                  checkedOut: route.params?.checkedOut,
                  payment: isSelected,
                },
                navigation,
              );
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
