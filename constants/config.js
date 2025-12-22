import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Get base URL from config
// Priority: app.json extra config > platform-specific defaults
const configUrl = 
  Constants.expoConfig?.extra?.API_BASE_URL ||
  Constants.manifest?.extra?.API_BASE_URL ||
  Constants.manifest2?.extra?.expoConfig?.extra?.API_BASE_URL;

// Your computer's IP address (update if it changes)
const COMPUTER_IP = '192.168.1.59';
const platformDefault = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000/api'  // Android emulator
  : Platform.OS === 'web'
  ? 'http://localhost:5000/api'  // Web browser
  : `http://${COMPUTER_IP}:5000/api`; // iOS simulator or physical device

export const API_BASE_URL = configUrl || platformDefault;



export const API_TIMEOUT = 10000;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
};
