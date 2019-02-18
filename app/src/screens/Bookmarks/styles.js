// Bookmark Styles
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
import * as Colors from 'themes/colors';
const box_height = height;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    width: width / 1.2,
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
  scrollView: {
    backgroundColor:Colors.white,
    marginBottom: 0,
  },
  header: {
    height: box_height/5,
    width: width,
  },
  body: {
    height: box_height/1,
    width: width,
    flex:1,
    alignItems: 'stretch'
  },
  headerContent:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  topBanner:{
    flex: 1,
    width: width / 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textContent:{
    fontSize: 35, fontFamily: "SFProDisplay-Regular",marginRight:20
  },
  textContent1:{
    fontSize: 14, fontFamily: "SFProDisplay-Regular"
  },
  textContent2:{
    fontSize: 25,
    fontFamily: "SFProDisplay-Regular",
    textAlign: "center",
    marginTop: 20
  },
  textContent3:{
    fontSize: 18,
    fontFamily: "SFProDisplay-Regular",
    textAlign: "center",
    marginTop:10
  },
  textContent4:{
    fontSize: 22,
    fontFamily: "SFProDisplay-Regular",
    textAlign: "center",
    marginTop:120,
    color:Colors.white
  },
  row:{
    flex:1,flexDirection:'row'
  },
  favText:{
    fontSize: 14, fontFamily: "SFProDisplay-Regular",color:Colors.white
  },
  banner:{
    position: 'absolute', top: 120, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'stretch'
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
    fontSize:20,color:Colors.white,fontFamily: "SFProDisplay-Regular"
  }

});
