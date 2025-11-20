import { Platform } from "react-native";

let baseURL = '';

if (Platform.OS === 'android') {
  baseURL = 'http://10.0.2.2:3000/api/v1/';
} else {
  baseURL = 'http://localhost:3000/api/v1/';
}

export default baseURL;