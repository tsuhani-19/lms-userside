import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function TFComponent({
  question,
  selectedOption,
  setSelectedOption,
  submitted,
  primaryColor,
}) {
  const { t } = useTranslation();
  const options = [t('result.true'), t('result.false')];
  const lightShade = '#F3E8FF'; // consistent very light shade

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

      {/* Options */}
      {options.map((option, index) => {
        const isSelected = selectedOption === index;

        // Always use light shade when selected (before or after submit)
        const optionBgColor = isSelected ? lightShade : '#FFFFFF';
        const textColor = '#000'; // black text always
        const circleFillColor = isSelected ? primaryColor : 'transparent';

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => !submitted && setSelectedOption(index)}
            style={{
              width: 353,
              height: 49,
              borderRadius: 15,
              borderTopWidth: 1,
              borderRightWidth: 5,
              borderBottomWidth: 5,
              borderLeftWidth: 1,
              borderColor: '#000',
              backgroundColor: optionBgColor,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: 12,
            }}
          >
            {/* Circle */}
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 9,
                borderWidth: 2,
                borderColor: primaryColor,
                marginRight: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: circleFillColor,
              }}
            />

            <Text
              style={{
                fontFamily: 'SF Compact Rounded',
                fontWeight: '500',
                fontSize: 16,
                color: textColor,
                flex: 1,
              }}
            >
              {String(option)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
