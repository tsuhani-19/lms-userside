import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavUser';

const { width, height } = Dimensions.get('window');


export default function UserHomeScreen() {
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
        console.log('Loaded user data:', user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };
 
  const headerTopMargin = Math.max(82, height * 0.1);
  const headerLeftMargin = Math.max(20, width * 0.05);
  const titleFontSize = Math.min(30, width * 0.078); 
  const titleLineHeight = Math.min(36, width * 0.093); 
  const subtitleFontSize = Math.min(16, width * 0.041);
  const subtitleLineHeight = Math.min(20, width * 0.052);
  const subtitleMaxWidth = Math.min(280, width * 0.74); 
  
 
  const cardWidth = Math.min(353, width * 0.93);
  const cardHeight = Math.max(118, height * 0.145);
  const cardTopMargin = Math.max(168, height * 0.205);
  const cardLeftMargin = Math.max(17, width * 0.045);
  const cardBorderRadius = Math.max(23, width * 0.06);
  

  const planTextTop = Math.max(310, height * 0.38);
  const planTextLeft = Math.max(23, width * 0.061);
  const planTextFontSize = Math.max(16, width * 0.042);
  const planTextLineHeight = Math.max(19, width * 0.05);
  
  // Module card styling
  const moduleWidth = Math.min(354, width * 0.93);
  const moduleHeight = Math.max(125, height * 0.153);
  const moduleTop = Math.max(337, height * 0.41);
  const moduleLeft = Math.max(19, width * 0.05);
  
  // Module title text styling
  const moduleTitleWidth = Math.min(317, width * 0.84);
  const moduleTitleHeight = Math.max(38, height * 0.047);
  const moduleTitleTop = Math.max(352, height * 0.43);
  const moduleTitleLeft = Math.max(34, width * 0.09);
  const moduleTitleFontSize = Math.max(18, width * 0.047);
  const moduleTitleLineHeight = Math.max(19, width * 0.05);
  
  // Module subtitle text styling
  const moduleSubtitleFontSize = Math.max(14, width * 0.037);
  const moduleSubtitleLineHeight = Math.max(16, width * 0.042);
  

  const navWidth = Math.min(265, width * 0.7);
  const navHeight = Math.max(60, height * 0.073);
  const navBorderRadius = Math.max(244, width * 0.64); // Very rounded
  const navLeftMargin = Math.max(64, width * 0.17);
 
  const modules = [
    { title: "Company Vision & Mission", progress: 50, locked: false },
    { title: "Company Culture & Values", progress: 30, locked: false },
    { title: "Company Rules & Policy", progress: 0, locked: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: headerLeftMargin,
          paddingTop: headerTopMargin 
        }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-start mb-6">
          <View style={{ flex: 1, maxWidth: subtitleMaxWidth, marginRight: 8 }}>
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              allowFontScaling={true}
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '600',
                fontSize: titleFontSize,
                lineHeight: titleLineHeight,
                letterSpacing: 0,
                color: '#000000',
                marginBottom: 8,
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
                letterSpacing: 0,
                color: '#6B7280',
                textAlignVertical: 'center',
              }}
            >
              Complete all sections to finish your onboarding process
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

        {/* Main Progress Card with Black Border */}
        <View 
          style={{
            width: cardWidth + 7,
            height: cardHeight + 7,
            marginTop: 5, 
            marginLeft: cardLeftMargin - headerLeftMargin,
            marginBottom: 24,
            borderRadius: cardBorderRadius + 2,
            borderTopWidth: 2,
            borderRightWidth: 6,
            borderBottomWidth: 6,
            borderLeftWidth: 2,
            borderColor: '#000000',
            backgroundColor: '#3E0288',
            overflow: 'hidden',
            padding: 16,
            justifyContent: 'space-between',
          }}
        >
          <Text 
            className="text-white font-semibold"
            style={{ fontSize: 16, marginBottom: 8 }}
          >
            You have completed 1 of 5 modules.
          </Text>
          <View>
            <View className="w-full h-2 rounded-full bg-[#999999]">
              <View
                className="h-2 rounded-full bg-white"
                style={{ width: '30%' }}
              />
            </View>
            <View className="w-full flex-row justify-between">
              <Text className="text-[#E2E3E3] text-xs mt-2">Progress</Text>
              <Text className="text-[#E2E3E3] mt-2 text-right text-xs">30%</Text>
            </View>
          </View>
        </View>

        {/* Onboarding Plan Title */}
        <Text
          style={{
            fontFamily: 'SF Compact Rounded',
            fontWeight: '400',
            fontSize: planTextFontSize,
            lineHeight: planTextLineHeight,
            letterSpacing: 0,
            color: '#686D76',
            marginLeft: planTextLeft - headerLeftMargin,
            marginBottom: 16,
          }}
        >
          Your Onboarding Plan
        </Text>

        {/* Onboarding Modules */}
        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            disabled={module.locked}
            style={{
              width: moduleWidth,
              height: moduleHeight,
              marginLeft: moduleLeft - headerLeftMargin,
              marginBottom: 16,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              justifyContent: 'space-between',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View className="flex-row justify-between items-center">
              <Text 
                numberOfLines={2}
                style={{ 
                  fontFamily: 'SF Compact Rounded',
                  fontWeight: '400',
                  fontSize: moduleTitleFontSize,
                  lineHeight: moduleTitleLineHeight,
                  letterSpacing: 0,
                  color: '#000000',
                  flex: 1,
                  textAlignVertical: 'center',
                  maxWidth: moduleTitleWidth * 0.85, // Leave room for icon
                }}
              >
                {module.title}
              </Text>
              <Ionicons
                name={module.locked ? 'lock-closed-outline' : 'arrow-forward-outline'}
                size={20}
                color={module.locked ? '#999999' : '#3E0288'}
              />
            </View>
            <Text 
              numberOfLines={2}
              style={{ 
                fontFamily: 'SF Compact Rounded',
                fontWeight: '400',
                fontSize: moduleSubtitleFontSize,
                lineHeight: moduleSubtitleLineHeight,
                letterSpacing: 0,
                color: '#9CA3AF',
                textAlignVertical: 'center',
                marginTop: 8,
                marginBottom: 12,
              }}
            >
              Watch the video and complete the quiz to continue
            </Text>
            <View>
              <View className="w-full h-2 bg-gray-200 rounded-full">
                <View
                  className="h-2 rounded-full bg-[#3E0288]"
                  style={{ width: `${module.progress}%` }}
                />
              </View>
              {module.locked && (
                <Text className="text-gray-400 text-xs" style={{ marginTop: 4 }}>
                  Locked
                </Text>
              )}
              {!module.locked && (
               <View className="w-full flex-row justify-between mt-1">
               <Text className="text-[#3E0288] text-xs">Progress</Text>
               <Text className="text-[#3E0288] text-xs">{module.progress}%</Text>
             </View>
             
             
              )}
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flex: 1 }}>
      <Text>Home Screen Content</Text>
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
