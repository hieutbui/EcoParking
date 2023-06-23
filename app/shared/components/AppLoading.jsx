import React, { createRef, useState, useEffect } from 'react';
import { AppLoading } from 'app/types/indicator';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { ActivityIndicator, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { setFlagAppLoadingHideDone } from 'app/controllers/slice/app.slice';

/**
 * @type {React.MutableRefObject<AppLoading>}
 */
export const AppLoadingRef = createRef();

/**
 * @author hieubt
 * @typedef Props
 * @property {React.MutableRefObject<AppLoading>} loadingRef
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function (props) {
  const { loadingRef } = props;
  const [showing, setShowing] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    loadingRef.current = {
      show(param) {
        _.isString(param.message) && setMessage(param.message);
        setShowing(true);
      },
      hide() {
        setShowing(false);
      },
    };
  }, [loadingRef]);

  return (
    <Modal
      isVisible={showing}
      propagateSwipe={true}
      avoidKeyboard={true}
      statusBarTranslucent={true}
      onModalHide={() => {
        dispatch(setFlagAppLoadingHideDone({}));
      }}
      deviceHeight={Const.deviceHeight}
      deviceWidth={Const.deviceWidth}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      hasBackdrop
      backdropTransitionOutTiming={0}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: Assets.AppColors.white,
          borderRadius: Const.space_30,
          maxWidth: '50%',
          alignItems: 'center',
          padding: Const.space_50 + Const.space_2,
        }}
      >
        <ActivityIndicator color={Assets.AppColors.feature} size={'large'} />
        <Text
          style={{
            fontFamily: Font.medium,
            fontSize: FontSize.s_16,
            color: Assets.AppColors.starDust,
            marginTop: Const.space_10,
          }}
        >
          {message}
        </Text>
      </View>
    </Modal>
  );
}
