
// Screens/Products/ProductContainer.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  Box,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Icon,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { SearchIcon, XIcon } from 'lucide-react-native';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';

const data = require('../../assets/data/products.json');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);

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
    const query = text.trim().toLowerCase();

    if (!query) {
      setProductsFiltered(products);
      return;
    }

    setProductsFiltered(
      products.filter((p) => p.name.toLowerCase().includes(query))
    );
  };

  const openList = () => setFocus(true);

  const onBlur = () => {
    setFocus(false);
    setProductsFiltered(products);
  };

  const keyExtractor = (item) =>
    String(item.id ?? item._id ?? item.name);

  const renderGridItem = ({ item }) => <ProductList item={item} />;

  return (
    <View style={styles.screen}>
      {/* Search bar */}
      <Box px="$4" mt="$4">
        <Input variant="rounded" size="lg">
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>

          <InputField
            placeholder="Search"
            onFocus={openList}
            onChangeText={searchProduct}
          />

          {focus && (
            <InputSlot pr="$3">
              <Pressable onPress={onBlur}>
                <Icon as={XIcon} />
              </Pressable>
            </InputSlot>
          )}
        </Input>
      </Box>

      <Text style={styles.title}>Product Container</Text>

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
  title: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 4,
  },
});

export default ProductContainer;
