import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LearningSvg from '../assets/learning.svg';

export default function GotoScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#3E0288]">
      
     
      <View className="flex-1 items-center justify-center px-6">
        
        <Text 
          style={{
            position: 'absolute',
            top: 87,
            left: 43,
            width: 307,
            height: 131,
            fontFamily: 'Jura',
            fontWeight: '600',
            fontSize: 40,
            lineHeight: 37,
            letterSpacing: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#FFFFFF',
          }}
        >
          Learning{"\n"}Journey Loop
        </Text>

       
        <View style={{ width: 500, height:270,
             left:-2, alignItems: 'center', justifyContent: 'center', marginTop: -100,marginLeft:10}}>
          <LearningSvg width={380} height={380} />
        </View>

      </View>

      <View 
        style={{
          position: 'absolute',
          top: 520,
          left: -3,
          width: 398,
          height: 350,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
      >
        
        <Text 
          style={{
            position: 'absolute',
            top: 581 - 552,
            left: 23 - (-3),
            width: 343,
            height: 131,
            fontFamily: 'Jura',
            fontWeight: '600',
            fontSize: 28,
            lineHeight: 31,
            letterSpacing: 0,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#3E0288',
          }}
        >
          Log in or sign up to begin your onboarding process through guided video training.
        </Text>

        <TouchableOpacity 
          style={{
            position: 'absolute',
            bottom: 75,
            left: (398 - 86) / 2 - 3,
            width: 86,
            height: 86,
            borderRadius: 43,
            backgroundColor: 'transparent',
            borderWidth: 4,
            borderColor: '#3E0288',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Login')}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: '#3E0288',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text 
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
              }}
            >
              Go
            </Text>
          </View>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}
