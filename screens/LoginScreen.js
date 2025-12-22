
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StatusBar, Dimensions, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail, validatePhone, validatePassword } from '../utils/validation';
import { loginAPI } from '../services/api';
import { STORAGE_KEYS } from '../constants/config';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : insets.top;
  const [activeTab, setActiveTab] = useState('Email'); // Email or Phone
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation and loading states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    console.log('🚀 Login button pressed');
    
    // Dismiss keyboard
    Keyboard.dismiss();
    
    // Clear previous errors and messages
    setErrors({});
    setApiError('');
    setSuccessMessage('');
    
    // Validate inputs
    const validationErrors = {};
    
    if (activeTab === 'Email') {
      const emailError = validateEmail(email);
      if (emailError) {
        console.log(' Email validation failed:', emailError);
        validationErrors.email = emailError;
      }
    } else {
      const phoneError = validatePhone(phone);
      if (phoneError) {
        console.log(' Phone validation failed:', phoneError);
        validationErrors.phone = phoneError;
      }
    }
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      console.log(' Password validation failed:', passwordError);
      validationErrors.password = passwordError;
    }
    
    // If validation fails, show errors and return
    if (Object.keys(validationErrors).length > 0) {
      console.log(' Validation failed, showing errors:', validationErrors);
      setErrors(validationErrors);
      return;
    }
    
    console.log(' Validation passed, calling API...');
    
    // Start loading
    setLoading(true);
    
    try {
      // Call login API
      const data = await loginAPI(
        activeTab === 'Email' ? email : phone,
        password
      );
      
      // Check if email verification is required
      if (data.requiresVerification) {
        console.log(' Email verification required, navigating to verify email screen');
        
        // Store email in AsyncStorage for verification screen
        const userEmail = activeTab === 'Email' ? email : phone;
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({ email: userEmail }));
        
        // Show success message
        setSuccessMessage(data.message || "Please verify your email. OTP has been sent to your email address.");
        setApiError(''); // Clear any errors
        
        // Navigate to verify email screen after a short delay
        setTimeout(() => {
          navigation.navigate('VerifyEmail');
        }, 1500);
        return;
      }
      
      console.log(' API call successful, storing tokens...');
      
      // Store tokens and user data
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
      
      console.log(' Tokens stored, navigating to home screen');
      
      // Navigate to home screen after successful login
      navigation.navigate('UserHome');
      
      console.log(' Login successful! User data:', data.user);
      
    } catch (error) {
      console.error(' Login failed in catch block:', error);
      const errorMessage = error.message || 'An unexpected error occurred.';
      console.log(' Setting API error:', errorMessage);
      setApiError(errorMessage);
    } finally {
      console.log(' Login process completed, stopping loading');
      setLoading(false);
    }
  };

  // Responsive sizing
  const inputHeight = Math.max(45, height * 0.055);
  const spacing = Math.max(10, height * 0.012);
  const buttonPadding = Math.max(12, height * 0.015);

  return (
    <View className="flex-1 bg-[#3E0288]">
      {/* Header */}
      <View 
        className="items-center justify-center px-5"
        style={{ 
          marginTop: statusBarHeight + (Platform.OS === 'ios' ? height * 0.08 : height * 0.04),
          height: height * 0.12
        }}
      >
        <Text 
          numberOfLines={1} 
          adjustsFontSizeToFit 
          className="text-white text-center font-medium"
          style={{ fontSize: width * 0.09, maxWidth: '90%', marginBottom: 4 }}
        >
          Welcome Back
        </Text>
        <Text 
          numberOfLines={2} 
          adjustsFontSizeToFit 
          className="text-white text-center font-medium"
          style={{ fontSize: width * 0.028, maxWidth: '80%', lineHeight: width * 0.035,letterSpacing: 0.5}}
        >
          It's great to see you again. Let's pick up where we left off!
        </Text>
      </View>

      {/* Card Container - Non-scrollable */}
      <View 
        className="bg-white rounded-tl-[80px] rounded-tr-[80px] px-5 pt-5 shadow-lg flex-1"
        style={{ marginTop: height * 0.05 }}
      >
        <Text 
          className="text-center font-normal"
          style={{ fontSize: width * 0.065, lineHeight: width * 0.075, marginBottom: spacing * 3 }}
        >
          Log In
        </Text>

        {/* Success Message Banner */}
        {successMessage && (
          <View 
            className="bg-red-50 border border-red-200 rounded-lg p-3"
            style={{ marginBottom: spacing * 2 }}
          >
            <View className="flex-row items-center">
              <Ionicons name="warning-outline" size={20} color="red" />
              <Text className="text-red-600 text-sm ml-2 flex-1">{successMessage}</Text>
            </View>
          </View>
        )}

        {/* API Error Banner */}
        {apiError && (
          <View 
            className="bg-red-50 border border-red-200 rounded-lg p-3"
            style={{ marginBottom: spacing * 2 }}
          >
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={20} color="#DC2626" />
              <Text className="text-red-600 text-sm ml-2 flex-1">{apiError}</Text>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View className="flex-row" style={{ marginBottom: spacing * 3 }}>
          <TouchableOpacity
            className="flex-1 items-center border-b-2"
            style={{ 
              borderBottomColor: activeTab === 'Email' ? '#3E0288' : 'transparent',
              paddingVertical: spacing 
            }}
            onPress={() => {
              setActiveTab('Email');
              setErrors({});
              setApiError('');
              setSuccessMessage('');
            }}
          >
            <Text 
              className="text-base"
              style={{ 
                color: activeTab === 'Email' ? '#3E0288' : 'gray',
                fontWeight: activeTab === 'Email' ? 'bold' : 'normal'
              }}
            >
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 items-center border-b-2"
            style={{ 
              borderBottomColor: activeTab === 'Phone' ? '#3E0288' : 'transparent',
              paddingVertical: spacing 
            }}
            onPress={() => {
              setActiveTab('Phone');
              setErrors({});
              setApiError('');
              setSuccessMessage('');
            }}
          >
            <Text 
              className="text-base"
              style={{ 
                color: activeTab === 'Phone' ? '#3E0288' : 'gray',
                fontWeight: activeTab === 'Phone' ? 'bold' : 'normal'
              }}
            >
              Phone
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email/Phone Input */}
        {activeTab === 'Email' ? (
          <View className="relative" style={{ marginBottom: spacing * 2.2 }}>
            <Text className="text-[10px] font-semibold mb-1.5 text-[#1a1a1a]">
              Email Address
            </Text>
            <View className="relative">
              <TextInput
                className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${
                  errors.email ? 'border-red-500' : 'border-[#E0E0E0]'
                }`}
                style={{ height: inputHeight }}
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  // Clear error and success message on input change
                  if (errors.email) {
                    setErrors({ ...errors, email: '' });
                  }
                  if (successMessage) {
                    setSuccessMessage('');
                  }
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
              <View className="absolute right-[15px] top-0 bottom-0 justify-center items-center" style={{ width: 20 }}>
                <Ionicons name="mail-outline" size={18} color="gray" />
              </View>
            </View>
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
            )}
          </View>
        ) : (
          <View className="relative" style={{ marginBottom: spacing * 2.2 }}>
            <Text className="text-[10px] font-semibold mb-1.5 text-[#1a1a1a]">
              Phone Number
            </Text>
            <View className="relative">
              <TextInput
                className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${
                  errors.phone ? 'border-red-500' : 'border-[#E0E0E0]'
                }`}
                style={{ height: inputHeight }}
                placeholder="Enter your phone"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  // Clear error and success message on input change
                  if (errors.phone) {
                    setErrors({ ...errors, phone: '' });
                  }
                  if (successMessage) {
                    setSuccessMessage('');
                  }
                }}
                keyboardType="phone-pad"
                editable={!loading}
              />
              <View className="absolute right-[15px] top-0 bottom-0 justify-center items-center" style={{ width: 20 }}>
                <Ionicons name="call-outline" size={18} color="gray" />
              </View>
            </View>
            {errors.phone && (
              <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text>
            )}
          </View>
        )}

        {/* Password Input */}
        <View className="relative" style={{ marginBottom: spacing * 2.2 }}>
          <Text className="text-[10px] font-semibold mb-1.5 text-[#1a1a1a]">
            Password
          </Text>
          <View className="relative">
            <TextInput
              className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${
                errors.password ? 'border-red-500' : 'border-[#E0E0E0]'
              }`}
              style={{ height: inputHeight }}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                // Clear error and success message on input change
                if (errors.password) {
                  setErrors({ ...errors, password: '' });
                }
                if (successMessage) {
                  setSuccessMessage('');
                }
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!loading}
            />
            <TouchableOpacity 
              className="absolute right-[15px] top-0 bottom-0 justify-center items-center"
              style={{ width: 20 }}
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="gray" />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
          )}
        </View>

        {/* Remember Me and Forgot Password */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing * 4.5 }}>
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => setRemember(!remember)}
            activeOpacity={0.7}
          >
            <View 
              className="w-5 h-5 border-2 rounded items-center justify-center"
              style={{ 
                borderColor: remember ? '#3E0288' : '#E0E0E0',
                backgroundColor: remember ? '#3E0288' : '#fff'
              }}
            >
              {remember && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text className="ml-2 text-sm">Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('ForgetPassword')}
            activeOpacity={0.7}
          >
            <Text 
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '400',
                fontSize: 13,
                lineHeight: 23,
                letterSpacing: 0,
                textAlign: 'center',
                color: '#3E0288',
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity 
          className="bg-[#3E0288] rounded-xl items-center"
          style={{ 
            backgroundColor: '#3E0288',
            paddingVertical: buttonPadding, 
            marginBottom: spacing * 1.2,
            opacity: loading ? 0.7 : 1
          }}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text className="text-white font-bold text-base">Log in</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center">
          <Text className="text-[#999] text-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-[#3E0288] font-bold text-sm">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
