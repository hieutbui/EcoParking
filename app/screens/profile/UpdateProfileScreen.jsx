import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from 'app/shared/components/Header';
import { Const } from 'app/constants/Const';
import Assets from 'app/assets/Assets';
import { useTranslation } from 'react-i18next';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import { CustomTextInput } from 'app/shared/components/CustomTextInput';
import PhoneInput from 'react-native-phone-number-input';
import { FontSize, SecondFont } from 'app/constants/Styles';
import Modal from 'react-native-modal';
import { BottomSheet } from 'app/shared/components/BottomSheet';
import { SelectionsOptionsView } from 'app/shared/components/SelectionOptionsView';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import { useDispatch } from 'react-redux';
import { thunkRegister } from 'app/controllers/slice/account.slice';

/**
 * @author hieubt
 * @returns {JSX.Element}
 */
export const UpdateProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const phoneInputRef = useRef('phone');
  const defaultCountryCode = 'VN';
  const refBottomSheetChooseGender = useRef('gender');
  const dispatch = useDispatch();
  /**
   * @type {ImageLibraryOptions}
   */
  const pickerOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    presentationStyle: 'fullScreen',
  };
  const headerTitle =
    route?.params?.type === 'Register'
      ? t('Fill You Profile')
      : t('Edit Profile');

  const formik = useFormik({
    initialValues: {
      avatar: '',
      fullName: '',
      phoneNumber: '',
      gender: 'Gender',
      address: '',
      email: route.params?.email,
      password: route.params?.password,
    },
  });

  const ProfileSchema = Yup.object().shape({
    avatar: Yup.string(),
    fullName: Yup.string().min(2, t('NameLength')),
    phoneNumber: Yup.string().trim().min(5, t('PhoneLength')),
    gender: Yup.string().trim().oneOf(['Male', 'Female', 'Other']).nullable(),
    address: Yup.string(),
  });

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
      nestedScrollEnabled
    >
      <Header
        title={headerTitle}
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.goBack()}
      />
      <View
        style={{
          marginHorizontal: Const.space_31,
        }}
      >
        <Formik
          initialValues={formik.initialValues}
          validationSchema={ProfileSchema}
          onSubmit={values => {
            dispatch(
              thunkRegister({
                name: values.fullName,
                file: values.avatar,
                email: values.email,
                gender: values.gender,
                password: values.password,
                phoneNumber: values.phoneNumber,
                address: values.address,
              }),
            );
          }}
        >
          {({
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
            values,
            errors,
            touched,
          }) => {
            return (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    const result = await launchImageLibrary(pickerOptions);
                    const image = result.assets[0].uri;
                    setFieldValue('avatar', image);
                  }}
                  style={{ alignItems: 'center' }}
                >
                  {_.isEmpty(values.avatar) ? (
                    <Image source={Assets.AppIcons.icChangeAvatar} />
                  ) : (
                    <ImageBackground
                      source={{
                        uri: values.avatar,
                      }}
                      style={{
                        marginTop: Const.space_25,
                        marginBottom: Const.space_29,
                        height: 132,
                        width: 132,
                        resizeMode: 'contain',
                        borderRadius: 100,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        source={Assets.AppIcons.icPenWWithBG}
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          alignSelf: 'center',
                        }}
                      />
                    </ImageBackground>
                  )}
                </TouchableOpacity>
                <CustomTextInput
                  placeholder="Full Name"
                  onChangeText={handleChange('fullName')}
                  isPassword={false}
                  autoCapitalize="none"
                  onFocus={() => {
                    setFieldTouched('fullName', true);
                  }}
                  onBlur={() => {
                    setFieldTouched('fullName', false);
                  }}
                />
                <View style={{ height: Const.space_40 }}>
                  <Text>{errors.fullName}</Text>
                </View>
                <PhoneInput
                  ref={phoneInputRef}
                  defaultValue={values.phoneNumber}
                  defaultCode={defaultCountryCode.toUpperCase()}
                  layout="first"
                  onChangeFormattedText={text => {
                    setFieldValue('phoneNumber', text);
                  }}
                  placeholder={t('PhoneNumber')}
                  containerStyle={{
                    height: Const.space_50 + Const.space_6,
                    backgroundColor: Assets.AppColors.lightgrey,
                    borderRadius: Const.space_15,
                    width: '100%',
                    borderWidth: touched.phoneNumber
                      ? Const.space_1
                      : Const.space_0,
                    borderColor: Assets.AppColors.feature,
                    padding: 0,
                  }}
                  textContainerStyle={{
                    backgroundColor: Assets.AppColors.lightgrey,
                    borderRadius: Const.space_15,
                    paddingVertical: Const.space_0,
                  }}
                  textInputProps={{
                    onFocus: () => {
                      setFieldTouched('phoneNumber', true);
                    },
                    onBlur: () => {
                      setFieldTouched('phoneNumber', false);
                    },
                  }}
                  textInputStyle={styles.phoneNumberText}
                  codeTextStyle={styles.phoneNumberText}
                />
                <View style={{ height: Const.space_40 }}>
                  <Text>{errors.phoneNumber}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    height: Const.space_50 + Const.space_6,
                    borderRadius: Const.space_15,
                    backgroundColor: Assets.AppColors.lightgrey,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: Const.space_35,
                    paddingRight: Const.space_24,
                    justifyContent: 'space-between',
                    marginBottom: Const.space_40,
                  }}
                  onPress={() => refBottomSheetChooseGender.current.show()}
                >
                  <Text
                    style={{
                      fontFamily: SecondFont.regular,
                      fontStyle: 'normal',
                      fontSize: FontSize.s_15,
                      fontWeight: '500',
                      color:
                        values.gender === 'Gender'
                          ? Assets.AppColors.darkgray
                          : Assets.AppColors.black,
                    }}
                  >
                    {t(values.gender)}
                  </Text>
                  <Image
                    source={
                      values.gender === 'Gender'
                        ? Assets.AppIcons.icTriangleDownGrey
                        : Assets.AppIcons.icTriangleDownBlack
                    }
                    style={{ resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
                <CustomTextInput
                  placeholder="Address"
                  onChangeText={handleChange('address')}
                  isPassword={false}
                  autoCapitalize="none"
                  onFocus={() => {
                    setFieldTouched('address', true);
                  }}
                  onBlur={() => {
                    setFieldTouched('address', false);
                  }}
                />
                <RadiusButton
                  title={t('Continue')}
                  type="positive"
                  style={{ marginTop: Const.space_50 + Const.space_6 }}
                  onPress={handleSubmit}
                />
                <BottomSheet
                  refBottomSheet={refBottomSheetChooseGender}
                  enableSwipeToDismiss
                  hideOnBackdropPress
                  content={
                    <SelectionsOptionsView
                      title={t('Gender')}
                      options={[
                        {
                          name: t('Male'),
                          value: 'Male',
                          onPress: value => {
                            setFieldValue('gender', value);
                            refBottomSheetChooseGender.current.hide();
                          },
                        },
                        {
                          name: t('Female'),
                          value: 'Female',
                          onPress: value => {
                            setFieldValue('gender', value);
                            refBottomSheetChooseGender.current.hide();
                          },
                        },
                        {
                          name: t('Other'),
                          value: 'Other',
                          onPress: value => {
                            setFieldValue('gender', value);
                            refBottomSheetChooseGender.current.hide();
                          },
                        },
                      ]}
                    />
                  }
                />
              </>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  phoneNumberText: {
    fontFamily: SecondFont.regular,
    fontStyle: 'normal',
    fontSize: FontSize.s_15,
    lineHeight: Const.space_18,
    fontWeight: '500',
    color: Assets.AppColors.black,
  },
});
