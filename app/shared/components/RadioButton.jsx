import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

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
    backgroundColor: '#F2F2F2',
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
    marginRight: 10, // Tùy chỉnh khoảng cách giữa hình ảnh + văn bản và radio button
  },
  text1: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  text2: {
    fontSize: 14,
    color: '#666666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginLeft: 'auto',
  },
  radioButtonSelected: {
    backgroundColor: '#FF00FF',
  },
});

export default RadioButton;
