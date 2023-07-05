import { useNavigation } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { FontSize, SecondFont, Font } from 'app/constants/Styles';
import { thunkLogout } from 'app/controllers/slice/account.slice';
import { BottomSheet } from 'app/shared/components/BottomSheet';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import { RowButton } from 'app/shared/components/RowButton';
import { TextButton } from 'app/shared/components/TextButton';
import utils, { useAppSelector } from 'app/shared/utils';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import _ from 'lodash';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { useDispatch } from 'react-redux';

export const ProfileScreen = () => {
  const { t } = useTranslation();
  const { userInfo } = useAppSelector(state => state.account);
  const refBottomSheetLogout = useRef('logout');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  /**
   * @typedef ProfileOption
   * @property {ImageSourcePropType} leftIcon
   * @property {string} text
   * @property {boolean} isSwitch
   * @property {()=>void=} onPress
   */
  /**
   * @type {ProfileOption[]}
   */
  const profileOptions = [
    {
      text: 'Edit Profile',
      leftIcon: Assets.AppIcons.icEditProfile,
      isSwitch: false,
      onPress: () => {
        NavigatorUtils.gotoUpdateProfile({ type: 'Update' }, navigation);
      },
    },
    {
      text: 'Payment',
      leftIcon: Assets.AppIcons.icPayment,
      onPress: () => {},
      isSwitch: false,
    },
    {
      text: 'Notification',
      leftIcon: Assets.AppIcons.icNotification,
      onPress: () => {
        NavigatorUtils.gotoNotificationSettings({}, navigation);
      },
      isSwitch: false,
    },
    {
      text: 'Security',
      leftIcon: Assets.AppIcons.icSecurity,
      onPress: () => {
        NavigatorUtils.gotoSecurity({}, navigation);
      },
      isSwitch: false,
    },
    {
      text: 'Help',
      leftIcon: Assets.AppIcons.icHelp,
      onPress: () => {},
      isSwitch: false,
    },
    {
      text: 'Logout',
      leftIcon: Assets.AppIcons.icLogout,
      onPress: () => {
        refBottomSheetLogout.current.show();
      },
      isSwitch: false,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header
        title={t('Profile')}
        rightIcon={Assets.AppIcons.icMore}
        onPressRight={() => refBottomSheetLogout.current.show()}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Assets.AppColors.white,
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() =>
            NavigatorUtils.gotoUpdateProfile({ type: 'Update' }, navigation)
          }
        >
          {_.isEmpty(userInfo.avatar) ? (
            <Image
              source={Assets.AppIcons.icChangeAvatar}
              style={{ marginTop: Const.space_28 }}
            />
          ) : (
            <ImageBackground
              source={{ uri: userInfo.avatar }}
              style={{
                marginTop: Const.space_25,
                // marginBottom: Const.space_29,
                height: 132,
                width: 132,
                resizeMode: 'contain',
                borderRadius: 100,
                overflow: 'hidden',
              }}
            >
              <Image
                source={Assets.AppIcons.icPenWWithBG}
                style={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}
              />
            </ImageBackground>
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: SecondFont.semiBold,
            fontSize: FontSize.s_20,
            color: Assets.AppColors.black,
            fontWeight: '600',
          }}
        >
          {userInfo.name}
        </Text>
        <Text
          style={{
            fontFamily: SecondFont.regular,
            fontSize: FontSize.s_14,
            color: Assets.AppColors.black,
            fontWeight: '400',
            marginBottom: Const.space_60,
          }}
        >
          {userInfo.email}
        </Text>
        {profileOptions.map((option, index) => {
          return (
            <TextButton
              key={index}
              leftIcon={option.leftIcon}
              text={option.text}
              isSwitch={option.isSwitch}
              onPress={option.onPress}
              style={{
                marginBottom: Const.space_23,
              }}
            />
          );
        })}
      </View>
      <BottomSheet
        refBottomSheet={refBottomSheetLogout}
        enableSwipeToDismiss
        hideOnBackdropPress
        content={
          <View
            style={{
              backgroundColor: Assets.AppColors.white,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderTopRightRadius: Const.space_50,
              borderTopLeftRadius: Const.space_50,
              paddingHorizontal: Const.space_30,
            }}
          >
            <View
              style={{
                borderBottomWidth: Const.space_1,
                borderColor: Assets.AppColors.lightgrey,
                width: '100%',
                alignItems: 'center',
                marginBottom: Const.space_22,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.bold,
                  fontStyle: 'normal',
                  fontSize: FontSize.s_24,
                  lineHeight: Const.space_35,
                  fontWeight: '600',
                  color: Assets.AppColors.black,
                  paddingTop: Const.space_16,
                  paddingBottom: Const.space_13,
                }}
              >
                {t('Logout')}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: Font.semiBold,
                fontSize: FontSize.s_20,
                fontWeight: '600',
                color: Assets.AppColors.davyGrey,
                marginBottom: Const.space_32,
              }}
            >
              {t('Are you sure you want to log out?')}
            </Text>
            <RadiusButton
              type="positive"
              title={t('Cancel')}
              onPress={() => refBottomSheetLogout.current.hide()}
              style={{
                marginBottom: Const.space_17,
              }}
            />
            <RadiusButton
              type="negative"
              title={t('Yes')}
              onPress={async () => {
                await refBottomSheetLogout.current.hide();
                dispatch(thunkLogout());
                NavigatorUtils.gotoLogin({}, navigation);
              }}
              style={{ marginBottom: Const.space_30 }}
            />
          </View>
        }
      />
    </View>
  );
};
