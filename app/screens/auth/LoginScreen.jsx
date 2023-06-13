import { Keyboard, KeyboardAvoidingView, Text, View } from 'react-native';
import React from 'react';
import Assets from 'app/assets/Assets';
import { Header } from 'app/shared/components/Header';
import { useTranslation } from 'react-i18next';
import { TextStyles } from 'app/constants/Styles';
import { Const } from 'app/constants/Const';
import { CustomTextInput } from 'app/shared/components/CustomTextInput';
import { Formik, useFormik } from 'formik';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import { useNavigation } from '@react-navigation/native';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, overflow: 'scroll' }}
      behavior={Const.os === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1, backgroundColor: Assets.AppColors.white }}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          containerStyle={{ flex: 1 }}
        >
          <Header />
          <View style={{ marginHorizontal: Const.space_31 }}>
            <Text
              style={{
                ...TextStyles.LargeTitle,
                marginBottom: Const.space_50 + Const.space_9,
              }}
            >
              {t('LoginTitle')}
            </Text>
            <Formik initialValues={formik.initialValues}>
              <>
                <CustomTextInput
                  placeholder="Email"
                  style={{ marginBottom: Const.space_28 }}
                />
                <CustomTextInput placeholder="Password" />
                <RadiusButton
                  type="positive"
                  onPress={() => NavigatorUtils.gotoHome({}, navigation)}
                  title={t('SignIn')}
                  style={{
                    marginTop: Const.space_40 + Const.space_2,
                  }}
                />
              </>
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};
