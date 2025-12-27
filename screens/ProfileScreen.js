import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProfileScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation(); 

  const CARD_WIDTH = 420;
  const CARD_HEIGHT = 653;
  const CARD_TOP = 220;
  const CARD_RADIUS = 60;

  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;
  const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View
        style={{
          height: 260 * scaleHeight,
          paddingHorizontal: 20 * scaleWidth,
          paddingTop: 30 * scaleHeight,
          backgroundColor: '#3e0288', // solid purple background
          justifyContent: 'space-between',
        }}
      >
        {/* Top Row: Back Button and Icons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="arrow-back-outline" size={18} color="#fff" />
          </TouchableOpacity>

          {/* Top Icons */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationScreen')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title - Positioned at bottom of purple container */}
        <View style={{ marginBottom:120, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: headerFontSize,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            {t('profile.title')}
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleWidth,
              color: '#E5E7EB',
              marginTop: 4,
            }}
          >
            {t('profile.subtitle')}
          </Text>
        </View>
      </View>

      {/* White Card */}
      <View
        style={{
          position: 'absolute',
          top: CARD_TOP * scaleHeight,
          alignSelf: 'center',
          width: CARD_WIDTH * scaleWidth,
          height: CARD_HEIGHT * scaleHeight,
          backgroundColor: '#fff',
          borderTopLeftRadius: CARD_RADIUS * scaleWidth,
          borderTopRightRadius: CARD_RADIUS * scaleWidth,
          paddingHorizontal: 20 * scaleWidth,
          paddingTop: 40 * scaleHeight,
          overflow: 'hidden',
        }}
      >
        {/* Profile Image */}
        <View style={{ alignItems: 'center', marginBottom: 18 }}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={{
              width: 96 * scaleWidth,
              height: 96 * scaleWidth,
              borderRadius: 48 * scaleWidth,
              marginBottom: 12,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#EDE9FE',
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="camera-outline" size={14} color="#4B0082" />
            <Text
              style={{
                marginLeft: 6,
                color: '#4B0082',
                fontSize: 12,
                fontWeight: '500',
              }}
            >
              {t('profile.changePhoto')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <ProfileInput icon="person-outline" label={t('profile.fullName')} scale={scaleWidth} />
        <ProfileInput icon="mail-outline" label={t('profile.emailAddress')} scale={scaleWidth} />
        <ProfileInput icon="call-outline" label={t('profile.phoneNumber')} scale={scaleWidth} />
        <ProfileInput icon="briefcase-outline" label={t('profile.department')} scale={scaleWidth} />
        <ProfileInput icon="calendar-outline" label={t('profile.startDate')} scale={scaleWidth} />
      </View>
    </SafeAreaView>
  );
}

/* Reusable Input Component */
const ProfileInput = ({ icon, label, scale }) => {
  return (
    <View style={{ marginBottom: 18 * scale, alignItems: 'center' }}>
      <View style={{ width: 329 * scale }}>
        <Text
          style={{
            fontSize: 12 * scale,
            color: '#6B7280',
            marginBottom: 6,
            textAlign: 'left',
          }}
        >
          {label}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 329 * scale,
          height: 52 * scale,
          borderTopWidth: 1,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderLeftWidth: 1,
          borderColor: '#000000',
          borderRadius: 15 * scale,
          paddingHorizontal: 14 * scale,
          backgroundColor: '#fff',
        }}
      >
        <Ionicons name={icon} size={18 * scale} color="#3E0288" />
        <TextInput
          placeholder=""
          placeholderTextColor="transparent"
          style={{
            flex: 1,
            marginLeft: 10 * scale,
            fontSize: 14 * scale,
            color: '#111827',
          }}
        />
      </View>
    </View>
  );
};
