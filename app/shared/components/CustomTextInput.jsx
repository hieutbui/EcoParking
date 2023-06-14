import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { FontSize, SecondFont } from 'app/constants/Styles';
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
import { TouchableOpacity } from 'react-native-gesture-handler';

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
 * @property {Boolean} isPassword
 * @property {String} value
 * @property {'character' | 'none' | 'sentences' | 'words'} autoCapitalize
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
  isPassword,
  value,
  autoCapitalize,
}) => {
  const [isTouch, setTouch] = useState(false);
  const [isSecure, setSecure] = useState(isPassword ?? true);
  const [isEmpty, setEmpty] = useState(true);
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
    borderWidth: isTouch ? Const.space_1 : Const.space_0,
    borderColor: Assets.AppColors.feature,
  };
  /**
   * @type {StyleProp<ImageStyle>}
   */
  const defaultLeftIconStyle = {
    resizeMode: 'contain',
    marginRight: Const.space_21,
  };
  /**
   *
   * @returns {ImageSourcePropType}
   */
  function eyeIcon() {
    if (isTouch) {
      if (!isSecure) {
        return Assets.AppIcons.icEyeFeature;
      } else {
        return Assets.AppIcons.icEyeSlashFeature;
      }
    } else {
      if (isEmpty) {
        if (!isSecure) {
          return Assets.AppIcons.icEyeGrey;
        } else {
          return Assets.AppIcons.icEyeSlashGrey;
        }
      } else {
        if (!isSecure) {
          return Assets.AppIcons.icEyeBlack;
        } else {
          return Assets.AppIcons.icEyeSlashBlack;
        }
      }
    }
  }
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
          fontFamily: SecondFont.regular,
          flex: 1,
          fontStyle: 'normal',
          fontSize: FontSize.s_15,
          lineHeight: Const.space_18,
          fontWeight: '500',
          color: Assets.AppColors.black,
        }}
        placeholderTextColor={Assets.AppColors.darkgray}
        value={value}
        onChangeText={t => {
          // setText(value);
          if (_.isFunction(onChangeText)) {
            onChangeText(t);
          }
          if (_.isEmpty(t)) {
            setEmpty(true);
          } else {
            setEmpty(false);
          }
        }}
        onBlur={() => {
          setTouch(false);
          _.isFunction(onBlur) && onBlur();
        }}
        keyboardType={keyboardType}
        onFocus={() => {
          setTouch(true);
          _.isFunction(onFocus) && onFocus();
        }}
        focusable={isFocus}
        secureTextEntry={isSecure}
        autoCapitalize={autoCapitalize}
      />
      {isPassword ? (
        <TouchableOpacity
          onPress={() => {
            setSecure(!isSecure);
          }}
          style={{
            width: Const.space_20,
            height: Const.space_20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={eyeIcon()}
            style={{ ...rightIconStyle, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      ) : null}
      {rightIcon && !isPassword ? (
        <Image
          source={rightIcon}
          style={{ ...rightIconStyle, resizeMode: 'contain' }}
        />
      ) : null}
    </View>
  );
};
