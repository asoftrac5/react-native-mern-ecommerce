import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Use Expo vector icons
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";

import CartIcon from "../Shared/CartIcon";

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                tabBarShowLabel: false,
                // tabBarActiveTintColor: '#e91363',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            }}
        >
            <Tab.Screen 
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome 
                            name="home"
                            style={{ position: "relative" }}
                            color={ color }
                            size={ 30 }
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <FontAwesome 
                            name="shopping-cart"
                            style={{ position: "relative" }}
                            color={ color }
                            size={ 30 }
                            />
                            <CartIcon />
                        </View>
                    )
                }}
            />
            <Tab.Screen 
                name="Admin"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome 
                            name="cog"
                            style={{ position: "relative" }}
                            color={ color }
                            size={ 30 }
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome 
                            name="user"
                            style={{ position: "relative" }}
                            color={ color }
                            size={ 30 }
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main;