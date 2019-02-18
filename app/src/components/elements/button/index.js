// button
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from './styles';

const button = ({ text, onPress, color, fontSize }) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor="#FFF"
    // style={styles...}
  >
    <View style={[styles.wrapper, { backgroundColor: color }]}>
      <Text style={[styles.text, { fontSize }]}>{text}</Text>
    </View>
  </TouchableHighlight>
);

export default button;
