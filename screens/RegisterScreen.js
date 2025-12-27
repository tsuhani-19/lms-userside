import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Platform, StatusBar, ActivityIndicator, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerAPI } from '../services/api';
import { validateEmail, validatePassword } from '../utils/validation';
import { STORAGE_KEYS } from '../constants/config';

const { width, height } = Dimensions.get('window');

// RegisterScreen component

export default function RegisterScreen({ navigation }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : insets.top;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  // Validation and loading states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleRegister = async () => {
    console.log('🚀 Register button pressed');
    
    // Dismiss keyboard
    Keyboard.dismiss();
    
    // Clear previous errors
    setErrors({});
    setApiError('');
    
    // Validate inputs
    const validationErrors = {};
    
    if (!fullName || fullName.trim().length === 0) {
      validationErrors.fullName = t('register.fullNameRequired');
    }
    
    const emailError = validateEmail(email);
    if (emailError) {
      validationErrors.email = emailError;
    }
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      validationErrors.password = passwordError;
    }
    
    if (!confirmPassword) {
      validationErrors.confirmPassword = t('register.pleaseConfirmPassword');
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = t('register.passwordsDoNotMatch');
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
      // Call register API
      const data = await registerAPI(fullName, email, password, confirmPassword);
      
      console.log(' Registration successful, navigating to verify email');
      
      // Store email in AsyncStorage for verification screen
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({ email }));
      
      // Navigate to verify email screen after successful registration
      navigation.navigate('VerifyEmail');
      
      console.log(' Registration successful! User data:', data.user);
      
    } catch (error) {
      console.error(' Registration failed in catch block:', error);
      const errorMessage = error.message || 'An unexpected error occurred.';
      console.log(' Setting API error:', errorMessage);
      setApiError(errorMessage);
    } finally {
      console.log(' Registration process completed, stopping loading');
      setLoading(false);
    }
  };

  // Responsive sizing - adjusted for all screen sizes
  const inputHeight = Math.max(42, height * 0.052);
  const spacing = Math.max(6, height * 0.008);
  const buttonPadding = Math.max(10, height * 0.013);
  const headerHeight = Math.max(height * 0.09, 70);

  return (
    <View className="flex-1 bg-[#3E0288]">
      {/* Header */}
      <View 
        className="items-center justify-center px-5"
        style={{ 
          marginTop: statusBarHeight + (Platform.OS === 'ios' ? height * 0.05 : height * 0.02),
          height: headerHeight
        }}
      >
        <Text 
          numberOfLines={1} 
          adjustsFontSizeToFit 
          className="text-white text-center font-medium"
          style={{ fontSize: width * 0.09, maxWidth: '90%', marginBottom: 2, marginTop:20 }}
        >
          {t('register.getStarted')}
        </Text>
        <Text 
          numberOfLines={2} 
          adjustsFontSizeToFit 
          className="text-white text-center font-normal"
          style={{ fontSize: width * 0.028, maxWidth: '80%', lineHeight: width * 0.035, letterSpacing: 0.5 }}
        >
          {t('register.subtitle')}
        </Text>
      </View>

      <View 
        className="bg-white rounded-tl-[80px] rounded-tr-[80px] px-5 shadow-lg flex-1"
        style={{ marginTop: height * 0.075, paddingTop: height * 0.02 }}
      >
        <Text 
          className="text-center font-normal"
          style={{ fontSize: width * 0.065, lineHeight: width * 0.075, marginBottom: spacing * 2 }}
        >
          {t('register.signUp')}
        </Text>

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

        {/* Full Name Input */}
        <View className="relative" style={{ marginBottom: spacing * 1.8 }}>
          <Text className="text-[10px] font-semibold mb-1 text-[#1a1a1a]">
            {t('register.fullName')}
          </Text>
          <TextInput
            className={`border rounded-lg px-[15px] bg-[#F8F8F8] w-full ${
              errors.fullName ? 'border-red-500' : 'border-[#E0E0E0]'
            }`}
            style={{ height: inputHeight }}
            placeholder={t('register.enterFullName')}
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) {
                setErrors({ ...errors, fullName: '' });
              }
            }}
            editable={!loading}
          />
          {errors.fullName && (
            <Text className="text-red-500 text-xs mt-1">{errors.fullName}</Text>
          )}
        </View>

        {/* Email Input */}
        <View className="relative" style={{ marginBottom: spacing * 1.8 }}>
          <Text className="text-[10px] font-semibold mb-1 text-[#1a1a1a]">
            {t('register.emailAddress')}
          </Text>
          <View className="relative">
            <TextInput
              className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${
                errors.email ? 'border-red-500' : 'border-[#E0E0E0]'
              }`}
              style={{ height: inputHeight }}
              placeholder={t('register.enterEmail')}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: '' });
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

        {/* Password Input */}
        <View className="relative" style={{ marginBottom: spacing * 1.8 }}>
          <Text className="text-[10px] font-semibold mb-1 text-[#1a1a1a]">
            {t('register.password')}
          </Text>
          <View className="relative">
            <TextInput
              className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${
                errors.password ? 'border-red-500' : 'border-[#E0E0E0]'
              }`}
              style={{ height: inputHeight }}
              placeholder={t('register.createPassword')}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors({ ...errors, password: '' });
                }
                // Clear confirm password error if passwords now match
                if (errors.confirmPassword && text === confirmPassword) {
                  setErrors({ ...errors, confirmPassword: '' });
                }
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!loading}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)} 
              className="absolute right-[15px] top-0 bottom-0 justify-center items-center"
              style={{ width: 20 }}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View className="relative" style={{ marginBottom: spacing * 2 }}>
          <Text className="text-[10px] font-semibold mb-1 text-[#1a1a1a]">
            {t('register.confirmPassword')}
          </Text>
          <View className="relative">
            <TextInput
              className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${
                errors.confirmPassword ? 'border-red-500' : 'border-[#E0E0E0]'
              }`}
              style={{ height: inputHeight }}
              placeholder={t('register.confirmYourPassword')}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: '' });
                }
              }}
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
              editable={!loading}
            />
            <TouchableOpacity 
              onPress={() => setShowConfirm(!showConfirm)} 
              className="absolute right-[15px] top-0 bottom-0 justify-center items-center"
              style={{ width: 20 }}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Ionicons
                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Register Button */}
        <TouchableOpacity 
          className="bg-[#3E0288] rounded-xl items-center"
          style={{ 
            paddingVertical: buttonPadding, 
            marginBottom: spacing * 1.2,
            opacity: loading ? 0.7 : 1
          }}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text className="text-white font-bold text-base">{t('register.signUp')}</Text>
          )}
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center" style={{ marginBottom: spacing * 1.5, paddingVertical: 1 }}>
          <Text className="text-[#999] text-sm">{t('register.alreadyHaveAccount')} </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-[#3E0288] font-bold text-sm">{t('register.logIn')}</Text>
          </TouchableOpacity>
        </View>

        {/* OR Divider */}
        <View className="flex-row items-center" style={{ marginVertical: spacing * 1 }}>
          <View className="flex-1 h-[1px] bg-[#E0E0E0]" />
          <Text className="mx-2.5 text-[#999] text-xs">{t('register.or')}</Text>
          <View className="flex-1 h-[1px] bg-[#E0E0E0]" />
        </View>

        {/* Gmail Sign Up Button */}
        <TouchableOpacity 
          className="flex-row border border-[#E0E0E0] rounded-lg items-center justify-center bg-white"
          style={{ paddingVertical: buttonPadding * 0.8, marginBottom: spacing * 1 }}
        >
          <Ionicons name="mail" size={18} color="#EA4335" style={{ marginRight: 6 }} />
          <Text className="text-sm text-black">{t('register.signUpWithGmail')}</Text>
        </TouchableOpacity>

        {/* Apple Sign Up Button */}
        <TouchableOpacity 
          className="flex-row border border-[#E0E0E0] rounded-lg items-center justify-center bg-white"
          style={{ paddingVertical: buttonPadding * 0.8, marginBottom: spacing * 1 }}
        >
          <Ionicons name="logo-apple" size={18} color="#000" style={{ marginRight: 6 }} />
          <Text className="text-sm text-black">{t('register.signUpWithApple')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
