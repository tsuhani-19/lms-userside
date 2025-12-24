import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { StyleSheet } from 'react-native';


const RNView = styled(View);
const RNText = styled(Text);
const RNTouchableOpacity = styled(TouchableOpacity);
const RNSafeAreaView = styled(SafeAreaView);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scaleWidth = SCREEN_WIDTH / 414;
const scaleHeight = SCREEN_HEIGHT / 896;

// exact design base sizes
const CARD_WIDTH = 353;
const CARD_HEIGHT = 125;

const notifications = [
  {
    id: '1',
    title: 'Quiz Completed Successfully',
    description:
      'You have passed the quiz and can now proceed to the next module.',
    time: '30 mins ago',
    type: 'success',
  },
  {
    id: '2',
    title: 'Quiz Reminder',
    description:
      'Please complete the pending quiz to stay on track with your training schedule.',
    time: '10 mins ago',
    type: 'warning',
  },
  {
    id: '3',
    title: 'Next Module Locked',
    description:
      'Complete the current quiz to unlock the next training module.',
    time: '5 mins ago',
    type: 'lock',
  },
];

export default function NotificationScreen({ navigation }) {
  const renderItem = ({ item }) => <NotificationCard item={item} />;

  return (
    <RNSafeAreaView className="flex-1 bg-white">
      {/* top bar */}
      <RNView
        className="flex-row items-center justify-between"
        style={{
          marginTop: 40 * scaleHeight,
          paddingHorizontal: 20 * scaleWidth,
        }}
      >
        <RNTouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </RNTouchableOpacity>

        <RNView className="flex-row items-center">
          <RNTouchableOpacity
            style={{ marginRight: 16 * scaleWidth }}
            className="justify-center items-center"
          >
            <Ionicons name="settings-outline" size={22} color="#000" />
          </RNTouchableOpacity>

          <RNView
            className="justify-center items-center bg-[#4C1D95]"
            style={{
              width: 36 * scaleWidth,
              height: 36 * scaleWidth,
              borderRadius: 18 * scaleWidth,
            }}
          >
            <Ionicons name="notifications-outline" size={20} color="#fff" />
          </RNView>
        </RNView>
      </RNView>

      {/* title + mark all read */}
      <RNView
        style={{
          marginTop: 28 * scaleHeight,
          paddingHorizontal: 35 * scaleWidth,
        }}
      >
        <RNText
          className="text-[#111827]"
          style={{
            fontSize: 30 * scaleWidth,
            fontWeight: '600',
          }}
        >
          Notifications
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
            Mark all read
          </RNText>
        </RNTouchableOpacity>
      </RNView>

      {/* list */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: 34 * scaleHeight,
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
