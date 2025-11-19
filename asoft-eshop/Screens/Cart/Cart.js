import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach(cart => {
    return (total += cart.product.price)
  });
  
  return (
    <>
      {props.cartItems.length ? (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Cart</Text>
          <SwipeListView 
            data={props.cartItems}
            renderItem={(data) => (
              <CartItem item={data} />
            )}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity 
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                >
                  <FontAwesome name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.bottomContainer}>
            <View style={styles.bottomLeft}>
              <Text style={styles.totalPrice}>$ {total.toFixed(2)}</Text>
            </View>
            <View style={styles.bottomRight}>
              <Button 
                title="Clear" 
                color="red" 
                onPress={() => props.clearCart()}
              />
            </View>
            <View style={styles.bottomRight}>
              <Button 
                title="Checkout" 
                color="green"
                onPress={() => props.navigation.navigate('Checkout')}
              />
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Looks like your cart is empty</Text>
          <Text style={styles.emptySubText}>
            Add products to your cart to get started
          </Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: "#333",
  },
  listContent: {
    paddingBottom: 20, // Space before bottom container
  },
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
  },
  bottomContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomLeft: {
    flex: 1,
  },
  bottomRight: {
    marginLeft: 10,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginLeft: 10,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 110,
    borderRadius: 10,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);