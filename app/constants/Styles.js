import { StyleProp, TextStyle } from 'react-native';
import { AppColors } from 'app/assets/AppColors';
import { Const } from './Const';

export const FontSize = {
  s_5: 5,
  s_6: 6,
  s_7: 7,
  s_8: 8,
  s_9: 9,
  s_10: 10,
  s_11: 11,
  s_12: 12,
  s_13: 13,
  s_14: 14,
  s_15: 15,
  s_16: 16,
  s_17: 17,
  s_18: 18,
  s_19: 19,
  s_20: 20,
  s_21: 21,
  s_22: 22,
  s_23: 23,
  s_24: 24,
  s_25: 25,
  s_26: 26,
  s_27: 27,
  s_28: 28,
  s_29: 29,
  s_30: 30,
  s_31: 31,
  s_32: 32,
  s_48: 48,
};

export const Font = {
  light: 'Jost-Light',
  regular: 'Jost-Regular',
  medium: 'Jost-Medium',
  semiBold: 'Jost-SemiBild',
  bold: 'Jost-Bold',
};

export const SecondFont = {
  light: 'Montserrat-Light',
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  semiBold: 'Montserrat-SemiBild',
  bold: 'Montserrat-Bold',
};

export const TextStyles = {
  /**
   * @type {StyleProp<TextStyle>}
   */
  Header: {
    fontFamily: Font.bold,
    fontWeight: '600',
    fontSize: FontSize.s_29,
    fontStyle: 'normal',
    color: AppColors.black,
  },
  /**
   * @type {StyleProp<TextStyle>}
   */
  BoardingTitle: {
    fontFamily: Font.bold,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: FontSize.s_31,
    lineHeight: 45,
    color: AppColors.black,
  },
  /**
   * @type {StyleProp<TextStyle>}
   */
  LargeTitle: {
    fontFamily: Font.bold,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: FontSize.s_48,
    lineHeight: 69,
    color: AppColors.black,
  },
  /**
   * @type {StyleProp<TextStyle>}
   */
  Regular: {
    fontFamily: Font.regular,
    fontSize: FontSize.s_14,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: Const.space_20,
    color: AppColors.textRegular,
  },
};

export const Widths = {};

export const Heights = {};
