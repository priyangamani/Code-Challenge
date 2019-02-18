// card/style
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 100,
    width,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnailWrapper: {
    flex: 0.6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  infoWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  name: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'SFProDisplay-Regular',
    marginBottom: 10,
  },
  address: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
  },
});
