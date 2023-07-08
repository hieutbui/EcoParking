import React, { createRef, useState, useEffect } from 'react';
import { AlertDialog, AlertDialogParams } from 'app/types/dialog';
import Modal from 'react-native-modal';
import { Const } from 'app/constants/Const';
import Assets from 'app/assets/Assets';
import { View, Text, Image } from 'react-native';
import { Font, FontSize } from 'app/constants/Styles';
import _ from 'lodash';
import { RadiusButton } from './RadiusButton';

/**
 * @type {React.MutableRefObject<AlertDialog>}
 */
export const AlertDialogRef = createRef();

/**
 * @author hieubt
 * @typedef Props
 * @property {React.MutableRefObject<AlertDialog>} dialogRef
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function (props) {
  const { dialogRef } = props;
  const [showing, setShowing] = useState(false);
  /**
   * @type {[AlertDialogParams, React.SetStateAction<AlertDialogParams>]}
   */
  const [dialogProperties, setDialogProperties] = useState({
    title: '',
    message: '',
    image: null,
    options: null,
  });

  useEffect(() => {
    dialogRef.current = {
      show(params) {
        if (!_.isEmpty(params)) {
          setDialogProperties(params);
          setShowing(true);
        }
      },
      hide() {
        setShowing(false);
      },
    };
  }, [dialogRef, setShowing]);

  const { title, message, image, options } = dialogProperties;

  return (
    <Modal
      isVisible={showing}
      propagateSwipe={true}
      avoidKeyboard={true}
      statusBarTranslucent={true}
      onModalHide={() => {}}
      deviceHeight={Const.deviceHeight}
      deviceWidth={Const.deviceWidth}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      hasBackdrop
      backdropTransitionOutTiming={0}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // maxWidth: '90%',
      }}
      // onBackdropPress={() => setShowing(false)}
    >
      <View
        style={{
          backgroundColor: Assets.AppColors.white,
          borderRadius: Const.space_30,
          alignItems: 'center',
          paddingHorizontal: 50,
        }}
      >
        <Image
          source={image}
          style={{
            resizeMode: 'contain',
            marginTop: Const.space_40 + Const.space_2,
          }}
        />
        <Text
          style={{
            color: Assets.AppColors.feature,
            fontFamily: Font.semiBold,
            fontSize: FontSize.s_32,
            fontStyle: 'normal',
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: Assets.AppColors.textBlack,
            fontFamily: Font.medium,
            fontSize: FontSize.s_16,
            fontWeight: '500',
            fontStyle: 'normal',
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
        {!_.isEmpty(options) ? (
          <View
            style={{
              width: 250,
              marginTop: Const.space_22,
              marginBottom: 45,
            }}
          >
            {options.map((button, index) => {
              return (
                <RadiusButton
                  key={index}
                  type={button.type}
                  title={button.title}
                  onPress={() => {
                    setShowing(false);
                    button.onPress();
                  }}
                  style={[
                    button.style,
                    { marginBottom: index === 0 ? Const.space_16 : undefined },
                  ]}
                />
              );
            })}
          </View>
        ) : null}
      </View>
    </Modal>
  );
}
