import React, { createRef, useState, useEffect } from 'react';
import { ScaleToast } from 'app/types/toast';
import _ from 'lodash';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import Assets from 'app/assets/Assets';

/**
 * @type {React.MutableRefObject<ScaleToast>}
 */
export const ScaleToastRef = createRef();

/**
 * @author hieubt
 * @description default duration 3000
 * @typedef Props
 * @property {React.MutableRefObject<ScaleToast>} toastRef
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function (props) {
  const { toastRef } = props;
  const [showing, setShowing] = useState(false);
  const [message, setMessage] = useState('');
  const defaultDuration = 3000;

  useEffect(() => {
    toastRef.current = {
      show(param) {
        _.isString(param.message) && setMessage(param.message);

        setTimeout(() => setShowing(true));

        setTimeout(
          () => setShowing(false),
          param?.duration ? param.duration : defaultDuration,
        );
      },
      hide() {
        setShowing(false);
      },
    };
  }, [toastRef]);

  return (
    <Modal
      animationType="fade"
      visible={showing}
      transparent
      focusable={false}
      onRequestClose={() => false}
      statusBarTranslucent
      presentationStyle={'overFullScreen'}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowing(false)}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            bottom: '10%',
            position: 'absolute',
            borderRadius: Const.space_20,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 1,
            paddingVertical: Const.space_12,
            paddingHorizontal: Const.space_16,
            marginHorizontal: Const.space_12 * 4,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Font.regular,
              fontSize: FontSize.s_16,
              lineHeight: Const.space_22,
              color: Assets.AppColors.white,
            }}
          >
            {message}
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
