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

export default function UserProgressScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;

  const [branchName, setBranchName] = useState(t('common.marketing')); // default branch

  useEffect(() => {
    loadBranchData();
  }, [t]);

  const loadBranchData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (data) {
        const user = JSON.parse(data);
        // If department/branch exists in user data, use it; otherwise use translated default
        setBranchName(user.department || user.branch || t('common.marketing'));
      } else {
        setBranchName(t('common.marketing'));
      }
    } catch (e) {
      setBranchName(t('common.marketing'));
    }
  };

  // Sections data
  const sections = [
    { title: `${t('common.section')} 1`, status: 'done', score: 95, screen: 'PerformanceScreen' },
    { title: `${t('common.section')} 2`, status: 'in-progress', progress: 40, quizCompleted: '2/3', screen: 'PerformanceScreen' },
    { title: `${t('common.section')} 3`, status: 'locked', duration: '45 min', screen: null },
    { title: `${t('common.section')} 4`, status: 'locked', duration: '30 min', screen: null },
  ];

  const helloFontSize = Math.min(28, width * 0.07);

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7FB' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: statusBarHeight + 20,
          paddingBottom: insets.bottom + 80,
          paddingHorizontal: width * 0.05,
        }}
      >
        {/* 🔹 HEADER ICONS (slightly lower) */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 10,
            marginTop: 10, // Add spacing from top
          }}
        >
          <HeaderIcon icon="settings-outline" onPress={() => navigation.navigate('SettingsScreen')} />
          <HeaderIcon icon="notifications-outline" onPress={() => navigation.navigate('Notification')} />
        </View>

        {/* 🔹 BRANCH / DEPARTMENT NAME (LEFT ALIGNED) */}
        <View style={{ alignItems: 'flex-start', marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
            {branchName} {t('userProgress.department')}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 2 }}>
            {t('userProgress.viewOnboardingSections')}
          </Text>
        </View>

        {/* 🔹 SECTIONS LIST */}
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            disabled={section.status === 'locked'}
            onPress={() => section.screen && navigation.navigate(section.screen)}
            style={{
              backgroundColor: '#fff',
              borderRadius: 22,
              padding: 16,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {section.status === 'done' && <Ionicons name="checkmark-circle" size={26} color="#22C55E" />}
                {section.status === 'in-progress' && <Ionicons name="time" size={26} color="#FACC15" />}
                {section.status === 'locked' && <Ionicons name="lock-closed" size={24} color="#9CA3AF" />}

                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>
                    {section.title}
                  </Text>

                  {section.status === 'done' && (
                    <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
                      {t('userProgress.score')}: <Text style={{ fontWeight: '700' }}>{section.score}/100</Text>
                    </Text>
                  )}

                  {section.status === 'in-progress' && (
                    <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
                      {t('userProgress.quiz')}: {section.quizCompleted}
                    </Text>
                  )}
                </View>
              </View>

              <Ionicons
                name={section.status === 'locked' ? 'lock-closed' : 'chevron-forward'}
                size={22}
                color={section.status === 'locked' ? '#9CA3AF' : '#3E0288'}
              />
            </View>

            {section.status === 'locked' && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Ionicons name="lock-closed-outline" size={14} color="#9CA3AF" />
                <Text style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 4 }}>
                  {t('userProgress.completePreviousToUnlock')}
                </Text>
              </View>
            )}

            {section.status === 'in-progress' && (
              <View style={{ marginTop: 12 }}>
                <View style={{ height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, width: '100%' }}>
                  <View
                    style={{
                      width: `${section.progress}%`,
                      height: 6,
                      backgroundColor: '#FACC15',
                      borderRadius: 3,
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(233, 206, 28, 0.15)',
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginTop: 12,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() => section.screen && navigation.navigate(section.screen)}
                >
                  <Ionicons name="play" size={16} color="#E9c513" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#E9c513', fontWeight: '600' }}>{t('userProgress.continueLearning')}</Text>
                </TouchableOpacity>
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

const HeaderIcon = ({ icon, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: 40,
      height: 40,
      marginLeft: 8,
      borderRadius: 12,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10, // ↓ Lower the icons slightly
    }}
  >
    <Ionicons name={icon} size={20} color="#3E0288" />
  </TouchableOpacity>
);
