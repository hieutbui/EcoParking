import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface AlertDialog {
  show: (params: AlertDialogParams) => void;
  hide: () => void;
}

export interface AlertDialogParams {
  title: string;
  message: string;
  image: ImageSourcePropType;
  options: AlertDialogButtonParams[];
}

export interface AlertDialogButtonParams {
  title: string;
  type: 'positive' | 'negative' | 'hollow';
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}
