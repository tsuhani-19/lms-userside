import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SettingScreen({ navigation }) {
  const { t } = useTranslation();
  const CARD_RADIUS = 60;
  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [languageDropdownVisible, setLanguageDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language === 'ja' ? '日本語' : 'English');

  useEffect(() => {
    // Update selected language when i18n language changes
    setSelectedLanguage(i18n.language === 'ja' ? '日本語' : 'English');
  }, [i18n.language]);

  const togglePush = () => setPushEnabled(prev => !prev);
  const toggleEmail = () => setEmailEnabled(prev => !prev);
  const toggleDark = () => setDarkMode(prev => !prev);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' }
  ];

  const handleLanguageChange = async (langCode, langName) => {
    try {
      await i18n.changeLanguage(langCode);
      setSelectedLanguage(langName);
      setLanguageDropdownVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Animation for dropdown
  const [dropdownAnim] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setLanguageDropdownVisible(prev => !prev);
    Animated.timing(dropdownAnim, {
      toValue: languageDropdownVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const dropdownHeight = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, languages.length * 42], // height per item
  });

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
            <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            
            >
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
            {t('settings.setting')}
          </Text>
          <Text
            style={{
              fontSize: 14 * scaleWidth,
              color: '#E5E7EB',
              marginTop: 1,
            }}
          >
            {t('settings.choosePreference')}
          </Text>
        </View>
      </View>

      {/* WHITE CARD CONTENT */}
      <ScrollView
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
        <SectionTitle label={t('settings.notificationPreferences')} />
        <SettingsRow
          icon="notifications-outline"
          iconBg="#F3E8FF"
          label={t('settings.pushNotifications')}
          rightComponent={<PurpleSwitch value={pushEnabled} onValueChange={togglePush} />}
        />
        <SettingsRow
          icon="mail-outline"
          iconBg="#F3E8FF"
          label={t('settings.emailNotifications')}
          rightComponent={<PurpleSwitch value={emailEnabled} onValueChange={toggleEmail} />}
        />

        {/* App Preferences */}
        <SectionTitle label={t('settings.appPreferences')} style={{ marginTop: 26 }} />

        {/* Language Row */}
        <View style={{ marginBottom: 12 }}>
          <TouchableOpacity onPress={toggleDropdown}>
            <SettingsRow
              icon="language-outline"
              iconBg="#F3E8FF"
              label={t('settings.language')}
              rightComponent={
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.secondaryText}>{selectedLanguage}</Text>
                  <Ionicons
                    name={languageDropdownVisible ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginLeft: 4 }}
                  />
                </View>
              }
            />
          </TouchableOpacity>

          {/* Right-aligned dropdown list */}
          {languageDropdownVisible && (
            <Animated.View style={[styles.rightDropdownContainer, { height: dropdownHeight }]}>
              {languages.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.rightDropdownItem}
                  onPress={() => {
                    handleLanguageChange(lang.code, lang.name);
                  }}
                >
                  <Text style={styles.dropdownText}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>

        <SettingsRow
          icon="moon-outline"
          iconBg="#F3E8FF"
          label={t('settings.darkMode')}
          rightComponent={<PurpleSwitch value={darkMode} onValueChange={toggleDark} />}
        />

        {/* Account Settings */}
        <SectionTitle label={t('settings.accountSettings')} style={{ marginTop: 26 }} />
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ChangePassword')}>
          <SettingsRow
            icon="key-outline"
            iconBg="#F3E8FF"
            label={t('settings.changePassword')}
            rightComponent={<Ionicons name="chevron-forward" size={18} color="#9CA3AF" />}
          />
        </TouchableOpacity>
        <SettingsRow
          icon="help-circle-outline"
          iconBg="#F3E8FF"
          label={t('settings.helpSupport')}
          rightComponent={<Ionicons name="chevron-forward" size={18} color="#9CA3AF" />}
        />
        <TouchableOpacity style={{ marginTop: 6 }} activeOpacity={0.7} onPress={() => {}}>
          <SettingsRow
            icon="log-out-outline"
            iconBg="#F3E8FF"
            label={t('settings.logOut')}
            rightComponent={<Ionicons name="chevron-forward" size={18} color="#9CA3AF" />}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Reusable components */
const SectionTitle = ({ label, style }) => (
  <Text
    style={[
      { fontSize: 14, color: '#9CA3AF', fontWeight: 400, letterSpacing: 0.6, marginBottom: 5, marginTop: 12 },
      style,
    ]}
  >
    {label}
  </Text>
);

const SettingsRow = ({ icon, iconBg, iconColor = '#6D28D9', label, rightComponent, labelStyle }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: iconBg, justifyContent: 'center', alignItems: 'center', marginRight: 14 }}>
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
  primaryText: { fontSize: 14, color: '#111827', fontWeight: '500' },
  secondaryText: { fontSize: 13, color: '#6B7280', fontWeight: '500' },
  rightDropdownContainer: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    zIndex: 1000,
    overflow: 'hidden',
  },
  rightDropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
});
