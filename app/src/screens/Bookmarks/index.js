// screens/Bookmarks
import React, { Component } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import Carousel from "react-native-snap-carousel";
import * as Colors from "themes/colors";
import { connect } from "react-redux";
import {
  getFireBaseData,
  insertBookmark,
  deleteBookmark
} from "../../redux/store";
const addressParser = require("parse-address");
const Database = require("database")();
const validateBookmark = require("utilities/validation/bookmarks");
const helpers = require("utilities/helpers")();
const styles = require("./styles");
const images = {
  cardBg: require("assets/img/weatherHeader.png"),
  tripBg: require("assets/img/tripBackground.png"),
  addBookmark: require("assets/img/addBookmarkButton.png"),
  addArrowIcon: require("assets/img/goIcon.png"),
  heartIcon: require("assets/img/heartIcon.png")
};

class BookmarksScreen extends Component {
  static navigationOptions = () => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      bookmarksHashTable: {},
      initFirebaseLoad: false
    };
  }
  componentDidMount() {
    this.props.getFireBaseData();
    if (!this.state.initFirebaseLoad) {
      this.setState({ bookmarks: this.props.getBookmarkList });
      this.setState({ initFirebaseLoad: true });
    }
  }

  componentWillMount() {
    // initFirebaseLoad is for allowing this database to be called once.
    this.props.getFireBaseData();
    this.setState({ bookmarks: this.props.getBookmarkList });
  }

  componentWillReceiveProps(nextProps) {
    this.props.getFireBaseData();
    if (nextProps.navigation.state.params) {
      this.updateBookmarkList(nextProps.navigation.state.params);
    }
  }

  updateBookmarkList = params => {
    const errors = validateBookmark(params);
    const bookmark = {};
    const bookmarksList = this.props.getBookmarkList.slice();
    const bookmarksHashTable = this.state.bookmarksHashTable;
    const navParams = params;
    console.log("params", navParams);
    // add bookmark
    if (
      errors.isValid &&
      !navParams.remove &&
      !bookmarksHashTable[navParams.id]
    ) {
      bookmark.id = navParams.id;
      bookmark.thumbnailURL = navParams.thumbnailURL;
      bookmark.name = navParams.name;
      bookmark.rating = navParams.rating;
      bookmark.latitude = navParams.latitude;
      bookmark.longitude = navParams.longitude;
      const address = addressParser.parseLocation(navParams.address);
      bookmark.address = {
        street: helpers.getAddressStreet(address),
        city: helpers.getAddressCity(address)
      };
      // add bookmark to the beginning (TOP) of the list
      bookmarksList.unshift(bookmark);
      bookmarksHashTable[bookmark.id] = {
        id: bookmark.id
      };
      // update bookmarks state
      this.setState({ bookmarks: bookmarksList });
      // save to firbase database
      this.props.insertBookmark(bookmark);
    } else if (!errors.id && navParams.remove) {
      // remove bookmark
      const index = bookmarksList.findIndex(
        bookmarks => bookmarks.id === navParams.id
      );
      if (index !== -1 || index !== undefined) {
        bookmarksList.splice(index, 1);
        delete bookmarksHashTable[navParams.id];
        // update bookmarks state
        this.setState({ bookmarks: bookmarksList });
        // update firebase by deleting the bookmark
        this.props.deleteBookmark(navParams);
      }
    }
  };

  _keyExtractor = (item, index) => item.id.toString();

  handleSnapToItem(index) {
    console.log("snapped to ", index);
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("placeScreen", {
              id: item.id,
              name: item.name,
              address: item.address,
              ImageURL: item.thumbnailURL,
              rating: item.rating,
              longitude: item.longitude,
              latitude: item.latitude,
              bookmarked: true
            });
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnailURL }}
            style={{ width: 250, height: 200 }}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.banner}>
              <View style={styles.topBanner}>
                <View style={styles.row}>
                  <Text style={styles.favText}>{item.address.city}</Text>
                  <View style={styles.favIcon}>
                    <View style={styles.row}>
                      <Image source={images.heartIcon} style={{ margin: 5 }} />
                      <Text style={styles.ratings}>{item.rating}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.title}>{item.name}</Text>
              </View>

              <Image
                source={images.addArrowIcon}
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={[styles.header]} source={images.cardBg}>
          <View style={styles.headerContent}>
            <View style={styles.topbanner}>
              <Text style={styles.textContent}>Good Morning</Text>
              <Text>Today is 72° and Sunny</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("searchScreen")}
            >
              <Image source={images.addBookmark} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {this.state.initFirebaseLoad ? (
          <View
            style={{
              height: 200,
              width: 300
            }}
          >
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.getBookmarkList}
              renderItem={this._renderItem.bind(this)}
              onSnapToItem={this.handleSnapToItem.bind(this)}
              sliderWidth={360}
              itemWidth={256}
              layout={"default"}
              firstItem={0}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.textContent2}>The trip is empty</Text>
            <Text style={styles.textContent3}>
              Click the blue plus to pin a place
            </Text>
          </View>
        )}
        <ImageBackground style={[styles.body]} source={images.tripBg}>
          <Text style={styles.textContent4}>Exploring Louisville BBQ</Text>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    getBookmarkList: state.getBookmarkList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFireBaseData: () => dispatch(getFireBaseData()),
    insertBookmark: data => {
      dispatch(insertBookmark(data));
    },
    deleteBookmark: data => {
      dispatch(deleteBookmark(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarksScreen);
