import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavigation';

const { width } = Dimensions.get('window');

export default function UserHomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || 0
      : insets.top;

  const [userName, setUserName] = useState(t('common.user'));

  useEffect(() => {
    loadUserData();
  }, [t]);

  const loadUserData = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (data) {
      const user = JSON.parse(data);
      const name =
        user.fullName || user.name || user.firstName || t('common.user');
      setUserName(name.split(' ')[0]);
    } else {
      setUserName(t('common.user'));
    }
  };

  const modules = [
    {
      title: `${t('common.section')} 1`,
      locked: false,
      screen: 'TopicScreen',
    },
    {
      title: `${t('common.section')} 2`,
      locked: false,
      screen: null,
    },
    {
      title: `${t('common.section')} 3`,
      locked: true,
      screen: null,
    },
  ];

  // Relative font sizes for responsiveness
  const helloFontSize = Math.min(28, width * 0.07);

  return (
    <View className="flex-1 bg-[#F7F7FB]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: statusBarHeight + width * 0.05,
          paddingBottom: insets.bottom + width * 0.15,
          paddingHorizontal: width * 0.05,
        }}
      >
        {/* 🔹 HEADER */}
        <View
          className="flex-row justify-between items-start mb-8"
          style={{ marginTop: 25 }} // <-- pushes entire header slightly lower
        >
          <View className="flex-1 pr-3">
            {/* Hello + Username with space */}
            <View className="flex-row flex-wrap items-center">
              <Text
                style={{
                  fontSize: helloFontSize,
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: helloFontSize * 1.2,
                  marginRight: 6, // space between Hello and Username
                }}
              >
                {t('userHome.hello')}
              </Text>
              <Text
                style={{
                  fontSize: helloFontSize,
                  fontWeight: '600',
                  color: '#000',
                  lineHeight: helloFontSize * 1.2,
                }}
              >
                {userName}
              </Text>
            </View>

            <Text
              className="text-gray-500 text-[15px] mt-2 leading-5"
              numberOfLines={2}
            >
              {t('userHome.welcomeMessage')}
            </Text>
          </View>

          <View className="flex-row">
            {/* Settings Icon navigates to SettingsScreen */}
            <HeaderIcon
              icon="settings-outline"
              onPress={() => navigation.navigate('SettingsScreen')}
            />
            {/* Notification Icon navigates to NotificationScreen */}
            <HeaderIcon
              icon="notifications-outline"
              onPress={() => navigation.navigate('Notification')}
            />
          </View>
        </View>

        {/* 🔹 ONBOARDING ENTRY CARD */}
        <View
          className="bg-[#3E0288] rounded-[28px] p-6 mb-8 shadow-xl"
          style={{ width: '100%' }}
        >
          <Ionicons name="sparkles-outline" size={28} color="white" />

          <Text className="text-white text-[18px] font-semibold mt-4">
            {t('userHome.startOnboardingJourney')}
          </Text>

          <Text className="text-white/80 text-sm mt-2 leading-5">
            {t('userHome.learnCompanyCulture')}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('BoardingScreen')}
            className="mt-5 bg-white rounded-full py-3 items-center"
          >
            <Text className="text-[#3E0288] font-semibold">{t('common.continue')}</Text>
          </TouchableOpacity>
        </View>

        {/* 🔹 SECTION TITLE */}
        <Text className="text-gray-500 text-base mb-4">
          {t('userHome.yourOnboardingPlan')}
        </Text>

        {/* 🔹 MODULE LIST */}
        {modules.map((module, index) => (
          <TouchableOpacity
            key={index}
            disabled={module.locked}
            onPress={() =>
              module.screen && navigation.navigate(module.screen)
            }
            className="bg-white rounded-[22px] p-5 mb-4 shadow-md w-full"
          >
            <View className="flex-row justify-between items-center">
              <Text
                className="text-[17px] font-medium text-gray-900 flex-1 flex-shrink"
              >
                {module.title}
              </Text>

              <Ionicons
                name={module.locked ? 'lock-closed' : 'chevron-forward'}
                size={22}
                color={module.locked ? '#9CA3AF' : '#3E0288'}
              />
            </View>

            <Text className="text-sm text-gray-400 mt-2">
              {t('userHome.tapToExplore')}
            </Text>

            {module.locked && (
              <View className="flex-row items-center mt-3">
                <Ionicons
                  name="lock-closed-outline"
                  size={14}
                  color="#9CA3AF"
                />
                <Text className="text-xs text-gray-400 ml-2">
                  {t('userHome.completePreviousToUnlock')}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 🔻 BOTTOM NAV */}
      <View
        style={{
          position: 'absolute',
          bottom: insets.bottom + 10,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <BottomNav
          navLeftMargin={width * 0.05}
          navWidth={width * 0.9}
          navHeight={60}
          navBorderRadius={30}
        />
      </View>
    </View>
  );
}

/* 🔹 HEADER ICON */
const HeaderIcon = ({ icon, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="w-10 h-10 ml-2 bg-gray-200 rounded-xl items-center justify-center"
  >
    <Ionicons name={icon} size={20} color="#3E0288" />
  </TouchableOpacity>
);
