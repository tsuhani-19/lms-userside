import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ChangePasswordScreen({ navigation }) {
  const CARD_RADIUS = 60;

  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  const getStrengthLabel = () => {
    if (!newPassword) return 'Password Strength: Medium';
    if (newPassword.length < 6) return 'Password Strength: Weak';
    if (newPassword.length < 10) return 'Password Strength: Medium';
    return 'Password Strength: Strong';
  };

  // base sizes you gave, scaled
  const FIELD_WIDTH = 342 * scaleWidth;
  const FIELD_HEIGHT = 48 * scaleHeight;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3e0288' }}>
      {/* PURPLE HEADER */}
      <View
        style={{
          height: 260 * scaleHeight,
          paddingHorizontal: 20 * scaleWidth,
          paddingTop: 30 * scaleHeight,
        }}
      >
        {/* top icons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginRight: 20 }}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>

            {/* ONLY CHANGE: navigate to Notification stack */}
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* title */}
        <View style={{ marginTop: 17 * scaleHeight, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 28 * scaleWidth,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Change Password
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleWidth,
              color: '#E5E7EB',
              marginTop: 1,
            }}
          >
            Reset Your Password
          </Text>
        </View>
      </View>

      {/* WHITE CARD CONTENT – full height to bottom */}
      <View
        style={{
          position: 'absolute',
          top: 230 * scaleHeight, // slightly lower so first field is more down
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: CARD_RADIUS * scaleWidth,
          borderTopRightRadius: CARD_RADIUS * scaleWidth,
          paddingHorizontal: 24 * scaleWidth,
          paddingTop: 28 * scaleHeight, // a bit smaller, we’ll add extra margin for first label
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        {/* Scrollable content area */}
        <View style={{ flex: 1 }}>
          {/* Current Password (a bit lower) */}
          <View style={{ marginTop: 52 }}>
            <FieldLabel text="Current Password" />
            <PasswordInput
              width={FIELD_WIDTH}
              height={FIELD_HEIGHT}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry={!showCurrent}
              onToggleVisibility={() => setShowCurrent(prev => !prev)}
            />
            <Text style={styles.helperText}>Password Strength: Medium</Text>
          </View>

          {/* New Password */}
          <View style={{ marginTop: 20 }}>
            <FieldLabel text="New Password" />
            <PasswordInput
              width={FIELD_WIDTH}
              height={FIELD_HEIGHT}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNew}
              onToggleVisibility={() => setShowNew(prev => !prev)}
            />
            <Text style={styles.helperText}>
              Must be at least 8 characters, include numbers and symbols
            </Text>

            {/* strength bar */}
            <View
              style={{
                marginTop: 25,
                height: 4,
                backgroundColor: '#E5E7EB',
                borderRadius: 2,
                overflow: 'hidden',
                width: FIELD_WIDTH,
                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width:
                    newPassword.length === 0
                      ? '50%'
                      : newPassword.length < 6
                      ? '25%'
                      : newPassword.length < 10
                      ? '60%'
                      : '100%',
                  backgroundColor:
                    newPassword.length < 6
                      ? '#F97373'
                      : newPassword.length < 10
                      ? '#F59E0B'
                      : '#4C1D95',
                }}
              />
            </View>
            <Text
              style={[
                styles.helperText,
                { marginTop: 4, color: '#4C1D95', fontWeight: '500' },
              ]}
            >
              {getStrengthLabel()}
            </Text>
          </View>

          {/* Confirm New Password */}
          <View style={{ marginTop: 20 }}>
            <FieldLabel text="Confirm New Password" />
            <PasswordInput
              width={FIELD_WIDTH}
              height={FIELD_HEIGHT}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
              onToggleVisibility={() => setShowConfirm(prev => !prev)}
            />
            <Text style={styles.helperText}>
              Re-enter the new password
            </Text>

            {passwordsMatch && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingLeft: 9,
                }}
              >
                <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 12,
                    color: '#16A34A',
                    fontWeight: '500',
                  }}
                >
                  Passwords match
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Update button fixed at bottom of white area */}
        <TouchableOpacity
          style={{
            marginBottom: 70 * scaleHeight,
            backgroundColor: '#4B0082',
            borderRadius: 12,
            height: 52,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {}}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}
          >
            Update Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* Small reusable components */

const FieldLabel = ({ text }) => (
  <Text
    style={{
      fontSize: 14,
      color: '#4B5563',
      marginBottom: 6,
      fontWeight: '400',
      paddingLeft: 15,
    }}
  >
    {text}
  </Text>
);

const PasswordInput = ({
  width,
  height,
  value,
  onChangeText,
  secureTextEntry,
  onToggleVisibility,
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      backgroundColor: '#F9FAFB',
      paddingHorizontal: 14,
      height: height,
      width: width,
      alignSelf: 'center',
    }}
  >
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={{ flex: 1, fontSize: 14, color: '#111827' }}
    />
    <TouchableOpacity onPress={onToggleVisibility}>
      <Ionicons
        name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
        size={20}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  helperText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: 400,
    paddingLeft: 14,
  },
});
