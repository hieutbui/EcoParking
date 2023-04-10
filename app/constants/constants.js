import { Dimensions, Platform, Text, TouchableOpacity } from 'react-native';
import { AppColors } from 'app/assets/AppColors';
import { TextInput } from 'react-native-gesture-handler';

export const Const = {
  //OS
  os: Platform.OS,

  //URL
  apiBaseUrl: '',
  baseUrl: '',

  // SCREENS
  deviceHeight: Dimensions.get('screen').height,
  deviceWidth: Dimensions.get('screen').width,
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  scaleWidth: Dimensions.get('screen').width / 390,
  scaleHeight: Dimensions.get('screen').height / 840,

  //PADDING, MARGIN
  space_0: 0,
  space_1: 1,
  space_2: 2,
  space_3: 3,
  space_4: 4,
  space_5: 5,
  space_6: 6,
  space_7: 7,
  space_8: 8,
  space_9: 9,
  space_10: 10,
  space_11: 11,
  space_12: 12,
  space_13: 13,
  space_14: 14,
  space_15: 15,
  space_16: 16,
  space_17: 17,
  space_18: 18,
  space_19: 19,
  space_20: 20,
  space_21: 21,
  space_22: 22,
  space_23: 23,
  space_24: 24,
  space_25: 25,
  space_26: 26,
  space_27: 27,
  space_28: 28,
  space_29: 29,
  space_30: 30,
  space_32: 32,
  space_35: 35,
  space_37: 37,
  space_39: 39,
  space_40: 40,
  space_44: 44,
  space_48: 48,
  space_50: 50,
  space_57: 57,
  space_60: 60,
  space_69: 69,
  space_72: 72,
  space_80: 80,
  space_90: 90,
  space_100: 100,
  space_120: 120,
  space_124: 124,
  space_130: 130,
  space_138: 138,
  space_140: 140,
  space_160: 160,
  space_180: 180,
  space_200: 200,

  //DEFAULT OPACITY
  defaultActiveOpacity: 0.7,
  defaultButtonActiveOpacity: 0.5,
};

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.selectionColor = AppColors.feature;
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.underlineColorAndroid = 'rgba(1,0,0,0)';
TextInput.defaultProps.autoCapitalize = 'none';
TextInput.defaultProps.autoCorrect = false;
TextInput.defaultProps.placeholderTextColor = AppColors.gray;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
TouchableOpacity.defaultProps.activeOpacity = Const.defaultActiveOpacity;
