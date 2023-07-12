import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import _ from 'lodash';
import React, { useState } from 'react';
import {
  View,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ImageStyle,
  ViewStyle,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

/**
 * @author hieubt
 * @typedef Params
 * @property {ImageSourcePropType} leftIcon
 * @property {string} title
 * @property {string} message
 * @property {'payment' | 'bookmark'} type
 * @property {()=>void=} onPress
 * @property {StyleProp<ImageStyle>} leftIconStyle
 * @property {StyleProp<TextStyle>} titleStyle
 * @property {StyleProp<TextStyle>} messageStyle
 * @property {boolean} isSelected
 * @property {StyleProp<ViewStyle>} style
 * @property {string} rightText
 * @param {Params} param
 * @returns {JSX.Element}
 */
export const RadioButton = ({
  leftIcon,
  title,
  message,
  type,
  onPress,
  onLongPress,
  leftIconStyle,
  titleStyle,
  messageStyle,
  isSelected,
  rightText,
  style,
}) => {
  let rightIcon;

  switch (type) {
    case 'bookmark':
      rightIcon = Assets.AppIcons.icBookmarked;
      break;
    case 'payment':
      if (isSelected) {
        rightIcon = Assets.AppIcons.icSelectedCircle;
      } else {
        rightIcon = Assets.AppIcons.icUnselectedCircle;
      }
      break;
    default:
      rightIcon = undefined;
      break;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        _.isFunction(onPress) && onPress();
      }}
      onLongPress={() => {
        _.isFunction(onLongPress) && onLongPress();
      }}
      style={[
        {
          backgroundColor: Assets.AppColors.whiteSmoke,
          paddingVertical: Const.space_29,
          paddingLeft: Const.space_26,
          flexDirection: 'row',
          borderRadius: Const.space_23,
          alignItems: 'center',
          borderWidth:
            type === 'payment' && isSelected ? Const.space_2 : undefined,
          borderColor: Assets.AppColors.feature,
        },
        style,
      ]}
    >
      {leftIcon ? <Image source={leftIcon} style={leftIconStyle} /> : null}
      <View
        style={{
          marginLeft: Const.space_50,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: Font.semiBold,
            fontSize: FontSize.s_16,
            color: Assets.AppColors.textBlack,
          }}
        >
          {title}
        </Text>
        {message ? (
          <Text
            style={{
              color: Assets.AppColors.starDust,
              fontSize: FontSize.s_12,
              fontFamily: Font.medium,
            }}
          >
            {message}
          </Text>
        ) : null}
      </View>
      {rightText ? (
        <Text
          style={{
            color: Assets.AppColors.feature,
            fontSize: FontSize.s_16,
            fontFamily: Font.semiBold,
            marginRight: 33,
            marginLeft: Const.space_10,
          }}
        >
          {rightText}
        </Text>
      ) : rightIcon ? (
        <Image
          source={rightIcon}
          style={{
            resizeMode: 'contain',
            marginRight: 33,
            marginLeft: Const.space_10,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};
