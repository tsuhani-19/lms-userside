import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavigation';

const { width } = Dimensions.get('window');

export default function UserProgressScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserName((user.fullName || 'User').split(' ')[0]);
      }
    } catch (e) {}
  };

  // Dimensions & Constants
  const horizontalPadding = 20;
  const cardHeight = 125;

  const modules = [
    { title: 'Vision & Mission', company: 'Company', status: 'done', score: 95 },
    { title: 'Culture & Values', company: 'Company', status: 'in-progress', progress: 33, quizCompleted: '1/3' },
    { title: 'Rules & Policy', company: 'Company', status: 'locked', duration: '45 min' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: 75,
          paddingBottom: 120,
        }}
      >
        
        {/* HEADER SECTION */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <View>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>Your Progress,</Text>
            <Text style={{ fontSize: 16, color: '#6B7280', marginTop: 2 }}>
              Track your onboarding completion
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        {/* OVERALL COMPLETION CARD */}
        <View
          style={{
            width: '100%',
            height: cardHeight,
            backgroundColor: '#3E0288',
            borderRadius: 24,
            borderWidth: 2,
            borderColor: '#000',
            padding: 20,
            marginBottom: 28,
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 20, color: '#fff', fontWeight: '600', marginBottom: 4 }}>Overall Completion</Text>
          <Text style={{ color: '#D1D5DB', fontSize: 14, marginBottom: 12 }}>
            2 of 5 sections completed
          </Text>
          
          <View style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, marginBottom: 8 }}>
            <View style={{ width: '50%', height: 8, backgroundColor: '#fff', borderRadius: 4 }} />
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#fff', fontSize: 12, opacity: 0.8 }}>Progress</Text>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>50%</Text>
          </View>
        </View>

        <Text style={{ fontSize: 20, fontWeight: '400', color: '#1F2937', marginBottom: 16 }}>
          Training Modules
        </Text>

        {/* MODULE LIST */}
        {modules.map((m, i) => {
          const done = m.status === 'done';
          const active = m.status === 'in-progress';
          const locked = m.status === 'locked';

          // Wrap Vision & Mission with navigation
          const ModuleWrapper = (m.title === 'Vision & Mission') ? TouchableOpacity : View;
          const wrapperProps = (m.title === 'Vision & Mission') ? { onPress: () => navigation.navigate('PerformanceScreen') } : {};

          return (
            <ModuleWrapper
              key={i}
              {...wrapperProps}
              style={{
                width: '100%',
                backgroundColor: locked ? '#F9FAFB' : '#FFFFFF',
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
                borderWidth: 1,
                borderColor: '#F3F4F6',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <View style={{ marginTop: 4 }}>
                    {done && <Ionicons name="checkmark-circle" size={26} color="#22C55E" />}
                    {active && <Ionicons name="time" size={26} color="#FACC15" />}
                    {locked && <Ionicons name="lock-closed" size={24} color="#9CA3AF" />}
                  </View>

                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontSize: 13, color: '#9CA3AF', textTransform: 'uppercase', fontWeight: '600' }}>{m.company}</Text>
                    <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>{m.title}</Text>
                    {done && (
                      <Text style={{ color: '#6B7280', marginTop: 4, fontSize: 13 }}>
                        Score: <Text style={{fontWeight: '700'}}>{m.score}/100</Text>
                      </Text>
                    )}
                  </View>
                </View>

                {done && badge('#ECFDF5', 'Done', '#16A34A')}
                {locked && badge('#F3F4F6', 'Locked', '#C75434')}
              </View>

              {active && (
                <View style={{ marginTop: 16, marginLeft: 38 }}>
                  <View style={{ height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, width: '100%' }}>
                    <View style={{ width: `${m.progress}%`, height: 6, backgroundColor: '#FACC15', borderRadius: 3 }} />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ color: '#6B7280', fontSize: 13 }}>Quiz: {m.quizCompleted}</Text>
                    <Text style={{ color: '#FACC15', fontWeight: '700', fontSize: 13 }}>{m.progress}%</Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: 'rgba(233, 206, 28, 0.15)',
                      paddingVertical: 12,
                      borderRadius: 12,
                      alignItems: 'center',
                      marginTop: 16,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginRight:24,
                    }}
                  >
                    <Ionicons name="play" size={16} color="#E9c513" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#E9c513', fontWeight: '600' }}>Continue Learning</Text>
                  </TouchableOpacity>
                </View>
              )}

              {locked && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 38 }}>
                  <Ionicons name="time-outline" size={14} color="#C75434" />
                  <Text style={{ marginLeft: 4, color: '#C75434', fontSize: 13 }}>{m.duration}</Text>
                </View>
              )}
            </ModuleWrapper>
          );
        })}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={{ position: 'absolute', bottom: Platform.OS === 'ios' ? 40 : 20, width: '100%', alignItems: 'center' }}>
        <BottomNav navWidth={width - 40} navHeight={64} navBorderRadius={32} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  }
});

const badge = (bg, text, color) => (
  <View style={{ backgroundColor: bg, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
    <Text style={{ color, fontSize: 12, fontWeight: '700' }}>{text}</Text>
  </View>
);
