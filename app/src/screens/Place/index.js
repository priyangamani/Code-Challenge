// Place screen
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";
import BackButton from "components/elements/BackButton";
import Button from "components/elements/button";
import * as Colors from "themes/colors";
import MapView from "react-native-maps";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
const styles = require("./styles");
const APIKey = require("config/keys").GoogleMapsAPIKey;

const images = {
  cardBg: require("assets/img/weatherHeader.png"),
  tripBg: require("assets/img/tripBackground.png"),
  addBookmark: require("assets/img/addBookmarkButton.png"),
  addArrowIcon: require("assets/img/goIcon.png"),
  heartIcon: require("assets/img/heartIcon.png")
};

class BookmarksScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerTintColor:Colors.black,
    cardStyle: { backgroundColor: "transparent" },
    headerStyle: {
      backgroundColor: "transparent",
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      fontSize:25,
      fontFamily: "SFProDisplay-Light"
    },
    headerLeft: <BackButton navigation={navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      url: "",
      name: "",
      address: "",
      buttonText: "Pin to Trip",
      buttonColor: Colors.blue,
      bookmarked: false,
      rating: "",
      longitude: "",
      latitude: "",
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      coordinates: {
        latitude: 37.600425,
        longitude: -122.4324
      }
    };
    this.baseState = this.state;
  }

  componentWillMount() {
    const params = this.props.navigation.state.params;
    // Place ID
    if (params.id) {
      this.setState({ id: params.id });
    }
    // Place name
    if (params.name) {
      this.setState({ name: params.name });
    }
    // image URL
    if (params.ImageURL) {
      this.setState({ url: params.ImageURL });
    } else if (params.photoRef) {
      // this would be loading if the prev screen was the search
      const api = APIKey;
      const photoRef = params.photoRef;
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=900&photoreference=${photoRef}&key=${api}`;
      this.setState({ url: url });
    } else {
      // load this image if there is no image being passed
      this.setState({
        url: "https://dummyimage.com/400x400/ffffff/000000.jpg&text=No+Photos"
      });
    }
    // address
    if (params.address && params.address.street && params.address.city) {
      const address = `${params.address.street} ${params.address.city}`;
      this.setState({ address });
    }
    if (params.formatted_address) {
      this.setState({ address: params.formatted_address });
    }
    if (params.rating) {
      this.setState({ rating: params.rating });
    }
    if (params.latitude) {
      this.setState({ latitude: params.latitude });
    }
    if (params.longitude) {
      this.setState({ longitude: params.longitude });
    }

    let region = {
      latitude: params.latitude,
      longitude: params.longitude,
      latitudeDelta: 0.48,
      longitudeDelta: 0.466
    };
    this.setState({ region });

    let coordinates = {
      latitude: params.latitude,
      longitude: params.longitude
    };
    this.setState({ coordinates });

    // button setup
    if (params.bookmarked) {
      this.setState({ bookmarked: true });
      this.setState({ buttonText: "Pinned to Trip" });
      this.setState({ buttonColor: Colors.green });
    }
  }

  onRegionChange = region => {
    this.setState({ region });
  };
  componentWillUnmount() {
    // reset state
    this.setState(this.baseState);
  }

  ButtonAction = () => {
    if (this.state.bookmarked) {
      // ask if they want to remove the bookmark
      Alert.alert(
        "Remove Bookmark",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () =>
              this.props.navigation.navigate("bookmarkScreen", {
                remove: true,
                id: this.state.id
              })
          }
        ],
        { cancelable: false }
      );
    } else {
      // adding bookmark and returning to the bookmark screen.
      return this.props.navigation.navigate("bookmarkScreen", {
        id: this.state.id,
        thumbnailURL: this.state.url,
        name: this.state.name,
        address: this.state.address,
        rating:this.state.rating,
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        remove: false
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.thumbnaiWrapperl}>
          <ImageBackground
            style={styles.image}
            source={{ uri: this.state.url }}>
            <View style={styles.banner}>
              <View style={styles.topbanner}>
                <View style={styles.row}>
                  <Text style={styles.favText}>{this.state.name}</Text>
                  <View style={styles.favIcon}>
                    <View style={styles.row}>
                      <Image source={images.heartIcon} style={{ margin: 5 }} />
                      <Text style={styles.ratings}>{this.state.rating}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Image
                source={images.addArrowIcon}
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{this.state.name}</Text>
          <Text style={styles.address}>{this.state.address}</Text>
          <View style={styles.button}>
            <Button
              onPress={this.ButtonAction}
              text={this.state.buttonText}
              color={this.state.buttonColor}
              fontSize={16}
            />
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              ref={ref => {
                this.map = ref;
              }}
              region={this.state.region}
              onRegionChange={this.onRegionChange}>
              <MapView.Marker
                coordinate={this.state.coordinates}
                title={this.state.address}
              />
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}

export default BookmarksScreen;

