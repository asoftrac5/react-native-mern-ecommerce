// Screens/Products/ProductContainer.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const productsData = require("../../assets/data/products.json");
const categoriesData = require("../../assets/data/categories.json");

const { height } = Dimensions.get("window");

// helper: normalize category id from a product
const getCategoryIdFromProduct = (product) =>
  product?.category?.$oid ??
  product?.category?._id?.$oid ??
  product?.category?._id ??
  product?.categoryId ??
  null;

// helper: normalize category id from category object
const getCategoryId = (cat) =>
  cat?._id?.$oid ?? cat?._id ?? cat?.id ?? cat?.$oid ?? String(cat ?? "");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
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

  // text search (used when focus === true)
  const searchProduct = (text) => {
    const q = text.trim().toLowerCase();
    setQuery(text);

    if (!q) {
      setProductsFiltered(products);
      return;
    }

    setProductsFiltered(
      products.filter((p) => (p.name ?? "").toLowerCase().includes(q))
    );
  };

  const openList = () => setFocus(true);

  const onBlur = () => {
    setFocus(false);
    setQuery("");
    setProductsFiltered(products);
  };

  // filter by category (called from CategoryFilter)
  const categoryFilter = (categoryId) => {
    if (categoryId === "all") {
      setProductsFiltered(initialState);
      setActive(-1);
      return;
    }

    const filtered = initialState.filter(
      (p) => getCategoryIdFromProduct(p) === categoryId
    );

    setProductsFiltered(filtered);

    const idx = categories.findIndex((c) => getCategoryId(c) === categoryId);
    setActive(idx);
    setFocus(false);
  };

  return (
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
                item?._id?.$oid ?? item?._id ?? item?.id ?? item?.name ?? Math.random().toString();
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
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "gainsboro",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#fff",
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
    minHeight: height / 2,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 16,
    paddingHorizontal: 4,
  },
  center: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductContainer;
