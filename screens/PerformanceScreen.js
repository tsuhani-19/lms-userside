import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNav from '../components/BottomNavigation';

const { width } = Dimensions.get('window');

export default function UserProgressScreen() {
  const navigation = useNavigation();

  const headerTopMargin = 50;
  const headerLeftMargin = 22;

  const cardWidth = 353;
  const cardHeight = 89;
  const cardBorderRadius = 23;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: headerLeftMargin,
          paddingTop: headerTopMargin,
          paddingBottom: 120,
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
              style={{
                width: 40,
                height: 40,
                marginRight: 8,
                borderRadius: 20,
                backgroundColor: '#E5E7EB',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E5E7EB',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>Performance Summary</Text>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>
            Company vision & mission 45 mins
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
            Vision & Mission Completed
          </Text>
          <Text style={{ fontSize: 14, color: '#D1D5DB' }}>
            Completed on Nov 24, 2025
          </Text>
        </View>

        {/* ✅ VIDEO ACTIVITY CARD */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            Video Activity
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="play-circle-outline" size={18} color="#6B7280" />
              <Text style={{ marginLeft: 6, fontSize: 14 }}>Quiz Video</Text>
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
                Completed
              </Text>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 10 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>Last Watched</Text>
            <Text style={{ fontSize: 13 }}>Nov 24, 2025</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>Total Videos</Text>
            <Text style={{ fontSize: 13 }}>1 video</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 13, color: '#6B7280' }}>Duration</Text>
            <Text style={{ fontSize: 13 }}>30 mins</Text>
          </View>
        </View>

        {/* ✅ QUIZ RESULT CARD */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
            Quiz Result
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>Final Score</Text>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>Passing Score</Text>
            </View>

            <Text style={{ fontSize: 20, fontWeight: '700', color: '#16A34A' }}>
              95/100
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>Attempt Used</Text>
              <Text style={{ fontSize: 14 }}>2/3</Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>STATUS</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#16A34A' }}>
                Passed
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#F4F4F5',
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: '600', color: '#3E0288' }}>
              Retake Quiz
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={{ position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' }}>
        <BottomNav navLeftMargin={20} navWidth={360} navHeight={60} navBorderRadius={30} />
      </View>
    </SafeAreaView>
  );
}
