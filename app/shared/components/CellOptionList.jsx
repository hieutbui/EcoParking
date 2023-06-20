import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ImageStyle,
  ViewStyle,
} from 'react-native';

/**
 * @author hieubt
 * @typedef Param
 * @property {ImageSourcePropType} icon
 * @property {(value: String) => void =} onPress
 * @property {StyleProp<ImageStyle>} iconStyle
 * @property {StyleProp<ViewStyle>} style
 * @property {StyleProp<TextStyle>} textStyle
 * @property {String} text
 * @property {String} value
 * @param {Param} param
 * @returns {JSX.Element}
 */
export const CellOptionList = ({
  icon,
  text,
  onPress,
  iconStyle,
  style,
  textStyle,
  value,
}) => {
  function handlePress() {
    if (onPress) {
      onPress(value);
    }
  }

  return (
    <TouchableOpacity
      style={{
        ...style,
        paddingBottom: Const.space_20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={handlePress}
    >
      {icon ? <Image source={icon} style={iconStyle} /> : null}
      <View>
        <Text
          style={{
            fontFamily: Font.medium,
            fontStyle: 'normal',
            fontSize: FontSize.s_20,
            fontWeight: '600',
            lineHeight: Const.space_29,
            color: Assets.AppColors.black,
            ...textStyle,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
