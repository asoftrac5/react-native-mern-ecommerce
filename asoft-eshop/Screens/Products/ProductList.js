
// Screens/Products/ProductList.js
import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

const ProductList = ({ item }) => {
  return (
    <TouchableOpacity style={{ width: '50%' }}>
      <View style={{ width: width / 2, backgroundColor: '#DCDCDC' }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
