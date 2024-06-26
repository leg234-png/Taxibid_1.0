import React, { useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const data = [
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTgRwB1rgmsK9ByzBiyou38q5XwxXWOmedWA&s' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxLxYcuyFmHMvhSIQJkKK6mvEhoXKIaqaZtA&s' },
  { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3BFsQTPnei0mrMdft4BRy2iYbFJyLQLZng&s' },
];


const renderItem = ({ item }) => (
  <Image source={{ uri: item.imageUrl }} style={styles.carouselImage} />
);

const HomePage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginPage');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Carousel
          data={data}
          renderItem={renderItem}
          width={Dimensions.get('window').width}
          height={styles.carouselImage.height}
          autoPlay={true}
          loop={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: 200,
  },
});

export default HomePage;
