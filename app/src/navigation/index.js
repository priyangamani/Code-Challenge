import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import BookmarkScreen from '../screens/Bookmarks';
import PlaceScreen from '../screens/Place';
import SearchScreen from '../screens/Search';

export default class navigation extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <InitNav test="testing" />
      </View>
    );
  }
}

const routeConfigs = {
  bookmarkScreen: { screen: BookmarkScreen },
  placeScreen: { screen: PlaceScreen },
  searchScreen: { screen: SearchScreen },
};
const StackNavigationConfigLogin = {
  initialRouteName: 'bookmarkScreen',
};

const InitNav = StackNavigator(routeConfigs, StackNavigationConfigLogin);
