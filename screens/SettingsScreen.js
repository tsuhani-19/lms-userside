import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SettingScreen({ navigation }) {
  const CARD_RADIUS = 60;

  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const togglePush = () => setPushEnabled(prev => !prev);
  const toggleEmail = () => setEmailEnabled(prev => !prev);
  const toggleDark = () => setDarkMode(prev => !prev);

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
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 17 * scaleHeight, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 28 * scaleWidth,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Setting
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleWidth,
              color: '#E5E7EB',
              marginTop: 1,
            }}
          >
            Choose Your Preference
          </Text>
        </View>
      </View>

      {/* WHITE CARD CONTENT – full height to bottom */}
      <View
        style={{
          position: 'absolute',
          top: 220 * scaleHeight,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff',
          borderTopLeftRadius: CARD_RADIUS * scaleWidth,
          borderTopRightRadius: CARD_RADIUS * scaleWidth,
          paddingHorizontal: 24 * scaleWidth,
          paddingTop: 32 * scaleHeight,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        {/* Notification Preferences */}
        <SectionTitle label="Notification Preferences" />

        <SettingsRow
          icon="notifications-outline"
          iconBg="#F3E8FF"
          label="Push Notifications"
          rightComponent={
            <PurpleSwitch value={pushEnabled} onValueChange={togglePush} />
          }
        />

        <SettingsRow
          icon="mail-outline"
          iconBg="#F3E8FF"
          label="Email Notifications"
          rightComponent={
            <PurpleSwitch value={emailEnabled} onValueChange={toggleEmail} />
          }
        />

        {/* App Preferences */}
        <SectionTitle label="App Preferences" style={{ marginTop: 26 }} />

        <SettingsRow
          icon="language-outline"
          iconBg="#F3E8FF"
          label="Language"
          rightComponent={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.secondaryText}>English</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9CA3AF"
                style={{ marginLeft: 4 }}
              />
            </View>
          }
        />

        <SettingsRow
          icon="moon-outline"
          iconBg="#F3E8FF"
          label="Dark Mode"
          rightComponent={
            <PurpleSwitch value={darkMode} onValueChange={toggleDark} />
          }
        />

        {/* Account Settings */}
        <SectionTitle label="Account Settings" style={{ marginTop: 26 }} />

        {/* Change Password row -> navigate to ChangePassword stack screen */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <SettingsRow
            icon="key-outline"
            iconBg="#F3E8FF"
            label="Change Password"
            rightComponent={
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            }
          />
        </TouchableOpacity>

        <SettingsRow
          icon="help-circle-outline"
          iconBg="#F3E8FF"
          label="Help & Support"
          rightComponent={
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          }
        />

        {/* Log Out row – same styling as others */}
        <TouchableOpacity
          style={{ marginTop: 6 }}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <SettingsRow
            icon="log-out-outline"
            iconBg="#F3E8FF"
            label="Log Out"
            rightComponent={
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            }
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* Reusable components */

const SectionTitle = ({ label, style }) => (
  <Text
    style={[
      {
        fontSize: 14,
        color: '#9CA3AF',
        fontWeight: 400,
        letterSpacing: 0.6,
        marginBottom: 5,
        marginTop: 12,
      },
      style,
    ]}
  >
    {label}
  </Text>
);

const SettingsRow = ({
  icon,
  iconBg,
  iconColor = '#6D28D9',
  label,
  rightComponent,
  labelStyle,
}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          backgroundColor: iconBg,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 14,
        }}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={[styles.primaryText, labelStyle]}>{label}</Text>
    </View>
    {rightComponent}
  </View>
);

const PurpleSwitch = ({ value, onValueChange }) => (
  <Switch
    value={value}
    onValueChange={onValueChange}
    trackColor={{ false: '#E5E7EB', true: '#6D28D9' }}
    thumbColor="#ffffff"
    ios_backgroundColor="#E5E7EB"
  />
);

const styles = StyleSheet.create({
  primaryText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
});
