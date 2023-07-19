import { useRoute } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { thunkCancelTicket } from 'app/controllers/slice/ticket.slice';
import { Header } from 'app/shared/components/Header';
import { RadioButton } from 'app/shared/components/RadioButton';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import { useAppSelector } from 'app/shared/utils';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

export const CancelParking = () => {
  const { t } = useTranslation();

  const route = useRoute();

  const dispatch = useDispatch();

  const { _id } = useAppSelector(state => state.account.userInfo);

  const [isSelectGoogle, setIsSelectGoogle] = useState(false);
  const [isSelectPaypal, setIsSelectPaypal] = useState(false);
  const [isSelectApple, setIsSelectApple] = useState(false);
  const [isSelected, setIsSelected] = useState('');

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
            {t('Paid')}: $0
          </Text>
          <Text
            style={{
              fontFamily: Font.semiBold,
              fontSize: FontSize.s_18,
              color: Assets.AppColors.textBlack,
            }}
          >
            {t('Refund')}: $0
          </Text>
        </View>
        <RadiusButton
          title={t('Continue')}
          type="positive"
          onPress={() => {
            if (isSelected !== '') {
              dispatch(
                thunkCancelTicket({
                  ticketDetailId: route.params?.ticketDetailId,
                }),
              );
            }
          }}
        />
      </View>
    </View>
  );
};
