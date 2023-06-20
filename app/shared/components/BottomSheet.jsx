import { Const } from 'app/constants/Const';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';

/**
 * @author hieubt
 * @typedef Param
 * @property {JSX.Element} content
 * @property {React.RefAttributes} refBottomSheet
 * @property {() => void =} onHideDone
 * @property {Boolean} hideOnBackdropPress
 * @property {Boolean} enableSwipeToDismiss
 * @param {Param} param
 */
export const BottomSheet = ({
  content,
  refBottomSheet,
  onHideDone,
  hideOnBackdropPress,
  enableSwipeToDismiss,
}) => {
  const [visible, setVisible] = useState(false);

  function handleClose() {
    setVisible(false);
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
      style={{
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      {content}
    </Modal>
  );
};
