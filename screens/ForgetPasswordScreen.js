import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ForgotPasswordScreen component
export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1 bg-[#3E0288]">

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          position: "absolute",
          top: 70,
          left: 26,
          width: 22,
          height: 22,
          zIndex: 10,
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={22} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={{
          position: "absolute",
          top: 117,
          left: 27,
          fontSize: 24,
          color: "#FFFFFF",
        }}
      >
        Forgot Password
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          position: "absolute",
          top: 159,
          left: 27,
          width: 343,
          fontSize: 12,
          color: "#E8E8E8",
        }}
      >
        Enter your email address and we'll send you instructions to reset your
        password
      </Text>

      {/* Email Label */}
      <Text
        style={{
          position: "absolute",
          top: 220,

          left: 27,
          fontSize: 12,
          color: "#DADADA",
        }}
      >
        Email Address
      </Text>

      {/* Email Input */}
      <View
        style={{
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
        }}
      >
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
          placeholderTextColor="#C4B5FD"
          style={{ flex: 1, color: "white" }}
        />
        <Ionicons name="mail-outline" size={20} color="#E9D5FF" />
      </View>

      {/* Bottom Section */}
      <View
        style={{
          position: "absolute",
          top: 400, // ⬅️ INCREASED space from email box
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >

        {/* Send Reset Link Button */}
        <TouchableOpacity
          style={{
            width: 287,
            height: 45,
            backgroundColor: "white",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15, // ⬅️ more space
          }}
          activeOpacity={0.8}
        >
          <Text className="text-purple-800 font-semibold text-base">
            Send Reset Link
          </Text>
        </TouchableOpacity>

        {/* Remember Password */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 40, // ⬅️ more space before security
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#E8E8E8",
              marginRight: 4,
            }}
          >
            Remember your password?
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#FFFFFF",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Security Info */}
        <View style={{ alignItems: "center" }}>
          <Ionicons
            name="lock-closed-outline"
            size={22} // ⬅️ slightly larger
            color="#FFFFFF"
          />
          <Text
            style={{
              fontSize: 12,
              color: "#DADADA",
              marginTop: 10, // ⬅️ more space under icon
            }}
          >
            Your security is important to us
          </Text>
        </View>

      </View>

    </View>
  );
}
