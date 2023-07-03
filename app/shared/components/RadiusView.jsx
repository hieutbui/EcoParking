import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
  ImageSourcePropType,
  Image,
} from 'react-native';

/**
 * @author hieubt
 * @param {{text: string, style: StyleProp<ViewStyle>, textStyle: StyleProp<TextStyle>, leftIcon: ImageSourcePropType}} param
 * @returns {JSX.Element}
 */
export const RadiusView = ({ text, style, textStyle, leftIcon }) => {
  /**
   * @type {StyleProp<ViewStyle>}
   */
  const defaultStyle = {
    borderRadius: Const.space_50,
    borderWidth: Const.space_2,
    borderColor: Assets.AppColors.feature,
    paddingHorizontal: Const.space_25,
    paddingVertical: Const.space_7,
    flexDirection: 'row',
    justifyContent: 'center',
  };

  /**
   * @type {StyleProp<TextStyle>}
   */
  const defaultTextStyle = {
    fontFamily: Font.semiBold,
    fontSize: FontSize.s_16,
    color: Assets.AppColors.feature,
    fontWeight: '600',
  };
  return (
    <View style={[defaultStyle, style]}>
      {leftIcon ? (
        <Image source={leftIcon} style={{ marginRight: Const.space_10 }} />
      ) : null}
      <Text style={[defaultTextStyle, textStyle]}>{text}</Text>
    </View>
  );
};
