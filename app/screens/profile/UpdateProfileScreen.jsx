import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
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
  // const [gender, setGender] = useState('Gender');
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
    },
  });

  const ProfileSchema = Yup.object().shape({
    avatar: Yup.string(),
    fullName: Yup.string().min(2, t('NameLength')),
    phoneNumber: Yup.string().trim().min(5, t('PhoneLength')),
    gender: Yup.string().trim().oneOf(['Male', 'Female', 'Other']),
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
                    setFieldValue('avatar', result.assets[0].uri);
                  }}
                  style={{ alignItems: 'center' }}
                >
                  <Image
                    source={Assets.AppIcons.icChangeAvatar}
                    style={{
                      marginTop: Const.space_25,
                      marginBottom: Const.space_29,
                    }}
                  />
                </TouchableOpacity>
                <CustomTextInput placeholder="Full Name" />
                <View style={{ height: Const.space_26 }}>
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
                  }}
                  textContainerStyle={{
                    backgroundColor: Assets.AppColors.lightgrey,
                    borderRadius: Const.space_15,
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
                <View style={{ height: Const.space_26 }}>
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
                <View style={{ height: Const.space_26 }}>
                  <Text>{errors.gender}</Text>
                </View>
                <CustomTextInput placeholder="Address" />
                <RadiusButton
                  title={t('Continue')}
                  type="positive"
                  style={{ marginTop: Const.space_50 + Const.space_6 }}
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
