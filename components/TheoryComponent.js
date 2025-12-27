import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function TheoryComponent({ question, answer, setAnswer, submitted, primaryColor, primaryLight }) {
  const { t } = useTranslation();
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      {/* Question Container */}
      <View
        style={{
          width: 353,
          minHeight: 104,
          borderRadius: 23,
          borderTopWidth: 2,
          borderRightWidth: 5,
          borderBottomWidth: 5,
          borderLeftWidth: 2,
          borderColor: '#000',
          backgroundColor: primaryColor,
          padding: 20,
          marginBottom: 20,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'SF Compact Rounded',
            fontWeight: '400',
            fontSize: 20,
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          {String(question)}
        </Text>
      </View>

      {/* Answer Input */}
      <TextInput
        editable={!submitted}
        value={answer}
        onChangeText={setAnswer}
        placeholder={t('quiz.typeYourAnswer')}
        multiline
        style={{
          width: 353,
          minHeight: 100,
          borderRadius: 15,
          borderTopWidth: 1,
          borderRightWidth: 5,
          borderBottomWidth: 5,
          borderLeftWidth: 1,
          borderColor: '#000',
          padding: 12,
          backgroundColor: '#FFFFFF',
          textAlignVertical: 'top',
          marginBottom: 12,
        }}
      />
    </View>
  );
}
