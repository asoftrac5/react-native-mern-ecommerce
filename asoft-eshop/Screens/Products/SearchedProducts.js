// Screens/Products/SearchedProducts.js
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');
const FALLBACK_IMAGE =
  'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png';

const SearchedProduct = ({ productsFiltered = [], onSelect }) => {
  if (!productsFiltered || productsFiltered.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No products match the selected criteria</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ width }}>
      {productsFiltered.map((item, index) => (
        <TouchableOpacity
          key={item.id ?? item._id ?? item.name ?? index}
          onPress={() => onSelect?.(item)}
          style={styles.row}
        >
          <Image
            source={{ uri: item.image || FALLBACK_IMAGE }}
            style={styles.thumb}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            {item.description ? (
              <Text style={styles.desc} numberOfLines={2}>
                {item.description}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    color: '#666',
  },
  center: {
    width: '100%',
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchedProduct;
