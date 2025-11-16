// Screens/Products/SearchedProducts.js
import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
const FALLBACK_IMAGE =
  "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png";

/**
 * SearchedProduct
 * - Accepts either an `onSelect(item)` callback OR `navigation` prop.
 * - If onSelect is provided it is used (keeps previous behaviour).
 * - Otherwise it will call navigation.navigate("Product Detail", { item }).
 */
const SearchedProduct = ({ productsFiltered = [], onSelect, navigation }) => {
  if (!productsFiltered || productsFiltered.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No products match the selected criteria</Text>
        <Text>Add products to the products list</Text>
      </View>
    );
  }

  const handlePress = (item) => {
    if (typeof onSelect === "function") {
      onSelect(item);
      return;
    }

    // fallback: use navigation if available
    navigation?.navigate?.("Product Detail", { item });
  };

  return (
    <ScrollView style={styles.wrap}>
      {productsFiltered.map((item, index) => {
        const key =
          item?._id?.$oid ??
          item?._id ??
          item?.id ??
          item?.name ??
          String(index);

        return (
          <TouchableOpacity
            key={key}
            onPress={() => handlePress(item)}
            style={styles.row}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Image
              source={{ uri: item?.image || FALLBACK_IMAGE }}
              style={styles.thumb}
            />
            <View style={styles.info}>
              <Text style={styles.name}>
                {item?.name ?? item?.title ?? "Untitled product"}
              </Text>
              {item?.description ? (
                <Text style={styles.desc} numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width,
    paddingVertical: 8,
    backgroundColor: "gainsboro",
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    color: "#666",
  },
  center: {
    width: "100%",
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedProduct;
