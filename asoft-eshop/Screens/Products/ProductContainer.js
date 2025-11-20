// Screens/Products/ProductContainer.js
import React, { useState, useCallback } from "react";
import {
  Box,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Icon,
  Pressable,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(-1);
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setLoading(true);

      // Fetch products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          console.error("Error details:", error.response?.data);
          setLoading(false);
        });

      // Fetch categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setCategories([]);
        setInitialState([]);
        setFocus(false);
        setActive(-1);
      };
    }, [])
  );

  // Filter products by name as the user types
  const searchProduct = (text) => {
    const query = text.trim().toLowerCase();

    if (!query) {
      // Empty query => reset to full list
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
    setProductsFiltered(products); // reset when closing search
  };

  const keyExtractor = (item, index) =>
    `${item.id ?? item._id ?? item.name ?? 'item'}-${index}`;

  const renderGridItem = ({ item, index }) => (
    <ProductList item={item} index={index} />
  );

  return (
    <>
      {loading === false ? (
        <ScrollView style={styles.screen}>
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

          {/* Category filter */}
          <CategoryFilter
            categories={categories}
            active={active}
            categoryFilter={categoryFilter}
          />

          {focus ? (
            // pass navigation so SearchedProduct can navigate to SingleProduct
            <SearchedProduct
              productsFiltered={productsFiltered}
              navigation={props.navigation}
            />
          ) : (
            <View style={styles.listContainer}>
              {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => {
                  const key =
                    item?._id?.$oid ??
                    item?._id ??
                    item?.id ??
                    item?.name ??
                    Math.random().toString();
                  return (
                    <ProductList
                      key={key}
                      item={item}
                      navigation={props.navigation}
                    />
                  );
                })
              ) : (
                <View style={styles.center}>
                  <Text>No products found</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      ) : (
        // Loading indicator
        <View style={[styles.center, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </>
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    backgroundColor: "#f2f2f2",
  },
});

export default ProductContainer;