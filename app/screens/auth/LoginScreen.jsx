import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Assets from 'app/assets/Assets';
import { Header } from 'app/shared/components/Header';
import { useTranslation } from 'react-i18next';
import { Font, FontSize, TextStyles } from 'app/constants/Styles';
import { Const } from 'app/constants/Const';
import { CustomTextInput } from 'app/shared/components/CustomTextInput';
import { Formik, useFormik } from 'formik';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import { useNavigation } from '@react-navigation/native';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import * as Yup from 'yup';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isRemember, setRemember] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(t('InvalidEmail')).required(t('EmailRequired')),
    password: Yup.string()
      .min(8, t('PasswordLengthError'))
      .max(50, t('PasswordLengthError'))
      .required('PasswordRequired'),
  });

  function handleRemember() {
    setRemember(!isRemember);
  }

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
            <Formik
              initialValues={formik.initialValues}
              validationSchema={LoginSchema}
            >
              <>
                <CustomTextInput
                  placeholder="Email"
                  style={{ marginBottom: Const.space_28 }}
                />
                <CustomTextInput
                  placeholder="Password"
                  isPassword={true}
                  style={{ marginBottom: Const.space_50 + Const.space_6 }}
                />
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={handleRemember}
                >
                  <Image
                    source={
                      isRemember
                        ? Assets.AppIcons.icChecked
                        : Assets.AppIcons.icUncheck
                    }
                  />
                  <Text
                    style={{
                      fontFamily: Font.bold,
                      fontWeight: '600',
                      fontSize: FontSize.s_16,
                      lineHeight: Const.space_23,
                      fontStyle: 'normal',
                      color: Assets.AppColors.feature,
                      marginLeft: Const.space_19,
                    }}
                  >
                    {t('RememberMe')}
                  </Text>
                </TouchableOpacity>
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
