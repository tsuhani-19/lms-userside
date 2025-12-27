import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import BottomNav from '../components/BottomNavigation';

const { width } = Dimensions.get('window');

export default function UserProgressScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const headerTopMargin = 50;
  const headerLeftMargin = 22;

  const cardWidth = 353;
  const cardHeight = 89;
  const cardBorderRadius = 23;

  // Quiz data
  const quizScore = 95;
  const totalScore = 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: width * 0.05,
          paddingTop: headerTopMargin,
          paddingBottom: insets.bottom + 80,
        }}
      >

        {/* HEADER */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#E5E7EB',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="arrow-back-outline" size={20} color="#3E0288" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={{
                width: 40,
                height: 40,
                marginRight: 8,
                borderRadius: 12,
                backgroundColor: '#E5E7EB',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#E5E7EB',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        {/* TITLE */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>{t('performance.performanceSummary')}</Text>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>
            {t('performance.subtitle')}
          </Text>
        </View>

        {/* PURPLE CARD */}
        <View
          style={{
            width: cardWidth,
            height: cardHeight,
            marginBottom: 20,
            borderRadius: cardBorderRadius,
            borderWidth: 3,
            borderColor: '#000',
            backgroundColor: '#3E0288',
            padding: 14,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: '500', color: 'white' }}>
            {t('performance.visionMissionCompleted')}
          </Text>
          <Text style={{ fontSize: 14, color: '#D1D5DB' }}>
            {t('performance.completedOn')} Nov 24, 2025
          </Text>
        </View>

        {/* VIDEO ACTIVITY CARD */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            elevation: 3,
            borderWidth: 1,
            borderColor: '#F3F4F6',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            {t('performance.videoActivity')}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="play-circle-outline" size={18} color="#6B7280" />
              <Text style={{ marginLeft: 6, fontSize: 14 }}>{t('performance.quizVideo')}</Text>
            </View>

            <View
              style={{
                backgroundColor: '#DCFCE7',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
              }}
            >
              <Text style={{ fontSize: 12, color: '#16A34A', fontWeight: '600' }}>
                {t('performance.completed')}
              </Text>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 10 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>{t('performance.lastWatched')}</Text>
            <Text style={{ fontSize: 13 }}>Nov 24, 2025</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>{t('performance.totalVideos')}</Text>
            <Text style={{ fontSize: 13 }}>1 {t('performance.video')}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>{t('performance.duration')}</Text>
            <Text style={{ fontSize: 13 }}>30 mins</Text>
          </View>
        </View>

        {/* QUIZ RESULT CARD */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            elevation: 3,
            borderWidth: 1,
            borderColor: '#F3F4F6',
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            {t('performance.quizResult')}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>{t('performance.finalScore')}</Text>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>{t('performance.passingScore')}</Text>
            </View>

            <Text style={{ fontSize: 20, fontWeight: '700', color: '#16A34A' }}>
              {quizScore}/{totalScore}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>{t('performance.attemptUsed')}</Text>
              <Text style={{ fontSize: 14 }}>2/3</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>{t('performance.status')}</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#16A34A' }}>
                {t('performance.passed')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#F4F4F5',
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 16,
            }}
          >
            <Text style={{ fontWeight: '600', color: '#3E0288' }}>
              {t('performance.retakeQuiz')}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
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
    </SafeAreaView>
  );
}
