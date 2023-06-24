import React from 'react';
import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';

/**
 * @author hieubt
 * @typedef Param
 * @property {ImageSourcePropType} leftIconStyle
 * @property {string} title
 * @property {ImageSourcePropType} rightIcon
 * @property {boolean} isSwitch
 * @property {StyleProp<ViewStyle>} style
 * @property {StyleProp<ImageStyle>} leftIconStyle
 * @property {StyleProp<ImageStyle>} rightIconStyle
 * @property {StyleProp<TextStyle>} titleStyle
 * @param {Param} param
 * @returns {JSX.Element}
 */
export const RowButton = ({
  leftIcon,
  title,
  rightIcon,
  isSwitch,
  style,
  leftIconStyle,
  rightIconStyle,
  titleStyle,
}) => {
  return (
    <TouchableOpacity>
      {leftIcon ? <Image source={leftIcon} /> : null}
      <Text>{title}</Text>
      {!isSwitch && rightIcon ? <Image source={rightIcon} /> : null}
    </TouchableOpacity>
  );
};
