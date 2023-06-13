import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { FontSize, SeconFont } from 'app/constants/Styles';
import React, { useState } from 'react';
import {
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  Image,
  ImageSourcePropType,
  ImageStyle,
  KeyboardType,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import _ from 'lodash';

/**
 * @author hieubt
 * @typedef Param
 * @property {String} placeholder
 * @property {StyleProp<ViewStyle>} style
 * @property {ImageSourcePropType} leftIcon
 * @property {ImageSourcePropType} rightIcon
 * @property {StyleProp<ImageStyle>} leftIconStyle
 * @property {StyleProp<ImageStyle>} rightIconStyle
 * @property {KeyboardType} keyboardType
 * @property {(text: String) => void=} onChangeText
 * @property {(e: NativeSyntheticEvent<TextInputFocusEventData>) => void=} onBlur
 * @property {(e: NativeSyntheticEvent<TextInputFocusEventData>) => void=} onFocus
 * @property {Boolean} isFocus
 * @property {Boolean} secureTextEntry
 * @param {Param} param
 * @returns {JSX.Element}
 */
export const CustomTextInput = ({
  placeholder,
  style,
  rightIcon,
  leftIcon,
  leftIconStyle,
  rightIconStyle,
  keyboardType,
  onChangeText,
  onBlur,
  onFocus,
  isFocus,
  secureTextEntry,
}) => {
  const [text, setText] = useState('');
  /**
   * @type {StyleProp<ViewStyle>}
   */
  const defaultStyle = {
    width: '100%',
    backgroundColor: Assets.AppColors.lightgrey,
    height: Const.space_50 + Const.space_6,
    borderRadius: Const.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Const.space_27,
    paddingRight: Const.space_24,
  };
  /**
   * @type {StyleProp<ImageStyle>}
   */
  const defaultLeftIconStyle = {
    resizeMode: 'contain',
    marginRight: Const.space_24,
  };
  return (
    <View style={[defaultStyle, style]}>
      {leftIcon ? (
        <Image
          source={leftIcon}
          style={[defaultLeftIconStyle, leftIconStyle]}
        />
      ) : null}
      <TextInput
        placeholder={placeholder}
        style={{
          fontFamily: SeconFont.regular,
          flex: 1,
          fontStyle: 'normal',
          fontSize: FontSize.s_15,
          lineHeight: Const.space_18,
          fontWeight: '500',
        }}
        value={text}
        onChangeText={value => {
          setText(value);
          if (_.isFunction(onChangeText)) {
            onChangeText(text);
          }
        }}
        onBlur={onBlur}
        keyboardType={keyboardType}
        onFocus={onFocus}
        focusable={isFocus}
        secureTextEntry={secureTextEntry}
      />
      {rightIcon ? (
        <Image
          source={rightIcon}
          style={{ ...rightIconStyle, resizeMode: 'contain' }}
        />
      ) : null}
    </View>
  );
};
