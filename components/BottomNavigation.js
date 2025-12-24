import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BottomNav = ({ navBorderRadius }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 4,
        left: 70,
        width: 265,
        height: 60,
        backgroundColor: '#3E0288',
        borderRadius: navBorderRadius,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,

      }}
    >
      {/* Home */}
      <TouchableOpacity className="items-center" onPress={() => navigation.navigate('UserHome')}>
        <Ionicons name="home" size={24} color="#FFFFFF" />
        <Text className="text-white text-xs mt-1">Home</Text>
      </TouchableOpacity>

      {/* Progress */}
      <TouchableOpacity
        className="items-center"
        onPress={() => navigation.navigate('Progress')}
      >
        <Ionicons name="trending-up" size={24} color="#FFFFFF" />
        <Text className="text-white text-xs mt-1">Progress</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity className="items-center" onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color="#FFFFFF" />
        <Text className="text-white text-xs mt-1">Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;