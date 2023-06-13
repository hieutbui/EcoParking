import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { TextStyles } from 'app/constants/Styles';
import React from 'react';
import {
  View,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ImageStyle,
  ViewStyle,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';

/**
 * @author hieubt
 * @typedef Param
 * @property {ImageSourcePropType} rightIcon
 * @property {ImageSourcePropType} leftIcon
 * @property {()=>void=} onPressRight
 * @property {()=>void=} onPressLeft
 * @property {String} title
 * @property {StyleProp<ViewStyle>} style
 * @property {StyleProp<TextStyle>} titleStyle
 * @property {StyleProp<ImageStyle>} rightIconStyle
 * @property {StyleProp<ImageStyle>} leftIconStyle
 * @param {Param} param
 * @returns {JSX.Element}
 */
export const Header = ({
  rightIcon,
  onPressRight,
  leftIcon,
  onPressLeft,
  title,
  style,
  titleStyle,
  rightIconStyle,
  leftIconStyle,
}) => {
  /**
   * @type {StyleProp<ViewStyle>}
   */
  const defaultContainerStyle = {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Assets.AppColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Const.space_32 + Const.space_1,
  };

  /**
   * @type {StyleProp<ViewStyle>}
   */
  const defaultLeftIconStyle = {
    width: Const.space_26,
    height: Const.space_18,
    marginRight: Const.space_19,
  };

  /**
   * @type {StyleProp<ViewStyle>}
   */
  const defaultRightIconStyle = {
    with: Const.space_24,
    height: Const.space_24,
  };

  return (
    <View style={[defaultContainerStyle, style]}>
      {leftIcon ? (
        <TouchableOpacity
          onPress={onPressLeft}
          disabled={!_.isFunction(onPressLeft)}
          style={[defaultLeftIconStyle, leftIconStyle]}
        >
          <Image source={leftIcon} />
        </TouchableOpacity>
      ) : null}
      <Text style={[TextStyles.Header, titleStyle, { flex: 1 }]}>{title}</Text>
      {rightIcon ? (
        <TouchableOpacity
          onPress={onPressRight}
          disabled={!_.isFunction(onPressRight)}
          style={[defaultRightIconStyle, rightIconStyle]}
        >
          <Image source={rightIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
