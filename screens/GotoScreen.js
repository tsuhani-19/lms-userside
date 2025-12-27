import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LearningSvg from '../assets/learning.svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function GotoScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  // Base design dimensions (from your original code)
  const BASE_WIDTH = 398;
  const BASE_HEIGHT = 812; // Approx iPhone X height

  // Scale functions
  const scaleWidth = (size) => (SCREEN_WIDTH / BASE_WIDTH) * size;
  const scaleHeight = (size) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3E0288' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: scaleWidth(6) }}>

        {/* Title */}
        <Text
          style={{
            position: 'absolute',
            top: scaleHeight(87),
            left: scaleWidth(43),
            width: scaleWidth(307),
            height: scaleHeight(131),
            fontFamily: 'Jura',
            fontWeight: '600',
            fontSize: scaleWidth(40),
            lineHeight: scaleHeight(37),
            letterSpacing: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#FFFFFF',
          }}
        >
          {t('goto.title')}
        </Text>

        {/* Image */}
        <View
          style={{
            width: scaleWidth(500),
            height: scaleHeight(270),
            left: scaleWidth(-2),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scaleHeight(-100),
            marginLeft: scaleWidth(10),
          }}
        >
          <LearningSvg width={scaleWidth(380)} height={scaleHeight(380)} />
        </View>
      </View>

      {/* Bottom Card */}
      <View
        style={{
          position: 'absolute',
          top: scaleHeight(520),
          left: scaleWidth(-3),
          width: scaleWidth(398),
          height: scaleHeight(350),
          backgroundColor: '#ffffff',
          borderTopLeftRadius: scaleWidth(40),
          borderTopRightRadius: scaleWidth(40),
          paddingHorizontal: scaleWidth(24),
          paddingVertical: scaleHeight(32),
        }}
      >
        {/* Description */}
        <Text
          style={{
            position: 'absolute',
            top: scaleHeight(29), // 581-552=29
            left: scaleWidth(26), // 23-(-3)=26
            width: scaleWidth(343),
            height: scaleHeight(131),
            fontFamily: 'Jura',
            fontWeight: '600',
            fontSize: scaleWidth(28),
            lineHeight: scaleHeight(31),
            letterSpacing: 0,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#3E0288',
          }}
        >
          {t('goto.description')}
        </Text>

        {/* Go Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: scaleHeight(75),
            left: scaleWidth((398 - 86) / 2 - 3),
            width: scaleWidth(86),
            height: scaleWidth(86),
            borderRadius: scaleWidth(43),
            backgroundColor: 'transparent',
            borderWidth: scaleWidth(4),
            borderColor: '#3E0288',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Login')}
        >
          <View
            style={{
              width: scaleWidth(70),
              height: scaleWidth(70),
              borderRadius: scaleWidth(35),
              backgroundColor: '#3E0288',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: scaleWidth(18),
                fontWeight: '600',
              }}
            >
              {t('goto.goButton')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
