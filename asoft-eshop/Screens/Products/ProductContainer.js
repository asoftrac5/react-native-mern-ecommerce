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
import CategoryFilter from './CategoryFilter';

const productsData = require('../../assets/data/products.json');
const categoriesData = require('../../assets/data/categories.json');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(productsData);
    setProductsFiltered(productsData);
    setCategories(categoriesData);
    setInitialState(productsData);
    setFocus(false);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setCategories([]);
      setInitialState([]);
      setFocus(false);
      setActive(-1);
    };
  }, []);

  // text search
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

  // filter by category (called from CategoryFilter)
  const categoryFilter = (categoryId) => {
    if (categoryId === 'all') {
      setProductsFiltered(initialState);
      setActive(-1);
      return;
    }

    const filtered = initialState.filter((p) => {
      const catIdFromProduct =
        p.category?._id ?? p.category?.id ?? p.categoryId;
      return catIdFromProduct === categoryId;
    });

    setProductsFiltered(filtered);

    const idx = categories.findIndex(
      (c) => (c._id ?? c.id) === categoryId,
    );
    setActive(idx);
    setFocus(false);
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

      {/* Category filter (pure React Native) */}
      <CategoryFilter
        categories={categories}
        active={active}
        categoryFilter={categoryFilter}
      />

      {focus ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={productsFiltered}
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
