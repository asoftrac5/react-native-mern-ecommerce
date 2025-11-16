import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    position: "absolute",
    top: -8,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(CartIcon);