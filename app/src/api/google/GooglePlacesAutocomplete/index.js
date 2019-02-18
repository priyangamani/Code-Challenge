import React from 'react';
import { View, Image,Text} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const APIKey = require('../../../../config/keys').GoogleMapsAPIKey;
const { styles } = require('./styles');

const GooglePlacesInput = ({ onPress }) => (
  <GooglePlacesAutocomplete
    placeholder="Search"
    minLength={2} // minimum length of text to search
    autoFocus={false}
    returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
    listViewDisplayed="auto" // true/false/undefined
    fetchDetails
    renderDescription={row => row.description} // custom description render
    onPress={onPress}
    getDefaultValue={() => ''}
    query={{
      // available options: https://developers.google.com/places/web-service/autocomplete
      key: APIKey,
      language: 'en', //language of the results
      types: 'establishment',
    }}
    styles={styles}
    currentLocationLabel="Current location"
    nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
    GoogleReverseGeocodingQuery={
      {
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }
    }
    GooglePlacesSearchQuery={{
      // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
      rankby: 'distance',
      types: 'food',
    }}
    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    renderLeftButton={() => <Image style={{marginTop:20}} source={require('../../../assets/img/list_search.png')} />}
    //renderRightButton={() => <Text>Cancel</Text>}
  />
);

export default GooglePlacesInput;
