import { jwtDecode } from "jwt-decode"; // Changed this line
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    console.log("=== LOGIN ATTEMPT ===");
    console.log("User data:", user);
    
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => {
        console.log("Response status:", res.status);
        console.log("Response ok:", res.ok);
        return res.json();
    })
    .then((data) => {
        console.log("Response data:", data);
        console.log("Has token?", !!data.token);
        
        // Check if token exists in response
        if (data && data.token) {
            console.log("✅ Login successful, saving token");
            const token = data.token;
            AsyncStorage.setItem("jwt", token);
            const decoded = jwtDecode(token); // Changed this line
            console.log("Decoded token:", decoded);
            dispatch(setCurrentUser(decoded, user));
            
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Login Successful",
                text2: "Welcome back!"
            });
        } else {
            // No token in response - this means login failed
            console.log("❌ No token in response");
            console.log("Full response:", JSON.stringify(data));
            
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: data.message || "Please provide correct credentials",
                text2: ""
            });
            logoutUser(dispatch);
        }
    })
    .catch((err) => {
        console.log("❌ Login error (catch block):", err);
        console.log("Error details:", err.message);
        
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch);
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log("Get profile error:", err));
}

export const logoutUser = (dispatch) => {
    console.log("Logging out user");
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}));
}

export const setCurrentUser = (decoded, user) => {
    console.log("Setting current user:", decoded);
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}