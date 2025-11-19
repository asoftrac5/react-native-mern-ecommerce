import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  Button
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {

  const confirmOrder = () => {
    setTimeout (() => {
        props.clearCart();
        props.navigation.navigate(act)
    })
  }
  const confirm = props.route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Confirm Order</Text>
      </View>

      {props.route.params ? (
        <View style={styles.shippingContainer}>
          <Text style={styles.shippingTitle}>Shipping To:</Text>
          <View style={styles.shippingDetails}>
            <Text style={styles.detailText}>
              Address: {confirm.order.order.shippingAddress1}
            </Text>
            <Text style={styles.detailText}>
              Address 2: {confirm.order.order.shippingAddress2}
            </Text>
            <Text style={styles.detailText}>
              City: {confirm.order.order.city}
            </Text>
            <Text style={styles.detailText}>
              Zip Code: {confirm.order.order.zip}
            </Text>
            <Text style={styles.detailText}>
              Country: {confirm.order.order.country}
            </Text>
          </View>
          <Text style={styles.shippingTitle}>Items</Text>
          {confirm.order.order.orderItems.map((x) => {
            return (
                <ListItem 
                style={styles.listItem}
                key={x.product.name}
                avatar
                >
                    <left>
                        <Thumbnail source={{ uri: x.product.image}} />
                    </left>
                    <Body style={styles.body}>
                        <Left>
                            <Text>{x.product.name}</Text>
                        </Left>
                        <Right>
                            <Text>$ {x.product.price}</Text>
                        </Right>
                    </Body>
                </ListItem>
            )
          })}
        </View>
      ) : null}
      <View style={{ alignItems: "center", margin: 20 }}>
        <Button title={'Place order'}/>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    minHeight: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  shippingContainer: {
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 10,
    margin: 10,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  shippingTitle: {
    alignSelf: "center",
    margin: 8,
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  shippingDetails: {
    padding: 8,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
    lineHeight: 20,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row"
  }
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);