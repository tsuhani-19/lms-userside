import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import { verifyEmailAPI, resendOTPAPI } from '../services/api';

export default function VerifyEmailScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const loadUserEmail = async () => {
      try {
        const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        if (userDataString) {
          const user = JSON.parse(userDataString);
          if (user.email) setEmail(user.email);
        }
      } catch (error) {
        console.error("Error loading user email:", error);
      }
    };
    loadUserEmail();
  }, []);

  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleVerifyEmail = async () => {
    if (!otp || otp.length !== 6) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await verifyEmailAPI(email, otp);

      if (data.accessToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      }
      if (data.refreshToken) {
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      }
      if (data.user) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
      }

      setSuccessMessage("Registered Successfully!");

      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);

    } catch (error) {
      // ✅ INVALID OTP HANDLING
      setOtp(""); // clears input
      setErrorMessage(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setResendLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await resendOTPAPI(email);
      setResendTimer(60);
      setCanResend(false);
    } catch (error) {
      setErrorMessage(error.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#3E0288]">

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ position: "absolute", top: 70, left: 26, width: 22, height: 22, zIndex: 10 }}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={22} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={{ position: "absolute", top: 117, left: 27, fontSize: 24, color: "#FFFFFF" }}>
        Verify Your Email
      </Text>

      {/* Subtitle */}
      <Text style={{ position: "absolute", top: 159, left: 27, width: 343, fontSize: 12, color: "#E8E8E8" }}>
        One Time Password has been sent on {email}
      </Text>

      {/* OTP Input */}
      <View style={{
        position: "absolute",
        top: 240,
        left: 25,
        width: 331,
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D8B4FE",
        borderRadius: 12,
        paddingHorizontal: 16,
      }}>
        <TextInput
          value={otp}
          onChangeText={(text) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))}
          placeholder="Enter OTP received in your email"
          placeholderTextColor="#C4B5FD"
          style={{ flex: 1, color: "white", fontSize: 12 }}
          keyboardType="number-pad"
          maxLength={6}
          editable={!loading}
        />
      </View>

      {/* Bottom Section */}
      <View style={{ position: "absolute", top: 400, left: 0, right: 0, alignItems: "center" }}>

        {/* Verify Button */}
        <TouchableOpacity
          style={{
            width: 287,
            height: 45,
            backgroundColor: loading ? "#9CA3AF" : "white",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={handleVerifyEmail}
          disabled={loading || otp.length !== 6}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#3E0288" size="small" />
          ) : (
            <Text style={{ color: "#3E0288", fontWeight: "600", fontSize: 16 }}>
              Verify Email
            </Text>
          )}
        </TouchableOpacity>

        {/* ❌ ERROR MESSAGE */}
        {errorMessage ? (
          <View style={{
            width: 300,
            backgroundColor: "#FEE2E2",
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
            alignItems: "center",
          }}>
            <Text style={{ color: "#B91C1C", fontWeight: "600", fontSize: 13 }}>
              {errorMessage}
            </Text>
          </View>
        ) : null}


        {successMessage ? (
          <View style={{
            width: 300,
            backgroundColor: "#FFFFFF",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            alignItems: "center",
          }}>
            <Text style={{ color: "green", fontWeight: "600", fontSize: 14 }}>
              {successMessage}
            </Text>
          </View>
        ) : null}

        {/* Resend OTP */}
        <View style={{
          width: 310,
          height: 20,
          top: -10,
          left: 21,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 40,
        }}>
          {canResend ? (
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={resendLoading}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 12, color: "#FFFFFF", textDecorationLine: "underline" }}>
                {resendLoading ? "Sending..." : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ fontSize: 12, color: "#E8E8E8" }}>
              Resend OTP in {resendTimer} seconds
            </Text>
          )}
        </View>

      </View>
    </View>
  );
}
