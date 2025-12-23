import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StatusBar, Dimensions, ActivityIndicator, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : insets.top;
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('Email'); // Email or Phone
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss();
    setErrors({});
    setSuccessMessage('');

    // Simple validation
    const validationErrors = {};
    if (activeTab === 'Email' && !email) validationErrors.email = 'Email is required';
    if (activeTab === 'Phone' && !phone) validationErrors.phone = 'Phone is required';
    if (!password) validationErrors.password = 'Password is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate login loading & success
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Login successful! Navigating...');
      setTimeout(() => {
        navigation.navigate('UserHome'); // Simulate navigation
      }, 1000);
    }, 1500);
  };

  // Responsive sizing
  const inputHeight = Math.max(45, height * 0.055);
  const spacing = Math.max(10, height * 0.012);
  const buttonPadding = Math.max(12, height * 0.015);

  return (
    <View className="flex-1 bg-[#3E0288]">
      {/* Header */}
      <View className="items-center justify-center px-5"
        style={{ marginTop: statusBarHeight + (Platform.OS === 'ios' ? height * 0.08 : height * 0.04), height: height * 0.12 }}>
        <Text numberOfLines={1} adjustsFontSizeToFit className="text-white text-center font-medium"
          style={{ fontSize: width * 0.09, maxWidth: '90%', marginBottom: 4 }}>
          Welcome Back
        </Text>
        <Text numberOfLines={2} adjustsFontSizeToFit className="text-white text-center font-medium"
          style={{ fontSize: width * 0.028, maxWidth: '80%', lineHeight: width * 0.035, letterSpacing: 0.5 }}>
          It's great to see you again. Let's pick up where we left off!
        </Text>
      </View>

      {/* Card Container */}
      <View className="bg-white rounded-tl-[80px] rounded-tr-[80px] px-5 pt-5 shadow-lg flex-1"
        style={{ marginTop: height * 0.05 }}>
        <Text className="text-center font-normal" style={{ fontSize: width * 0.065, lineHeight: width * 0.075, marginBottom: spacing * 3 }}>
          Log In
        </Text>

        {/* Success Message */}
        {successMessage ? (
          <View className="bg-green-50 border border-green-200 rounded-lg p-3" style={{ marginBottom: spacing * 2 }}>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle-outline" size={20} color="green" />
              <Text className="text-green-600 text-sm ml-2 flex-1">{successMessage}</Text>
            </View>
          </View>
        ) : null}

        {/* Tabs */}
        <View className="flex-row" style={{ marginBottom: spacing * 3 }}>
          <TouchableOpacity className="flex-1 items-center border-b-2"
            style={{ borderBottomColor: activeTab === 'Email' ? '#3E0288' : 'transparent', paddingVertical: spacing }}
            onPress={() => { setActiveTab('Email'); setErrors({}); setSuccessMessage(''); }}>
            <Text style={{ color: activeTab === 'Email' ? '#3E0288' : 'gray', fontWeight: activeTab === 'Email' ? 'bold' : 'normal' }}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center border-b-2"
            style={{ borderBottomColor: activeTab === 'Phone' ? '#3E0288' : 'transparent', paddingVertical: spacing }}
            onPress={() => { setActiveTab('Phone'); setErrors({}); setSuccessMessage(''); }}>
            <Text style={{ color: activeTab === 'Phone' ? '#3E0288' : 'gray', fontWeight: activeTab === 'Phone' ? 'bold' : 'normal' }}>Phone</Text>
          </TouchableOpacity>
        </View>

        {/* Email / Phone Input */}
        {activeTab === 'Email' ? (
          <View className="relative" style={{ marginBottom: spacing * 2.2 }}>
            <Text className="text-[10px] font-semibold mb-1.5 text-[#1a1a1a]">Email Address</Text>
            <TextInput
              className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${errors.email ? 'border-red-500' : 'border-[#E0E0E0]'}`}
              style={{ height: inputHeight }}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
          </View>
        ) : (
          <View className="relative" style={{ marginBottom: spacing * 2.2 }}>
            <Text className="text-[10px] font-semibold mb-1.5 text-[#1a1a1a]">Phone Number</Text>
            <TextInput
              className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${errors.phone ? 'border-red-500' : 'border-[#E0E0E0]'}`}
              style={{ height: inputHeight }}
              placeholder="Enter your phone"
              value={phone}
              onChangeText={setPhone}
            />
            {errors.phone && <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text>}
          </View>
        )}

        {/* Password Input */}
        <View className="relative" style={{ marginBottom: spacing * 2.2 }}>
          <Text className="text-[10px] font-semibold mb-1.5 text-[#1a1a1a]">Password</Text>
          <TextInput
            className={`border rounded-lg px-[15px] pr-[45px] bg-[#F8F8F8] w-full ${errors.password ? 'border-red-500' : 'border-[#E0E0E0]'}`}
            style={{ height: inputHeight }}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}
            className="absolute right-[15px] top-0 bottom-0 justify-center items-center"
            style={{ width: 20 }}
          >
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="gray" />
          </TouchableOpacity>
          {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>}
        </View>

        {/* Remember & Forgot Password */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing * 4.5 }}>
          <TouchableOpacity className="flex-row items-center" onPress={() => setRemember(!remember)}>
            <View className="w-5 h-5 border-2 rounded items-center justify-center"
              style={{ borderColor: remember ? '#3E0288' : '#E0E0E0', backgroundColor: remember ? '#3E0288' : '#fff' }}>
              {remember && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text className="ml-2 text-sm">Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={{ fontFamily: 'SF Compact Rounded', fontWeight: '400', fontSize: 13, lineHeight: 23, color: '#3E0288' }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity className="bg-[#3E0288] rounded-xl items-center"
          style={{ backgroundColor: '#3E0288', paddingVertical: buttonPadding, marginBottom: spacing * 1.2, opacity: loading ? 0.7 : 1 }}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text className="text-white font-bold text-base">Log in</Text>}
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
