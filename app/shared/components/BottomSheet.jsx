import { Const } from 'app/constants/Const';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @author hieubt
 * @typedef Param
 * @property {JSX.Element} content
 * @property {React.RefAttributes} refBottomSheet
 * @property {() => void =} onHideDone
 * @property {Boolean} hideOnBackdropPress
 * @property {Boolean} enableSwipeToDismiss
 * @property {StyleProp<ViewStyle>} style
 * @property {number} backgroundOpacity
 * @property {()=>void=} onClose
 * @param {Param} param
 */
export const BottomSheet = ({
  content,
  refBottomSheet,
  onHideDone,
  hideOnBackdropPress,
  enableSwipeToDismiss,
  style,
  backgroundOpacity,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  function handleClose() {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  }

  function handleHideDone() {
    if (onHideDone) {
      onHideDone();
    }
  }

  useEffect(() => {
    if (refBottomSheet) {
      refBottomSheet.current = {
        show: () => {
          setVisible(true);
        },
        hide: () => {
          setVisible(false);
        },
      };
    }
    return () => {};
  }, [refBottomSheet]);

  return (
    <Modal
      isVisible={visible}
      propagateSwipe={true}
      avoidKeyboard={true}
      statusBarTranslucent={true}
      onDismiss={handleHideDone}
      deviceWidth={Const.deviceWidth}
      deviceHeight={Const.deviceHeight}
      onBackButtonPress={handleClose}
      swipeDirection={enableSwipeToDismiss ? 'down' : undefined}
      onSwipeComplete={handleClose}
      onBackdropPress={() => {
        if (hideOnBackdropPress) {
          handleClose();
        }
      }}
      hasBackdrop
      backdropTransitionOutTiming={0}
      backdropOpacity={backgroundOpacity}
      style={[
        {
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 0,
        },
        style,
      ]}
    >
      {content}
    </Modal>
  );
};
