import { useNavigation, useRoute } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { CustomTextInput } from 'app/shared/components/CustomTextInput';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const SelectVehicleScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const [carNumber, setCarNumber] = useState(null);
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
        <CustomTextInput
          placeholder={t('Enter car number')}
          onChangeText={text => setCarNumber(text)}
          isPassword={false}
        />
      </KeyboardAwareScrollView>
      <View
        style={{
          marginBottom: Const.space_30,
          paddingHorizontal: Const.space_31,
        }}
      >
        <RadiusButton
          title={t('Continue')}
          onPress={() =>
            NavigatorUtils.gotoBookParking(
              { parkingId: route.params?.parkingId, carNumber },
              navigation,
            )
          }
          type="positive"
        />
      </View>
    </View>
  );
};
