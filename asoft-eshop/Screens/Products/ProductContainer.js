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
  const [products, setProducts] = useState([]);           // full list (for reference)
  const [initialState, setInitialState] = useState([]);   // same as products, easier to reason about
  const [productsByCategory, setProductsByCategory] = useState([]); // list after category filter
  const [productsFiltered, setProductsFiltered] = useState([]);     // list after text search
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(-1);               // -1 = "All"
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');

  // load data once
  useEffect(() => {
    setProducts(productsData);
    setInitialState(productsData);
    setProductsByCategory(productsData);
    setProductsFiltered(productsData);
    setCategories(categoriesData);
    setActive(-1);
    setFocus(false);

    return () => {
      setProducts([]);
      setInitialState([]);
      setProductsByCategory([]);
      setProductsFiltered([]);
      setCategories([]);
      setActive(-1);
      setFocus(false);
      setQuery('');
    };
  }, []);

  // text search (runs on top of current category selection)
  const searchProduct = (text) => {
    const q = text.trim().toLowerCase();
    setQuery(text);

    const baseList = productsByCategory.length
      ? productsByCategory
      : initialState;

    if (!q) {
      setProductsFiltered(baseList);
      return;
    }

    const filtered = baseList.filter((p) =>
      p.name.toLowerCase().includes(q),
    );
    setProductsFiltered(filtered);
  };

  const openList = () => setFocus(true);

  const onBlur = () => {
    setFocus(false);
    setQuery('');
    // when we close search, go back to current category selection
    setProductsFiltered(
      productsByCategory.length ? productsByCategory : initialState,
    );
  };

  // filter by category (called from CategoryFilter)
  const categoryFilter = (categoryId) => {
    // reset search when changing category
    setQuery('');
    setFocus(false);

    if (categoryId === 'all') {
      setProductsByCategory(initialState);
      setProductsFiltered(initialState);
      setActive(-1);
      return;
    }

    const filteredByCategory = initialState.filter((p) => {
      const catIdFromProduct =
        p.category?._id ?? p.category?.id ?? p.categoryId;
      return catIdFromProduct === categoryId;
    });

    setProductsByCategory(filteredByCategory);
    setProductsFiltered(filteredByCategory);

    const idx = categories.findIndex(
      (c) => (c._id ?? c.id) === categoryId,
    );
    setActive(idx);
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

      {/* Banner carousel */}
      <Banner />

      {/* Category badges */}
      <CategoryFilter
        categories={categories}
        active={active}
        categoryFilter={categoryFilter}
      />

      {/* Products grid / search results */}
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
