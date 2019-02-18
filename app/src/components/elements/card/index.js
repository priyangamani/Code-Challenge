// Card
import React from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
import styles from './styles';

const Card = ({ navigation, id, name, address, ImageURL, bookmarked }) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('placeScreen', { id, name, address, ImageURL, bookmarked })}
    underlayColor="#FFF"
  >
    <View style={styles.wrapper}>
      <View style={styles.thumbnailWrapper}>
        <Image style={styles.image} source={{ uri: ImageURL }} />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address.street}</Text>
          <Text style={styles.address}>{address.city}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export default Card;
