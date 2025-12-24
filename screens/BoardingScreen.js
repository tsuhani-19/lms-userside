import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavigation';

const { width, height } = Dimensions.get('window');

export default function UserHomeScreen() {
  const navigation = useNavigation();
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
  const titleLineHeight = Math.min(30, width * 0.093); 
  const subtitleFontSize = Math.min(16, width * 0.041);
  const subtitleLineHeight = Math.min(20, width * 0.052);
  const containerWidth = 353;
  const containerHeight = 391;
  const containerBorderRadius = 23;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView 
        contentContainerStyle={{ 
          paddingHorizontal: 22,
          paddingTop: 40,
          paddingBottom: 120,
          alignItems: 'center',
        }}
      >
        {/* Top Row: Back Arrow and Icons */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          width: '100%', 
          marginBottom: 16 
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#3E0288" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity 
              style={{ width: 40, height: 40, marginRight: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#E5E7EB' }}
            >
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: '#E5E7EB' }}
            >
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header Text below the top row */}
        <View style={{ width: '100%', marginBottom: 16 }}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            style={{
              fontFamily: 'SF Compact Rounded',
              fontWeight: '600',
              fontSize: titleFontSize,
              fontStyle:"Semibold",
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
            Complete the vedio to unlock quiz.
          </Text>
        </View>

        {/* Main Purple Container */}
        <View
          style={{
            width: containerWidth,
            height: containerHeight,
            borderRadius: containerBorderRadius,
            borderWidth: 2,
            borderColor: '#000000',
            backgroundColor: '#3E0288',
            padding: 20,
            marginBottom: 20,
          }}
        >
        </View>

        {/* Take Quiz Button below purple container */}
        <TouchableOpacity
          onPress={() => navigation.navigate('QuizScreen')}
          style={{
            width: 287,
            height: 45,
            backgroundColor: '#3E0288',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'SF Compact Rounded',
              fontWeight: '500',
              fontSize: 16,
              lineHeight: 23,
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            Take Quiz
          </Text>
        </TouchableOpacity>

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
