// Back button
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const backButton = require('../../../assets/img/ButtonBack.png');

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.pop()}>
    <Image style={styles.backButton} source={backButton} />
  </TouchableOpacity>
);

export default BackButton;
