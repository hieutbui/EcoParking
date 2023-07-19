import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Assets from 'app/assets/Assets';
import { Header } from 'app/shared/components/Header';
import { useTranslation } from 'react-i18next';
import { Font, FontSize, SecondFont, TextStyles } from 'app/constants/Styles';
import { Const } from 'app/constants/Const';
import { CustomTextInput } from 'app/shared/components/CustomTextInput';
import { Formik, useFormik } from 'formik';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import { useNavigation } from '@react-navigation/native';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import * as Yup from 'yup';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * @author hieubt
 * @returns {JSX.Element}
 */
export const RegisterScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isRemember, setRemember] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('InvalidEmail'))
      .trim()
      .required(t('EmailRequired')),
    password: Yup.string()
      .trim()
      .min(7, t('PasswordLengthError'))
      .max(50, t('PasswordLengthError'))
      .required(t('PasswordRequired')),
  });

  function handleRemember() {
    setRemember(!isRemember);
  }

  return (
    <KeyboardAwareScrollView
      style={{
        overflow: 'scroll',
      }}
      contentContainerStyle={{
        height: Const.deviceHeight,
        backgroundColor: Assets.AppColors.white,
      }}
      behavior={Const.os === 'ios' ? 'padding' : 'height'}
      showsVerticalScrollIndicator={false}
    >
      <Header
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.goBack()}
      />
      <View style={{ marginHorizontal: Const.space_31 }}>
        <Text style={TextStyles.LargeTitle}>{t('RegisterTitle')}</Text>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={RegisterSchema}
          onSubmit={values => {
            NavigatorUtils.gotoUpdateProfile(
              {
                type: 'Register',
                email: values.email,
                password: values.password,
              },
              navigation,
            );
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldTouched,
            touched,
          }) => {
            return (
              <>
                <CustomTextInput
                  placeholder="Email"
                  style={{ marginTop: Const.space_50 + Const.space_9 }}
                  onChangeText={handleChange('email')}
                  isPassword={false}
                  autoCapitalize="none"
                  leftIcon={
                    touched.email
                      ? Assets.AppIcons.icEmailFeature
                      : _.isEmpty(values.email)
                      ? Assets.AppIcons.icEmailGrey
                      : Assets.AppIcons.icEmailBlack
                  }
                  onFocus={() => {
                    setFieldTouched('email', true);
                  }}
                  onBlur={() => {
                    setFieldTouched('email', false);
                  }}
                />
                <View
                  style={{
                    height: Const.space_30,
                  }}
                >
                  {errors.email ? (
                    <Text
                      style={{
                        ...TextStyles.Regular,
                        color: Assets.AppColors.red,
                      }}
                    >
                      {errors.email}
                    </Text>
                  ) : null}
                </View>
                <CustomTextInput
                  placeholder="Password"
                  autoCapitalize="none"
                  isPassword={true}
                  onChangeText={handleChange('password')}
                  leftIcon={
                    touched.password
                      ? Assets.AppIcons.icLockFeature
                      : _.isEmpty(values.password)
                      ? Assets.AppIcons.icLockGrey
                      : Assets.AppIcons.icLockBlack
                  }
                  onFocus={() => {
                    setFieldTouched('password', true);
                  }}
                  onBlur={() => {
                    setFieldTouched('password', false);
                  }}
                />
                <View
                  style={{
                    height: Const.space_35,
                    marginBottom: Const.space_50 + Const.space_6,
                  }}
                >
                  {errors.password ? (
                    <Text
                      style={{
                        ...TextStyles.Regular,
                        color: Assets.AppColors.red,
                      }}
                    >
                      {errors.password}
                    </Text>
                  ) : null}
                </View>
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
                <RadiusButton
                  type="positive"
                  onPress={() => handleSubmit()}
                  title={t('SignUp')}
                  style={{
                    marginTop: Const.space_40 + Const.space_2,
                  }}
                />
              </>
            );
          }}
        </Formik>
      </View>
      <View
        style={{
          marginHorizontal: Const.space_31,
          flexDirection: 'row',
          marginBottom: Const.space_26,
          justifyContent: 'center',
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <Text style={{ ...style.signUp, color: Assets.AppColors.mountainMist }}>
          {t('Already have an account?')}
        </Text>
        <TouchableOpacity onPress={() => NavigatorUtils.goBack()}>
          <Text
            style={{
              ...style.signUp,
              color: Assets.AppColors.feature,
              marginLeft: Const.space_8,
            }}
          >
            {t('SignIn')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const style = StyleSheet.create({
  signUp: {
    fontFamily: SecondFont.regular,
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: FontSize.s_16,
    lineHeight: Const.space_20,
  },
});
