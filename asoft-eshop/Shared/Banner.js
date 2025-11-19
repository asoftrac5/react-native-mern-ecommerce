import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'; // 👈 no `/src`

const { width } = Dimensions.get('window');

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    ]);

    return () => setBannerData([]);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showsButtons={false}
            autoplay
            autoplayTimeout={2}
          >
            {bannerData.map((uri) => (
              <Image
                key={uri}
                style={styles.imageBanner}
                resizeMode="contain"
                source={{ uri }}
              />
            ))}
          </Swiper>
          {/* <View style={{ height: 20 }} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  swiper: {
    width,
    alignItems: 'center',
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
