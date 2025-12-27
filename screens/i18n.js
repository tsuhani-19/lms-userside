import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ja from './locales/ja.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // First, check if user has saved a language preference
      const savedLang = await AsyncStorage.getItem('user-language');
      if (savedLang) {
        callback(savedLang);
        return;
      }
      
      // If no saved preference, try to detect device language safely
      // Using Intl API which works in Expo and most environments
      let deviceLang = 'en'; // Default fallback
      
      try {
        if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
          const locale = Intl.DateTimeFormat().resolvedOptions().locale;
          deviceLang = locale.split('-')[0]; // Get language code (e.g., 'ja' from 'ja-JP')
        }
      } catch (error) {
        // Intl not available, use default
        console.log('Could not detect device language, using default');
      }
      
      // Map device language to supported languages
      const supportedLang = deviceLang === 'ja' ? 'ja' : 'en';
      callback(supportedLang);
    } catch (error) {
      console.error('Error detecting language:', error);
      callback('en'); // Always fallback to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: { 
      en: { translation: en }, 
      ja: { translation: ja } 
    },
    interpolation: { 
      escapeValue: false 
    },
    react: { 
      useSuspense: false 
    },
    compatibilityJSON: 'v3',
  });

export default i18n;
