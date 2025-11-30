import React, { useReducer, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Changed this line
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthReducer from "../Reducers/Auth.reducer";
import { setCurrentUser } from "../Actions/Auth.actions";
import AuthGlobal from "./AuthGlobal";

const Auth = props => {
    const [stateUser, dispatch] = useReducer(AuthReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        
        // Check if user is already logged in
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem("jwt");
                if (token) {
                    const decoded = jwtDecode(token); // Changed this line
                    dispatch(setCurrentUser(decoded));
                }
            } catch (error) {
                console.log("Error reading token:", error);
            }
        };
        
        checkAuth();
        
        return () => setShowChild(false);
    }, []);

    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        );
    }
};

export default Auth;