import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TopicScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : insets.top;
  const headerFontSize = Math.min(28, width * 0.07);
  const sectionName = route.params?.sectionName || `${t('common.section')} 1`;

  const topics = [
    { title: t('topic.introduction'), description: t('topic.overviewOfSection') },
    { title: `${t('topic.topic')} 2`, description: t('topic.detailedExplanation') },
    { title: `${t('topic.topic')} 3`, description: t('topic.practicalExamples') },
    { title: `${t('topic.topic')} 4`, description: t('topic.advancedConcepts') },
    { title: `${t('topic.topic')} 5`, description: t('topic.summaryAndRecap') },
  ];

  const completedTopics = 2;
  const totalTopics = topics.length;
  const progress = completedTopics / totalTopics;

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7FB' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: width * 0.05,
          paddingTop: statusBarHeight + 20,
          paddingBottom: insets.bottom + 40,
        }}
      >
        {/* Header with Back on left and Settings + Notification on right */}
        <View
          style={{
            paddingTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 35,
          }}
        >
          {/* Left: Back */}
          <TouchableOpacity
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
            <Ionicons name="arrow-back-outline" size={18} color="#3E0288" />
          </TouchableOpacity>

          {/* Right: Settings + Notification */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
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
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>

            <TouchableOpacity
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
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section Title */}
        <Text
          style={{
            fontSize: headerFontSize,
            fontWeight: '600',
            color: '#3E0288',
            marginBottom: 30,
          }}
        >
          {sectionName} - {t('topic.topics')}
        </Text>

        {/* Purple Progress Container */}
        <View
          style={{
            backgroundColor: '#3E0288',
            borderRadius: 25,
            padding: 30,
            marginBottom: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: 18,
              marginBottom: 12,
            }}
          >
            {t('topic.progress')}: {completedTopics} {t('topic.of')} {totalTopics} {t('topic.topicsCompleted')}
          </Text>
          <View
            style={{
              height: 8,
              backgroundColor: '#FFFFFF',
              borderRadius: 7,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                height: 14,
                width: `${progress * 100}%`,
                backgroundColor: '#C4B5FD',
                borderRadius: 7,
              }}
            />
          </View>
        </View>

        {/* Topics List */}
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (index === 0) {
                navigation.navigate('BoardingScreen');
              }
            }}
            activeOpacity={0.8}
            style={{
              marginBottom: 12,
              borderRadius: 14,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <LinearGradient
              colors={['#EDE9FE', '#C4B5FD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: 14,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#1F2937',
                    }}
                  >
                    {index + 1}. {topic.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#4B5563',
                      marginTop: 4,
                      lineHeight: 18,
                    }}
                  >
                    {topic.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#3E0288"
                  style={{ marginLeft: 10 }}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopicScreen;
