import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { TextStyles } from 'app/constants/Styles';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';

/**
 * @author longvu
 * @typedef Param
 * @property {ImageSourcePropType} rightIcon
 * @property {ImageSourcePropType} leftIcon
 * @property {()=>void=} onPressRight
 * @property {()=>void=} onPressLeft
 * @property {String} title
 * @property {StyleProp<ViewStyle>} style
 * @property {StyleProp<TextStyle>} titleStyle
 * @property {StyleProp<ImageStyle>} rightIconStyle
 * @property {StyleProp<ImageStyle>} leftIconStyle
 * @param {Param} param
 * @returns {JSX.Element}
 */
const RadioButton = ({ imageSource, text1, text2 }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
      <TouchableOpacity
        style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
        onPress={handlePress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text1: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  text2: {
    fontSize: 14,
    color: '#808080',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  radioButtonSelected: {
    backgroundColor: '#FF00FF',
  },
});

export default RadioButton;
