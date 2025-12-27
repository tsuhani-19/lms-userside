import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import MCQ from '../components/QuizComponent.js';
import TrueFalse from '../components/TFComponent.js';
import Theoretical from '../components/TheoryComponent.js';

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const primaryColor = '#3E0288';
  const primaryLight = '#5C28A3';

  const questions = [
    {
      type: 'mcq',
      question: t('quiz.whatIsPrimaryGoal') || 'Default MCQ Question',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    },
    {
      type: 'truefalse',
      question: 'React Native is used for mobile app development.',
    },
    {
      type: 'theoretical',
      question: 'Explain the difference between state and props in React.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [theoreticalAnswer, setTheoreticalAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const correctAnswers = [1, 0, null];
  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    if (submitted) return;

    if (
      (currentQuestion.type === 'mcq' || currentQuestion.type === 'truefalse') &&
      selectedOption === null
    ) return;

    if (currentQuestion.type === 'theoretical' && !theoreticalAnswer.trim()) return;

    setSubmitted(true);

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] =
      currentQuestion.type === 'theoretical' ? theoreticalAnswer.trim() : selectedOption;
    setAnswers(updatedAnswers);

    setTimeout(() => {
      setSubmitted(false);
      setSelectedOption(null);
      setTheoreticalAnswer('');

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        navigation.navigate('ResultScreen', {
          questions,
          answers: updatedAnswers,
          correctAnswers,
        });
      }
    }, 400);
  };

  const renderQuestionComponent = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <MCQ
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            submitted={submitted}
            primaryColor={primaryColor}
            primaryLight={primaryLight}
          />
        );
      case 'truefalse':
        return (
          <TrueFalse
            question={currentQuestion.question}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            submitted={submitted}
            primaryColor={primaryColor}
            primaryLight={primaryLight}
          />
        );
      case 'theoretical':
        return (
          <Theoretical
            question={currentQuestion.question}
            answer={theoreticalAnswer}
            setAnswer={setTheoreticalAnswer}
            submitted={submitted}
            primaryColor={primaryColor}
            primaryLight={primaryLight}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: width * 0.05,
          paddingTop: 20,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {/* 🔝 HEADER */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 25,
            paddingTop: 10, // Move icons slightly down
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingTop: 5 }}>
            <Ionicons name="arrow-back-outline" size={28} color={primaryColor} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
              }}
            >
              <Ionicons name="settings-outline" size={20} color={primaryColor} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="notifications-outline" size={20} color={primaryColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 🧠 QUESTION NUMBER & TOTAL */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>
            {t('quiz.question')} {currentIndex + 1} {t('quiz.of')} {questions.length}
          </Text>
        </View>

        {/* 📝 QUIZ COMPONENT */}
        {renderQuestionComponent()}

        {/* ✅ SUBMIT BUTTON */}
        <TouchableOpacity
          style={{
            width: 287,
            height: 45,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            backgroundColor: primaryLight,
            alignSelf: 'center',
          }}
          onPress={handleSubmit}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '500' }}>
            {currentIndex === questions.length - 1
              ? t('quiz.submitQuiz') || 'Submit Quiz'
              : t('quiz.submitAnswer') || 'Submit Answer'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
