// Bookmark Styles
import { StyleSheet, Dimensions } from 'react-native';
import * as Colors from 'themes/colors';
const { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  thumbnaiWrapperl: {
    backgroundColor: '#fff',
    width,
    height: height / 2,
    position: 'absolute',
    top: -(height / 4),
  },
  image: {
    width,
    height: height / 1,
  },
  infoWrapper: {
    width,
    height,
    top: height / 4.5,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  name: {
    marginTop: 14,
    fontSize: 24,
  },
  address: {
    marginTop: 14,
    fontSize: 18,
    color:Colors.black,
    fontWeight:'bold'
  },
  button: {
    width: width / 1.2,
    marginTop: 29,
  },

  row:{
    flex:1,flexDirection:'row'
  },
  favText:{
    fontSize: 20, fontFamily: "SFProDisplay-Regular",color:Colors.white,textAlign:'center'
  },
  banner:{
    position: 'absolute', top: 300, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'center'
  },
  favIcon:{
    backgroundColor:Colors.white,
    borderRadius:10,
    height:20,
    width:50,
    borderWidth: 1
  },
  ratings:{
    color:Colors.blue,
    textAlign:'center'
  },
  title:{
    fontSize:15,color:Colors.white,fontFamily: "SFProDisplay-Regular",textAlign:'center'
  },
  topbanner:{
    flex: 1,
    width: width / 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  mapContainer: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    height: height / 2,
    margin: 10,
    width: width,
    borderRadius: 20,
    borderWidth: 10
  }
});
