import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './styles';

const layout = ({ children }) => (
  <View style={styles.wrapper}>
    <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>
  </View>
);

export default layout;
