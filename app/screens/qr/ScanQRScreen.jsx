import { thunkScanQR } from 'app/controllers/slice/account.slice';
import React from 'react';
import { Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch } from 'react-redux';

export const ScanQRScreen = () => {
  const dispatch = useDispatch();
  const onSuccess = e => {
    const data = JSON.parse(e.data);
    if (data) {
      dispatch(thunkScanQR({ ticketId: data.ticketId }));
    }
  };
  return (
    <View>
      <QRCodeScanner
        onRead={onSuccess}
        topContent={<Text>top</Text>}
        bottomContent={<Text>bottom</Text>}
        vibrate={false}
      />
    </View>
  );
};
