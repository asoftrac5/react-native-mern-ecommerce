import React, { useState } from "react";
import {
  Text,
  View, 
  StyleSheet,
  Image,
} from "react-native";

const CartItem = (props) => {
  // props.item contains the full cart item with { quantity, product }
  const data = props.item.item.product; // Access the product data
  const [quantity, setQuantity] = useState(props.item.item.quantity);

  return (
    <View style={styles.listItem}>
      <View style={styles.left}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.bodyLeft}>
          <Text style={styles.productName}>{data.name}</Text>
        </View>
        <View style={styles.bodyRight}>
          <Text style={styles.productPrice}>$ {data.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  left: {
    marginRight: 15,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  body: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyLeft: {
    flex: 1,
    paddingRight: 10,
  },
  bodyRight: {
    alignItems: "flex-end",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "orange",
  },
});

export default CartItem;