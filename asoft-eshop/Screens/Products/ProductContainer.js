// Screens/Products/ProductContainer.js
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../Shared/Banner';

const data = require('../../assets/data/products.json');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus(false);
    };
  }, []);

  const searchProduct = (text) => {
    const q = text.trim().toLowerCase();
    setQuery(text);

    if (!q) {
      setProductsFiltered(products);
      return;
    }

    setProductsFiltered(
      products.filter((p) => p.name.toLowerCase().includes(q)),
    );
  };

  const openList = () => setFocus(true);

  const onBlur = () => {
    setFocus(false);
    setQuery('');
    setProductsFiltered(products);
  };

  const keyExtractor = (item) => String(item.id ?? item._id ?? item.name);

  const renderGridItem = ({ item }) => <ProductList item={item} />;

  return (
    <View style={styles.screen}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={query}
          onFocus={openList}
          onChangeText={searchProduct}
        />
        {focus && (
          <TouchableOpacity onPress={onBlur} style={styles.clearButton}>
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <Banner />

      {focus ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderGridItem}
            keyExtractor={keyExtractor}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gainsboro',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  clearButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 20,
  },
  listContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 4,
  },
});

export default ProductContainer;
