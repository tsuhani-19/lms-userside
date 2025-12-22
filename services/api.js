import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../constants/config';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * User Login API
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} API response with tokens and user data
 */
export const loginAPI = async (email, password) => {
  try {
    console.log(' Attempting login:');
   
    
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    
   
    return response.data;
  } catch (error) {
    console.log(' Login error:', error);
    
    if (error.response) {
     
      console.log(' Server error response:', error.response.data);
    
      throw {
        message: error.response.data.message || 'Login failed',
        status: error.response.status,
      };
    } else if (error.request) {
      // Network error - no response received
      console.log('Network error - request made but no response:', error.request);
      throw {
        message: 'Cannot reach server. Make sure backend is running on ' + API_BASE_URL,
        status: 0,
      };
    } else {
      // Other errors
      console.log(' Unexpected error:', error.message);
      throw {
        message: 'An unexpected error occurred: ' + error.message,
        status: -1,
      };
    }
  }
};

/**
 * User Registration API
 * @param {string} fullName - User full name
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} confirmPassword - Confirm password
 * @returns {Promise} API response with tokens and user data
 */
export const registerAPI = async (fullName, email, password, confirmPassword) => {
  try {
    const response = await apiClient.post('/auth/register', {
      fullName,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
    
      throw {
        message: error.response.data.message || 'Registration failed',
        status: error.response.status,
      };
    } else if (error.request) {
      // Network error
      throw {
        message: 'Network error. Please check your internet connection.',
        status: 0,
      };
    } else {
      // Other errors
      throw {
        message: 'An unexpected error occurred. Please try again.',
        status: -1,
      };
    }
  }
};

/**
 * Verify Email OTP API
 * @param {string} email - User email
 * @param {string} otp - OTP code
 * @returns {Promise} API response with tokens and user data
 */
export const verifyEmailAPI = async (email, otp) => {
  try {
    const response = await apiClient.post('/auth/verify-email', {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        message: error.response.data.message || 'Email verification failed',
        status: error.response.status,
      };
    } else if (error.request) {
      throw {
        message: 'Network error. Please check your internet connection.',
        status: 0,
      };
    } else {
      throw {
        message: 'An unexpected error occurred. Please try again.',
        status: -1,
      };
    }
  }
};

/**
 * Resend OTP API
 * @param {string} email - User email
 * @returns {Promise} API response
 */
export const resendOTPAPI = async (email) => {
  try {
    const response = await apiClient.post('/auth/resend-otp', {
      email,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        message: error.response.data.message || 'Failed to resend OTP',
        status: error.response.status,
      };
    } else if (error.request) {
      throw {
        message: 'Network error. Please check your internet connection.',
        status: 0,
      };
    } else {
      throw {
        message: 'An unexpected error occurred. Please try again.',
        status: -1,
      };
    }
  }
};

/**
 * Admin Login API
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise} API response with tokens and admin data
 */
export const adminLoginAPI = async (email, password) => {
  try {
    const response = await apiClient.post('/admin/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw {
        message: error.response.data.message || 'Admin login failed',
        status: error.response.status,
      };
    } else if (error.request) {
      // Network error
      throw {
        message: 'Network error. Please check your internet connection.',
        status: 0,
      };
    } else {
      // Other errors
      throw {
        message: 'An unexpected error occurred. Please try again.',
        status: -1,
      };
    }
  }
};
