import { useNavigation } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { CustomTextInput } from 'app/shared/components/CustomTextInput';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const SelectVehicleScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Assets.AppColors.white,
      }}
    >
      <Header
        title={t('Select Your Vehicle')}
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.goBack()}
        style={{
          marginBottom: Const.space_28,
        }}
      />
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          paddingHorizontal: Const.space_31,
        }}
      >
        <CustomTextInput placeholder={t('Enter car number')} />
      </KeyboardAwareScrollView>
      <View
        style={{
          marginBottom: Const.space_30,
          paddingHorizontal: Const.space_31,
        }}
      >
        <RadiusButton
          title={t('Continue')}
          onPress={() => NavigatorUtils.gotoBookParking({}, navigation)}
          type="positive"
        />
      </View>
    </View>
  );
};
