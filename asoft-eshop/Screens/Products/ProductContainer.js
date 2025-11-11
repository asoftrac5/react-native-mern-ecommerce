// Screens/Products/ProductContainer.js
import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {
  Box,
  Input,
  InputField,
  InputSlot,
  InputIcon,
} from '@gluestack-ui/themed';
import { SearchIcon } from 'lucide-react-native';

import ProductList from './ProductList';
const data = require('../../assets/data/products.json');

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setProducts(data);
    return () => setProducts([]);
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [products, query]
  );

  const renderItem = ({ item, index }) => (
    <ProductList item={item} index={index} />
  );

  // 🔴 IMPORTANT: this MUST be exactly like this
  const keyExtractor = (item, index) =>
    `${item.id ?? item._id ?? item.name ?? 'item'}-${index}`;

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
            value={query}
            onChangeText={setQuery}
          />
        </Input>
      </Box>

      <Text style={styles.title}>Product Container</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredProducts}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
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
