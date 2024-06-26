import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: width * 0.8,
    height: width * 0.5,
    borderRadius: 8,
  },
});
