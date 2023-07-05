import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { TextButton } from 'app/shared/components/TextButton';

/**
 * @author hieubt
 * @returns {JSX.Element}
 */
export const SecurityScreen = () => {
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
      text: t('Face ID'),
      isSwitch: true,
      onPress: () => {},
    },
    {
      text: t('Touch ID'),
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
        style={{ marginBottom: Const.space_28 }}
        title={t('Security')}
      />
      <View style={{ flex: 1, paddingHorizontal: Const.space_31 }}>
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
                paddingHorizontal: Const.space_0,
              }}
            />
          );
        })}
        <RadiusButton
          title={t('Change Password')}
          onPress={() => {}}
          type="positive"
          style={{
            backgroundColor: 'rgba(188, 0, 99, 0.1)',
          }}
          titleStyle={{
            color: Assets.AppColors.feature,
          }}
        />
      </View>
    </View>
  );
};
