import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  View,
  StyleProp,
  ViewStyle,
  Animated,
  Easing,
  TouchableOpacity,
  TextStyle,
  ImageStyle,
} from 'react-native';
import _ from 'lodash';
import { Font, FontSize } from 'app/constants/Styles';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';

/**
 * @author hieubt
 * @typedef Params
 * @property {ImageSourcePropType} leftIcon
 * @property {string} text
 * @property {boolean} isSwitch
 * @property {()=>void=} onPress
 * @property {StyleProp<ViewStyle>} style
 * @property {StyleProp<TextStyle>} textStyle
 * @property {StyleProp<ImageStyle>} leftIconStyle
 * @property {ImageSourcePropType} rightIcon
 * @property {StyleProp<ImageStyle>} rightIconStyle
 * @param {Params} param
 * @returns {JSX.Element}
 */
export const TextButton = ({
  leftIcon,
  text,
  isSwitch,
  onPress,
  style,
  textStyle,
  leftIconStyle,
  rightIconStyle,
  rightIcon,
}) => {
  const [toggleIsOn, setToggle] = useState(false);
  const animatedValue = new Animated.Value(0);

  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 22],
  });

  const color = toggleIsOn
    ? Assets.AppColors.feature
    : Assets.AppColors.gainsboro;

  animatedValue.setValue(toggleIsOn ? 0 : 1);

  Animated.timing(animatedValue, {
    toValue: toggleIsOn ? 1 : 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  function handlePress() {
    isSwitch && setToggle(!toggleIsOn);
    _.isFunction(onPress) && onPress();
  }

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: Const.space_31,
        },
        style,
      ]}
      onPress={handlePress}
    >
      {leftIcon ? (
        <Image
          source={leftIcon}
          style={[{ resizeMode: 'contain' }, leftIconStyle]}
        />
      ) : null}
      <Text
        style={[
          {
            fontFamily: Font.medium,
            fontSize: FontSize.s_18,
            color: Assets.AppColors.black,
            marginLeft: leftIcon ? Const.space_26 : undefined,
            flex: 1,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
      {isSwitch && !rightIcon ? (
        <View
          style={{
            width: Const.space_40 + Const.space_3,
            height: Const.space_23,
            marginLeft: Const.space_3,
            borderRadius: Const.space_15,
            justifyContent: 'center',
            backgroundColor: color,
          }}
        >
          <Animated.View
            style={{
              width: Const.space_16,
              height: Const.space_16,
              backgroundColor: Assets.AppColors.white,
              borderRadius: Const.space_8,
              shadowColor: Assets.AppColors.black,
              shadowOffset: {
                width: Const.space_0,
                height: Const.space_2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2.5,
              elevation: 1.5,
              marginLeft: moveToggle,
            }}
          />
        </View>
      ) : null}
      {rightIcon && !isSwitch ? (
        <Image source={rightIcon} style={{ resizeMode: 'contain' }} />
      ) : null}
    </TouchableOpacity>
  );
};
