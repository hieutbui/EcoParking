import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import React from 'react';
import { View, Text } from 'react-native';
import { CellOptionList } from './CellOptionList';
import { Font, FontSize } from 'app/constants/Styles';

/**
 * @typedef CellOptions
 * @property {String} name
 * @property {String} value
 * @property {() => void = } onPress
 */

/**
 * @author hieubt
 * @typedef Param
 * @property {String} title
 * @property {() => void =} onClose
 * @property {() => void =} onSelected
 * @property {CellOptions[]} options
 * @param {Param} param
 * @returns {JSX.Element}
 */
export const SelectionsOptionsView = ({
  title,
  options,
  onClose,
  onSelected,
}) => {
  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  function handleSelected(newValue) {
    if (onSelected) {
      onSelected(newValue);
    }
  }

  return (
    <View
      style={{
        backgroundColor: Assets.AppColors.white,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopRightRadius: Const.space_50,
        borderTopLeftRadius: Const.space_50,
        paddingHorizontal: Const.space_30,
      }}
    >
      <View
        style={{
          borderBottomWidth: Const.space_1,
          borderColor: Assets.AppColors.lightgrey,
          width: '100%',
          alignItems: 'center',
          marginBottom: Const.space_22,
        }}
      >
        <Text
          style={{
            fontFamily: Font.bold,
            fontStyle: 'normal',
            fontSize: FontSize.s_24,
            lineHeight: Const.space_35,
            fontWeight: '600',
            color: Assets.AppColors.black,
            paddingTop: Const.space_16,
            paddingBottom: Const.space_13,
          }}
        >
          {title}
        </Text>
      </View>
      <View>
        {options?.map((item, index) => {
          return (
            <CellOptionList
              key={index}
              text={item?.name}
              onPress={item?.onPress}
              value={item?.value}
            />
          );
        })}
      </View>
    </View>
  );
};
