import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, FlatList, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { connect } from "react-redux";

const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setOrderItems(props.cartItems)

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            zip,
        }

        props.navigation.navigate("Payment", { order: order })
    }

    const selectCountry = (countryName) => {
        setCountry(countryName);
        setModalVisible(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FormContainer title={"Shipping Address"}>
                    <Input
                        placeholder={"Phone"}
                        name={"phone"}
                        value={phone}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setPhone(text)}
                    />
                    <Input
                        placeholder={"Shipping Address 1"}
                        name={"ShippingAddress1"}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <Input
                        placeholder={"Shipping Address 2"}
                        name={"ShippingAddress2"}
                        value={address2}
                        onChangeText={(text) => setAddress2(text)}
                    />
                    <Input
                        placeholder={"City"}
                        name={"City"}
                        value={city}
                        onChangeText={(text) => setCity(text)}
                    />
                    <Input
                        placeholder={"Zip Code"}
                        name={"zip"}
                        value={zip}
                        keyboardType={"numeric"}
                        onChangeText={(text) => setZip(text)}
                    />
                    
                    {/* Custom Country Picker */}
                    <TouchableOpacity 
                        style={styles.pickerButton}
                        onPress={() => {
                            // console.log("Picker button pressed");
                            setModalVisible(true);
                        }}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.pickerText, !country && styles.placeholderText]}>
                            {country || "Select your country"}
                        </Text>
                        <Icon name="chevron-down" size={16} color="#007aff" />
                    </TouchableOpacity>

                    {/* Country Selection Modal */}
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
                                    <Text style={styles.modalTitle}>Select Country</Text>
                                    <TouchableOpacity 
                                        onPress={() => setModalVisible(false)}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    >
                                        <Icon name="times" size={24} color="#333" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={countries}
                                    keyExtractor={(item) => item.code}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.countryItem}
                                            onPress={() => selectCountry(item.name)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.countryText}>{item.name}</Text>
                                            {country === item.name && (
                                                <Icon name="check" size={16} color="#007aff" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={() => checkOut()} color="#007aff" />
                    </View>
                </FormContainer>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    pickerButton: {
        width: '80%',
        height: 60,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 15,
        borderWidth: 2,
        borderColor: 'orange',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerText: {
        fontSize: 16,
        color: '#333',
    },
    placeholderText: {
        color: '#999',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    countryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    countryText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        width: '80%',
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
    }
});

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

export default connect(mapStateToProps)(Checkout);


// Connect in LinkedIn and try to text them now and then
// Every 7 days. 
// Can I give an interview preps
// 

// 