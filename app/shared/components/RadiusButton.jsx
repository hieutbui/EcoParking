import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import React from 'react';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { FontSize, SecondFont } from 'app/constants/Styles';
import _ from 'lodash';

/**
 * @author hieubt
 * @typedef Param
 * @property {'negative' | 'positive' | 'hollow'} type
 * @property {String} title
 * @property {ImageSourcePropType} rightIcon
 * @property {StyleProp<ViewStyle>} style
 * @property {StyleProp<TextStyle>} titleStyle
 * @property {StyleProp<ImageStyle>} rightIconStyle
 * @property {() => void=} onPress
 * @property {() => void=} onLongPress
 * @param {Param} param
 * @returns {JSX.Element}
 */
export const RadiusButton = ({
  type,
  title,
  rightIcon,
  style,
  titleStyle,
  rightIconStyle,
  onPress,
  onLongPress,
}) => {
  /**
   * @type {StyleProp<ViewStyle>}
   */
  let defaultButtonStyle = {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: Const.space_50 + Const.space_3,
    borderRadius: Const.space_50,
    flexDirection: rightIcon ? 'row' : 'column',
  };

  /**
   * @type {StyleProp<TextStyle>}
   */
  let defaultTitleStyle = {
    fontFamily: SecondFont.bold,
    fontStyle: 'normal',
    fontSize: FontSize.s_16,
    lineHeight: Const.space_20,
    fontWeight: '700',
  };

  /**
   * @type {StyleProp<ImageStyle>}
   */
  const defaultRightIconStyle = {
    width: Const.space_6,
    height: Const.space_12,
    resizeMode: 'contain',
    marginLeft: Const.space_14,
  };

  switch (type) {
    case 'positive':
      defaultButtonStyle = {
        ...defaultButtonStyle,
        backgroundColor: Assets.AppColors.feature,
      };
      defaultTitleStyle = {
        ...defaultTitleStyle,
        color: Assets.AppColors.white,
      };
      break;
    case 'negative':
      defaultButtonStyle = {
        ...defaultButtonStyle,
        backgroundColor: Assets.AppColors.lightgrey,
      };
      defaultTitleStyle = {
        ...defaultTitleStyle,
        color: Assets.AppColors.feature,
      };
      break;
    case 'hollow':
      defaultButtonStyle = {
        ...defaultButtonStyle,
        backgroundColor: Assets.AppColors.white,
        borderColor: Assets.AppColors.feature,
        borderWidth: Const.space_2,
      };
      defaultTitleStyle = {
        ...defaultTitleStyle,
        color: Assets.AppColors.feature,
      };
      break;
  }

  return (
    <TouchableOpacity
      style={[defaultButtonStyle, style]}
      onPress={onPress}
      disabled={!_.isFunction(onPress)}
      onLongPress={onLongPress}
    >
      <Text style={[defaultTitleStyle, titleStyle]}>{title}</Text>
      {rightIcon ? (
        <Image
          source={rightIcon}
          style={[defaultRightIconStyle, rightIconStyle]}
        />
      ) : null}
    </TouchableOpacity>
  );
};
