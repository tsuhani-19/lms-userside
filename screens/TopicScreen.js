import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TopicScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
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
          paddingTop: 80,
          paddingBottom: 40,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 35,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 6,
              backgroundColor: '#EDE9FE',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <Ionicons name="chevron-back" size={20} color="#3E0288" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#3E0288',
              marginLeft: 12,
              flexShrink: 1,
              marginBottom: 6,
            }}
          >
            {sectionName} - {t('topic.topics')}
          </Text>
        </View>

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
                  alignItems: 'center', // vertical center
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
