import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
    return(
        <SafeAreaView style={styles.header}>
            <Image
                source={require('../../assets/logo2.jpg')}
                resizeMode="contain"
                style={{ height: 100 }}
            />                
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    header: { 
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10, // Todo: Delete
    }
})

export default Header;