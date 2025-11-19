// Screens/Products/SingleProduct.js
import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
} from "react-native";

const SingleProduct = (props) => {
  // get item from navigation params
  const item = props?.route?.params?.item ?? {};
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    // derive availability from common product fields
    if (item == null) {
      setAvailability("Unavailable");
      return;
    }

    if (typeof item.countInStock !== "undefined") {
      setAvailability(item.countInStock > 0 ? "In Stock" : "Out of Stock");
    } else if (typeof item.available !== "undefined") {
      setAvailability(item.available ? "In Stock" : "Out of Stock");
    } else {
      setAvailability("Unknown");
    }
  }, [item]);

  const fallbackImage =
    "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image ? item.image : fallbackImage }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.name ?? item.title ?? "Product"}</Text>
          {item.price != null && (
            <Text style={styles.price}>${String(item.price)}</Text>
          )}
          <Text style={styles.availability}>Availability: {availability}</Text>

          {/* Example action (you can wire to cart later) */}
          <View style={styles.buttonWrap}>
            <Button
              title="Add to Cart"
              onPress={() => {
                // placeholder: navigation to cart or toast
                props.navigation?.navigate?.("Cart");
              }}
            />
          </View>

          {/* Description (if present) */}
          {item.description ? (
            <View style={styles.descWrap}>
              <Text style={styles.descTitle}>Description</Text>
              <Text style={styles.descText}>{item.description}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 8,
    margin: 0,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  infoContainer: {
    padding: 12,
    backgroundColor: "#fff",
    marginTop: 8,
    borderRadius: 6,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  availability: {
    marginBottom: 12,
    fontSize: 14,
    color: "#333",
  },
  buttonWrap: {
    marginBottom: 12,
  },
  descWrap: {
    marginTop: 8,
  },
  descTitle: {
    fontWeight: "700",
    marginBottom: 6,
  },
  descText: {
    lineHeight: 18,
    color: "#444",
  },
});

export default SingleProduct;
