import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavUser';

const { width, height } = Dimensions.get('window');

export default function UserProgressScreen() {
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

  // Reduce top margin for header
  const headerTopMargin = 30; 
  const headerLeftMargin = 20;
  const titleFontSize = Math.min(30, width * 0.078); 
  const titleLineHeight = Math.min(36, width * 0.093); 
  const subtitleFontSize = Math.min(16, width * 0.041);
  const subtitleLineHeight = Math.min(20, width * 0.052);

  const cardWidth = Math.min(353, width * 0.93);
  const cardHeight = Math.max(118, height * 0.145);
  const cardBorderRadius = Math.max(23, width * 0.06);

  const moduleWidth = Math.min(354, width * 0.93);
  const moduleHeight = Math.max(125, height * 0.153);
  const moduleTitleFontSize = Math.max(18, width * 0.047);
  const moduleTitleLineHeight = Math.max(19, width * 0.05);
  const moduleSubtitleFontSize = Math.max(14, width * 0.037);
  const moduleSubtitleLineHeight = Math.max(16, width * 0.042);

  const modules = [
    { title: "Company", progress: 50, locked: false },
    { title: "Company 2", progress: 30, locked: false },
    { title: "Company 3", progress: 0, locked: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: headerLeftMargin,
          paddingTop: headerTopMargin,
          paddingBottom: 100, // space for bottom nav
        }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-start mb-3">
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '600',
                fontSize: titleFontSize,
                lineHeight: titleLineHeight,
                color: '#000000',
                marginBottom: 4,
              }}
            >
              Your Progress
            </Text>
            <Text
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '400',
                fontSize: subtitleFontSize,
                lineHeight: subtitleLineHeight,
                color: '#6B7280',
              }}
            >
              Track your onboarding completion
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity 
              style={{ width: 40, height: 40, marginRight: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#E5E7EB' }}
            >
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#E5E7EB' }}
            >
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Card */}
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
          <Text style={{ fontSize: 22, fontWeight: '600', color: 'white', marginBottom: 6 }}>
            Overall Completion
          </Text>
          <Text style={{ fontSize: 13, color: 'white', marginBottom: 6 }}>
            2 of 5 sections completed
          </Text>
          <View style={{ width: '100%', height: 8, backgroundColor: '#999999', borderRadius: 4 }}>
            <View style={{ width: '50%', height: 8, backgroundColor: '#fff', borderRadius: 4 }} />
          </View>
        </View>

        {/* Modules */}
        <Text style={{ fontSize: 20, fontWeight: '400', color: '#000000', marginBottom: 12 }}>
          Training Modules
        </Text>

        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            disabled={module.locked}
            style={{
              width: moduleWidth,
              height: moduleHeight,
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: moduleTitleFontSize, lineHeight: moduleTitleLineHeight, fontWeight: '400', color: '#000', flex: 1 }}>
                {module.title}
              </Text>
              <Ionicons
                name={module.locked ? 'lock-closed-outline' : 'arrow-forward-outline'}
                size={20}
                color={module.locked ? '#999999' : '#3E0288'}
              />
            </View>
            <Text style={{ fontSize: moduleSubtitleFontSize, lineHeight: moduleSubtitleLineHeight, color: '#9CA3AF', marginTop: 8 }}>
              Score
            </Text>
            <View style={{ width: '100%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginTop: 8 }}>
              <View style={{ width: `${module.progress || 0}%`, height: 8, backgroundColor: '#3E0288', borderRadius: 4 }} />
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Bottom Navigation */}
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
