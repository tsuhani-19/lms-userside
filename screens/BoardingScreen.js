import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavUser';

const { width, height } = Dimensions.get('window');

export default function UserHomeScreen() {
  const navigation = useNavigation(); // Initialize navigation
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserData(user);
        const fullName = user.fullName || user.name || user.firstName || 'User';
        const firstName = fullName.split(' ')[0] || 'User';
        setUserName(firstName);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const titleFontSize = Math.min(30, width * 0.078); 
  const titleLineHeight = Math.min(36, width * 0.093); 
  const subtitleFontSize = Math.min(16, width * 0.041);
  const subtitleLineHeight = Math.min(20, width * 0.052);
  const cardWidth = Math.min(353, width * 0.93);
  const cardHeight = Math.max(118, height * 0.145);
  const cardBorderRadius = Math.max(23, width * 0.06);

  const modules = [
    { title: "Company Vision & Mission", progress: 50, locked: false, screen: 'BoardingScreen' },
    { title: "Company Culture & Values", progress: 30, locked: false, screen: null },
    { title: "Company Rules & Policy", progress: 0, locked: true, screen: null },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 120, // Space for bottom nav
        }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-start mb-4 ">
          <View style={{ flex: 1, marginRight: 9 }}>
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '600',
                fontSize: titleFontSize,
                lineHeight: titleLineHeight,
                color: '#000000',
                marginBottom: 6,
              
              }}
            >
              Our Vision,
            </Text>
            <Text
              numberOfLines={4}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '400',
                fontSize: subtitleFontSize,
                lineHeight: subtitleLineHeight,
                color: '#6B7280',
              }}
            >
              Complete the vedio to unlock the quiz
            </Text>
          </View>
          <View className="flex-row" style={{ flexShrink: 0 }}>
            <TouchableOpacity 
              className="mr-3 p-2 rounded-full bg-gray-200"
              style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="p-2 rounded-full bg-gray-200"
              style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Progress Card */}
        <View 
          style={{
            width: cardWidth,
            height: cardHeight,
            marginBottom: 20,
            borderRadius: cardBorderRadius,
            borderWidth: 2,
            borderColor: '#000000',
            backgroundColor: '#3E0288',
            padding: 16,
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '600', marginBottom: 8 }}>
            You have completed 1 of 5 modules.
          </Text>
          <View style={{ width: '100%', height: 8, backgroundColor: '#999999', borderRadius: 4 }}>
            <View style={{ width: '30%', height: 8, backgroundColor: '#fff', borderRadius: 4 }} />
          </View>
        </View>

        <Text style={{ fontFamily: 'SF Compact Rounded', fontWeight: '400', fontSize: 16, color: '#686D76', marginBottom: 16 }}>
          Your Onboarding Plan
        </Text>

        {/* Modules */}
        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            disabled={module.locked}
            onPress={() => {
              if (module.screen) {
                navigation.navigate(module.screen);
              }
            }}
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              justifyContent: 'space-between',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '400', color: '#000', flex: 1 }}>
                {module.title}
              </Text>
              <Ionicons
                name={module.locked ? 'lock-closed-outline' : 'arrow-forward-outline'}
                size={20}
                color={module.locked ? '#999999' : '#3E0288'}
              />
            </View>
            <Text style={{ fontSize: 14, color: '#9CA3AF', marginTop: 8 }}>
              Watch the video and complete the quiz to continue
            </Text>
            <View style={{ width: '100%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginTop: 8 }}>
              <View style={{ width: `${module.progress}%`, height: 8, backgroundColor: '#3E0288', borderRadius: 4 }} />
            </View>
            {module.locked && (
              <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>Locked</Text>
            )}
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Bottom Navigation fixed */}
      <View style={{ position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' }}>
        <BottomNav
          navLeftMargin={20}
          navWidth={360}
          navHeight={60}
          navBorderRadius={30}
        />
      </View>
    </SafeAreaView>
  );
}
