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

  const [selectedOption, setSelectedOption] = useState(null);   // selected index
  const [submitted, setSubmitted] = useState(false);            // has user submitted

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

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const primaryColor = '#3E0288';
  const primaryLight = '#5C28A3'; // light shade for BOTH submit button AND submitted selection

  const handleSubmit = () => {
    if (submitted) return;
    if (selectedOption === null) {
      return;
    }
    setSubmitted(true);
    console.log('Answer submitted, option index:', selectedOption);
  };

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
            <Ionicons name="arrow-back-outline" size={24} color={primaryColor} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SettingsScreen')}
              style={{
                width: 40,
                height: 40,
                marginRight: 8,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: '#E5E7EB',
              }}
            >
              <Ionicons name="settings-outline" size={20} color={primaryColor} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: '#E5E7EB',
              }}
            >
              <Ionicons name="notifications-outline" size={20} color={primaryColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header Text below the top row */}
        <View style={{ width: '100%', marginBottom: 45 }}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            style={{
              fontFamily: 'SF Compact Rounded',
              fontWeight: '600',
              fontSize: titleFontSize,
              fontStyle: 'Semibold',
              lineHeight: titleLineHeight,
              color: '#000000',
              marginBottom: 6,
            }}
          >
            Question Round,
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
            Question 1 of 3
          </Text>
        </View>

        {/* Quiz Container */}
        <View
          style={{
            width: 365,
            height: 104,
            borderRadius: 23,
            borderTopWidth: 2,
            borderRightWidth: 5,
            borderBottomWidth: 5,
            borderLeftWidth: 2,
            borderColor: '#000', 
            backgroundColor: primaryColor,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'SF Compact Rounded',
              fontWeight: '400',
              fontSize: 20,
              color: '#FFFFFF',
            }}
          >
            What is the primary goal of our company vision ?
          </Text>
        </View>

        {/* Options Containers */}
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isSubmittedSelected = submitted && isSelected;

          // Background color: light shade when submitted AND selected
          const optionBgColor = isSubmittedSelected ? primaryLight : '#FFFFFF';
          const textColor = isSubmittedSelected ? '#FFFFFF' : '#000000';
          const circleFillColor = isSelected ? primaryColor : 'transparent';
          const circleBorderColor = primaryColor;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => {
                if (!submitted) {  // disable selection after submit
                  setSelectedOption(index);
                  setSubmitted(false);
                }
              }}
              style={{
                width: 353,
                height: 49,
                borderRadius: 15,
                borderTopWidth: 1,
                borderRightWidth: 5,
                borderBottomWidth: 5,
                borderLeftWidth: 1,
                borderColor: '#000',
                backgroundColor: optionBgColor,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginBottom: 12,
              }}
            >
              {/* small circle icon */}
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  borderWidth: 2,
                  borderColor: circleBorderColor,
                  marginRight: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: circleFillColor,
                }}
              />

              <Text
                style={{
                  fontFamily: 'SF Compact Rounded',
                  fontWeight: '500',
                  fontSize: 16,
                  color: textColor,
                  textAlign: 'left',
                  flex: 1,
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Submit Answer Button */}
        <TouchableOpacity
          style={{
            width: 287,
            height: 45,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: primaryLight, // SAME light shade as submitted selection
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{
              fontFamily: 'SF Compact Rounded',
              fontWeight: '500',
              fontSize: 16,
              color: '#FFFFFF',
            }}
          >
            Submit Answer
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
