import { StyleSheet } from 'react-native';
import { normalize } from 'utils/size';
import * as Colors from 'themes/colors';

export const styles = StyleSheet.create({
  refreshLoading: {
    position: 'absolute',
    width: '100%',
    height: normalize(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundTransparent: {
    backgroundColor: Colors.transparent,
  },
});
