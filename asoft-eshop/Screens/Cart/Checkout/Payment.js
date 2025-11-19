import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const selectCard = (cardName) => {
    setCard(cardName);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose your payment method</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Payment Methods List */}
        {methods.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.listItem}
              onPress={() => setSelected(item.value)}
              activeOpacity={0.7}
            >
              <View style={styles.left}>
                <Text style={styles.methodText}>{item.name}</Text>
              </View>
              <View style={styles.right}>
                <View
                  style={[
                    styles.radioOuter,
                    selected === item.value && styles.radioOuterSelected,
                  ]}
                >
                  {selected === item.value && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Card Picker - Shows only when Card Payment is selected */}
        {selected === 3 ? (
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => {
                // console.log("Card picker button pressed");
                setModalVisible(true);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[styles.pickerText, !card && styles.placeholderText]}
              >
                {card || "Select a card"}
              </Text>
              <Icon name="chevron-down" size={16} color="#007aff" />
            </TouchableOpacity>

            {/* Card Selection Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // console.log("Modal close requested");
                setModalVisible(false);
              }}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Select Card Type</Text>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Icon name="times" size={24} color="#333" />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={paymentCards}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.cardItem}
                        onPress={() => selectCard(item.name)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.cardText}>{item.name}</Text>
                        {card === item.name && (
                          <Icon name="check" size={16} color="#007aff" />
                        )}
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>
          </View>
        ) : null}

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm"
            onPress={() => props.navigation.navigate("Confirm", { order })}
            color="#007aff"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007aff",
    padding: 15,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  left: {
    flex: 1,
  },
  methodText: {
    fontSize: 16,
    color: "#333",
  },
  right: {
    marginLeft: 10,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#007aff",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007aff",
  },
  pickerContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  pickerButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "orange",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pickerText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "60%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 60,
    alignSelf: "center",
    width: "80%",
  },
});

export default Payment;