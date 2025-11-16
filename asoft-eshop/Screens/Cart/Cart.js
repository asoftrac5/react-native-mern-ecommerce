// import React from "react";
// import {
//   Text,
//   View,
//   Dimensions,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";

// import FontAwesome from "@expo/vector-icons/FontAwesome";

// import { connect } from "react-redux";
// import * as actions from "../../Redux/Actions/cartActions";

// var { height, width } = Dimensions.get("window");

// const Cart = (props) => {
//   var total = 0;
//   props.cartItems.forEach(cart => {
//     return (total += cart.product.price)
//   });
  
//   return (
//     <>
//       {props.cartItems.length ? (
//         <View style={styles.container}>
//           <Text style={styles.title}>Cart</Text>
//           <ScrollView style={styles.scrollView}>
//             {props.cartItems.map((data, index) => {
//               return (
//                 <View style={styles.listItem} key={index}>
//                   <View style={styles.left}>
//                     <Image
//                       style={styles.thumbnail}
//                       source={{
//                         uri: data.product.image
//                           ? data.product.image
//                           : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
//                       }}
//                     />
//                   </View>
//                   <View style={styles.body}>
//                     <View style={styles.bodyLeft}>
//                       <Text style={styles.productName}>{data.product.name}</Text>
//                     </View>
//                     <View style={styles.bodyRight}>
//                       <Text style={styles.productPrice}>$ {data.product.price}</Text>
//                     </View>
//                   </View>
//                 </View>
//               );
//             })}
//           </ScrollView>
//           <View style={styles.bottomContainer}>
//             <View style={styles.bottomLeft}>
//               <Text style={styles.totalPrice}>$ {total.toFixed(2)}</Text>
//             </View>
//             <View style={styles.bottomRight}>
//               <Button title="Clear" color="red" />
//             </View>
//             <View style={styles.bottomRight}>
//               <Button 
//                 title="Checkout" 
//                 color="green"
//                 onPress={() => props.navigation.navigate('Checkout')}
//               />
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>Looks like your cart is empty</Text>
//           <Text style={styles.emptySubText}>
//             Add products to your cart to get started
//           </Text>
//         </View>
//       )}
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f8f8",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 50,
//     marginBottom: 20,
//     color: "#333",
//   },
//   scrollView: {
//     flex: 1,
//     marginBottom: 80, // Add space for bottom container
//   },
//   emptyContainer: {
//     height: height,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 10,
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: "#999",
//   },
//   listItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     justifyContent: "flex-start",
//     padding: 15,
//     marginHorizontal: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   left: {
//     marginRight: 15,
//   },
//   thumbnail: {
//     width: 80,
//     height: 80,
//     borderRadius: 10,
//     backgroundColor: "#f0f0f0",
//   },
//   body: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   bodyLeft: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   bodyRight: {
//     alignItems: "flex-end",
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   productPrice: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "orange",
//   },
//   bottomContainer: {
//     flexDirection: "row",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     elevation: 20,
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   bottomLeft: {
//     flex: 1,
//   },
//   bottomRight: {
//     marginLeft: 10,
//   },
//   totalPrice: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "red",
//     marginLeft: 10,
//   },
// });

// export default connect(mapStateToProps)(Cart);

import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

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
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            {props.cartItems.map((data, index) => {
              return (
                <View style={styles.listItem} key={index}>
                  <View style={styles.left}>
                    <Image
                      style={styles.thumbnail}
                      source={{
                        uri: data.product.image
                          ? data.product.image
                          : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                      }}
                    />
                  </View>
                  <View style={styles.body}>
                    <View style={styles.bodyLeft}>
                      <Text style={styles.productName}>{data.product.name}</Text>
                    </View>
                    <View style={styles.bodyRight}>
                      <Text style={styles.productPrice}>$ {data.product.price}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomLeft}>
              <Text style={styles.totalPrice}>$ {total.toFixed(2)}</Text>
            </View>
            <View style={styles.bottomRight}>
              <Button title="Clear" color="red" />
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100, // Space for bottom container
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
});

export default connect(mapStateToProps)(Cart);