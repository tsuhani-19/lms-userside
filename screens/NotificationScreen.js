import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { useTranslation } from 'react-i18next';

const RNView = styled(View);
const RNText = styled(Text);
const RNTouchableOpacity = styled(TouchableOpacity);
const RNSafeAreaView = styled(SafeAreaView);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scaleWidth = SCREEN_WIDTH / 414;
const scaleHeight = SCREEN_HEIGHT / 896;
const headerFontSize = Math.min(28, SCREEN_WIDTH * 0.07);

// exact design base sizes
const CARD_WIDTH = 353;
const CARD_HEIGHT = 125;

export default function NotificationScreen({ navigation }) {
  const { t } = useTranslation();
  
  const notifications = [
    {
      id: '1',
      title: t('notifications.quizCompletedSuccessfully'),
      description: t('notifications.quizCompletedDescription'),
      time: `30 ${t('notifications.minsAgo')}`,
      type: 'success',
    },
    {
      id: '2',
      title: t('notifications.quizReminder'),
      description: t('notifications.quizReminderDescription'),
      time: `10 ${t('notifications.minsAgo')}`,
      type: 'warning',
    },
    {
      id: '3',
      title: t('notifications.nextModuleLocked'),
      description: t('notifications.nextModuleLockedDescription'),
      time: `5 ${t('notifications.minsAgo')}`,
      type: 'lock',
    },
  ];

  const renderItem = ({ item }) => <NotificationCard item={item} />;

  return (
    <RNSafeAreaView className="flex-1 bg-white">
      {/* Header: Back on left, Settings + Notification on right */}
      <RNView
        className="flex-row justify-between items-center"
        style={{
            paddingTop: 20,
          marginTop: 20,
          marginBottom: 20,
          paddingHorizontal: 20 * scaleWidth,
        }}
      >
        {/* Left: Back */}
        <RNTouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: '#E5E7EB',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="arrow-back-outline" size={18} color="#000" />
        </RNTouchableOpacity>

        {/* Right: Settings + Notification */}
        <RNView className="flex-row items-center">
          <RNTouchableOpacity
            onPress={() => navigation.navigate('SettingsScreen')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#F3F4F6',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
            }}
          >
            <Ionicons name="settings-outline" size={20} color="#000" />
          </RNTouchableOpacity>

          <RNTouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#F3F4F6',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
            }}
          >
            <Ionicons name="notifications-outline" size={20} color="#000" />
          </RNTouchableOpacity>
        </RNView>
      </RNView>

      {/* Screen Title + Mark All Read */}
      <RNView
        style={{
          paddingHorizontal: 20 * scaleWidth,
          marginBottom: 16,
        }}
      >
        <RNText
          className="text-[#111827]"
          style={{
            fontSize: headerFontSize,
            fontWeight: '600',
          }}
        >
          {t('notifications.title')}
        </RNText>

        <RNTouchableOpacity>
          <RNText
            className="text-[#4C1D95]"
            style={{
              marginTop: 4 * scaleHeight,
              fontSize: 12 * scaleWidth,
              fontWeight: '500',
            }}
          >
            {t('notifications.markAllRead')}
          </RNText>
        </RNTouchableOpacity>
      </RNView>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: 16 * scaleHeight,
          paddingHorizontal: 0,
          alignItems: 'center',
          paddingBottom: 40 * scaleHeight,
        }}
        showsVerticalScrollIndicator={false}
      />
    </RNSafeAreaView>
  );
}

const NotificationCard = ({ item }) => {
  const w = CARD_WIDTH * scaleWidth;
  const h = CARD_HEIGHT * scaleHeight;

  const iconName =
    item.type === 'success'
      ? 'checkmark-circle'
      : item.type === 'warning'
      ? 'alert-circle'
      : 'lock-closed';

  const iconColor =
    item.type === 'success'
      ? '#22C55E'
      : item.type === 'warning'
      ? '#FACC15'
      : '#F97373';

  return (
    <RNView
      className="bg-white justify-between"
      style={{
        width: w,
        height: h,
        borderRadius: 10,
        borderColor: '#000000',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 12 * scaleHeight,
      }}
    >
      {/* title + icon */}
      <RNView className="flex-row items-center justify-between">
        <RNText
          className="text-[#111827]"
          numberOfLines={1}
          style={{ fontSize: 14, fontWeight: '400', marginRight: 8, flex: 1 }}
        >
          {item.title}
        </RNText>
        <Ionicons name={iconName} size={18} color={iconColor} />
      </RNView>

      {/* description */}
      <RNText
        className="text-[#4B5563]"
        numberOfLines={2}
        style={{ fontSize: 12, fontWeight: '400' }}
      >
        {item.description}
      </RNText>

      {/* separator line */}
      <RNView
        className="bg-black self-stretch"
        style={{
          marginTop: 8,
          marginBottom: 2,
          height: StyleSheet.hairlineWidth,
        }}
      />

      {/* time */}
      <RNText
        className="text-[#9CA3AF]"
        style={{ fontSize: 10, marginTop: 0 }}
      >
        {item.time}
      </RNText>
    </RNView>
  );
};
