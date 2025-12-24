import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavigation';

const { width, height } = Dimensions.get('window');

export default function UserHomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

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
  const titleLineHeight = Math.min(23, width * 0.093);
  const subtitleFontSize = Math.min(16, width * 0.041);
  const subtitleLineHeight = Math.min(19, width * 0.052);
  const cardWidth = Math.min(353, width * 0.93);
  const cardHeight = Math.max(118, height * 0.145);
  const cardBorderRadius = Math.max(23, width * 0.06);

  const modules = [
    { title: 'Company Vision & Mission', progress: 50, locked: false, screen: 'BoardingScreen' },
    { title: 'Company Culture & Values', progress: 30, locked: false, screen: null },
    { title: 'Company Rules & Policy', progress: 0, locked: true, screen: null },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Header & Scroll */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: statusBarHeight + 55, 
          paddingBottom: insets.bottom + 150,
        }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-start mb-6">
          <View style={{ flex: 1, marginRight: 8 }}>
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
                marginBottom: 8,
                fontStyle: 'semibold',
              }}
            >
              Hello {userName},
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
              Complete all sections to finish your onboarding process
            </Text>
          </View>

          <View className="flex-row">
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
            marginBottom: 24,
            borderRadius: cardBorderRadius,
            borderWidth: 3,
            borderColor: '#000000',
            backgroundColor: '#3E0288',
            padding: 16,
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>
            You have completed 1 of 5 modules.
          </Text>

          <View
            style={{
              width: '100%',
              height: 8,
              backgroundColor: '#999999',
              borderRadius: 4,
              marginTop: 16,
            }}
          >
            <View
              style={{
                width: '30%',
                height: 8,
                backgroundColor: '#fff',
                borderRadius: 4,
              }}
            />
          </View>

          <View
            style={{
              marginTop: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: 'white', fontWeight: '400' }}>
              Progress
            </Text>
            <Text style={{ fontSize: 12, color: 'white', fontWeight: '400' }}>
              50%
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontFamily: 'SF Compact Rounded',
            fontSize: 16,
            color: '#686D76',
            marginBottom: 16,
            fontWeight: 400,
          }}
        >
          Your Onboarding Plan
        </Text>

        {/* Modules */}
        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            disabled={module.locked}
            onPress={() => module.screen && navigation.navigate(module.screen)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text style={{ fontSize: 18, color: '#000', flex: 1, fontWeight: 400 }}>
                {module.title}
              </Text>
              <Ionicons
                name={module.locked ? 'lock-closed-outline' : 'arrow-forward-outline'}
                size={20}
                color={module.locked ? '#9CA3AF' : '#3E0288'}
              />
            </View>

            <Text style={{ fontSize: 14, color: '#9CA3AF', marginTop: 8, fontWeight: 400 }}>
              Watch the video and complete the quiz to continue
            </Text>

            <View
              style={{
                width: '100%',
                height: 8,
                backgroundColor: '#E5E7EB',
                borderRadius: 4,
                marginTop: 8,
              }}
            >
              <View
                style={{
                  width: `${module.progress}%`,
                  height: 8,
                  backgroundColor: '#3E0288',
                  borderRadius: 4,
                }}
              />
            </View>

            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 12, color: '#3E0288', fontWeight: '400' }}>Progress</Text>
              <Text style={{ fontSize: 12, color: '#3E0288', fontWeight: '400' }}>{module.progress}%</Text>
            </View>

            {module.locked && (
              <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>Locked</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={{
          position: 'absolute',
          bottom: insets.bottom + 10,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <BottomNav navLeftMargin={20} navWidth={360} navHeight={60} navBorderRadius={30} />
      </View>
    </View>
  );
}
