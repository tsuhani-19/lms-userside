import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function ResultScreen() {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const headerFontSize = Math.min(28, width * 0.07);
  const { questions = [], answers = [], correctAnswers = [] } = route.params || {};

  // Colors
  const primary = '#3E0288';
  const correct = '#16A34A';
  const wrong = '#DC2626';
  const skipped = '#F59E0B';
  const black = '#111827';
  const muted = '#6B7280';

  const cardShadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  };

  const correctCount = answers.reduce((acc, ans, i) => {
    if (ans !== null && ans !== undefined && ans === correctAnswers[i]) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const skippedCount = answers.filter(
    a => a === null || a === undefined || a === ''
  ).length;

  const wrongCount = questions.length - correctCount - skippedCount;

  const getAnswerText = (answer, q) => {
    if (answer === null || answer === undefined || answer === '') {
      return t('result.notAnswered');
    }
    if (q.type === 'mcq' && q.options) {
      return q.options[answer];
    }
    if (q.type === 'truefalse') {
      return answer === 0 ? t('result.true') : t('result.false');
    }
    return String(answer);
  };

  const getCorrectAnswerText = (answer, q) => {
    if (q.type === 'mcq' && q.options) {
      return q.options[answer];
    }
    if (q.type === 'truefalse') {
      return answer === 0 ? t('result.true') : t('result.false');
    }
    return String(answer);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 28 }}>

        {/* Back button left, Settings + Notification right */}
        <View style={{
            
            paddingTop: 20,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
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
            <Ionicons name="arrow-back-outline" size={18} color={primary} />
          </TouchableOpacity>

          {/* Right: Settings + Notification */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Ionicons name="settings-outline" size={18} color={primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
              }}
            >
              <Ionicons name="notifications-outline" size={18} color={primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header */}
        <View style={{ marginTop: 25, marginBottom: 24 }}>
          <Text style={{ fontSize: headerFontSize, fontWeight: '600', color: black }}>
            {t('result.resultSummary')}
          </Text>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: primary,
            borderRadius: 16,
            paddingVertical: 18,
            marginBottom: 28,
            ...cardShadow,
          }}
        >
          <Stat label={t('result.correct')} value={correctCount} />
          <Stat label={t('result.wrong')} value={wrongCount} />
          <Stat label={t('result.skipped')} value={skippedCount} />
        </View>

        {/* Question Review */}
        <Text style={{ fontSize: 20, fontWeight: '800', color: primary, marginBottom: 16 }}>
          {t('result.questionReview')}
        </Text>

        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const correctAnswer = correctAnswers[index];

          const isSkipped =
            userAnswer === null || userAnswer === undefined || userAnswer === '';

          const isCorrect = userAnswer === correctAnswer && !isSkipped;

          const statusColor = isSkipped ? skipped : isCorrect ? correct : wrong;
          const statusIcon = isSkipped
            ? 'help-circle-outline'
            : isCorrect
            ? 'checkmark-circle-outline'
            : 'close-circle-outline';

          return (
            <View
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 18,
                marginBottom: 16,
                ...cardShadow,
              }}
            >
              {/* Question */}
              <Text style={{ fontSize: 16, fontWeight: '700', color: black, marginBottom: 10 }}>
                {index + 1}. {q.question}
              </Text>

              {/* Status */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name={statusIcon} size={18} color={statusColor} />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 14,
                    fontWeight: '700',
                    color: statusColor,
                  }}
                >
                  {isSkipped ? t('result.skipped') : isCorrect ? t('result.correct') : t('result.incorrect')}
                </Text>
              </View>

              {/* Your Answer */}
              <View
                style={{
                  borderLeftWidth: 4,
                  borderLeftColor: primary,
                  paddingLeft: 12,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 13, color: muted }}>{t('result.yourAnswer')}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: black }}>
                  {getAnswerText(userAnswer, q)}
                </Text>
              </View>

              {/* Correct Answer */}
              {!isCorrect && (
                <View
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor: correct,
                    paddingLeft: 12,
                  }}
                >
                  <Text style={{ fontSize: 13, color: muted }}>
                    {t('result.correctAnswer')}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: black }}>
                    {getCorrectAnswerText(correctAnswer, q)}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const Stat = ({ label, value }) => {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF' }}>
        {value}
      </Text>
      <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>
        {label}
      </Text>
    </View>
  );
};
