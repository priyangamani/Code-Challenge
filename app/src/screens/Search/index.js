// Search screen
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Button from 'components/elements/button';
import BackButton from 'components/elements/BackButton';
import GooglePlacesAutocomplete from '../../api/google/GooglePlacesAutocomplete';
import * as Colors from "themes/colors";

const styles = require('./styles');

class BookmarksScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Search',
    headerTintColor:Colors.black,
    headerStyle: {
      backgroundColor:Colors.white,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontSize: 25,
      fontFamily: 'SFProDisplay-Light',
    },
    headerLeft: <BackButton navigation={navigation} />,
  });

  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          onPress={(data, details = null) => {
            console.log("searchDetails",details);
            if (data && details && details.id) {
              this.props.navigation.navigate('placeScreen', {
                id: details.id,
                formatted_address: details.formatted_address,
                name: details.name,
                photoRef: details.photos ? details.photos[0].photo_reference : undefined,
                rating:details.rating,
                latitude:details.geometry.location.lat,
                longitude:details.geometry.location.lng
              });
            }
          }}
        />
      </View>
    );
  }
}

export default BookmarksScreen;
