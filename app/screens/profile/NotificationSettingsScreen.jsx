import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Header } from 'app/shared/components/Header';
import { TextButton } from 'app/shared/components/TextButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

/**
 * @author hieubt
 * @returns {JSX.Element}
 */
export const NotificationSettingsScreen = () => {
  const { t } = useTranslation();

  /**
   * @typedef Options
   * @property {string} text
   * @property {boolean} isSwitch
   * @property {()=>void=} onPress
   */
  /**
   * @type {Options[]}
   */
  const options = [
    {
      text: t('General Notification'),
      isSwitch: true,
      onPress: () => {},
    },
    {
      text: t('Sound'),
      isSwitch: true,
      onPress: () => {},
    },
    {
      text: t('Vibrate'),
      isSwitch: true,
      onPress: () => {},
    },
  ];
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
        title={t('Notification')}
        style={{
          marginBottom: Const.space_28,
        }}
      />
      {options.map((option, index) => {
        return (
          <TextButton
            key={index}
            text={option.text}
            isSwitch={option.isSwitch}
            onPress={option.onPress}
            textStyle={{
              color: Assets.AppColors.davyGrey,
            }}
            style={{
              marginBottom: Const.space_28,
            }}
          />
        );
      })}
    </View>
  );
};
