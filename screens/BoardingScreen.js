import React, { useState, useEffect, useRef } from 'react'; 
import { View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { STORAGE_KEYS } from '../constants/config';
import BottomNav from '../components/BottomNavigation';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function BoardingScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(t('common.user'));

  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    loadUserData();

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, [t]);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userDataString) {
        const user = JSON.parse(userDataString);
        setUserData(user);
        const fullName = user.fullName || user.name || user.firstName || t('common.user');
        setUserName(fullName.split(' ')[0]);
      } else {
        setUserName(t('common.user'));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserName(t('common.user'));
    }
  };

  const handlePlayPause = async () => {
    if (status.isPlaying) {
      await videoRef.current?.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current?.playAsync();
      setIsPlaying(true);
    }
  };

  const handleStop = async () => {
    await videoRef.current?.stopAsync();
    setIsPlaying(false);
  };

  const handleSeek = async (value) => {
    if (status.durationMillis) {
      const position = value * status.durationMillis;
      await videoRef.current?.setPositionAsync(position);
    }
  };

  const handleRewind = async () => {
    if (status.positionMillis) {
      const newPosition = Math.max(0, (status.positionMillis || 0) - 10000); // 10 seconds back
      await videoRef.current?.setPositionAsync(newPosition);
    }
  };

  const handleForward = async () => {
    if (status.durationMillis) {
      const newPosition = Math.min(status.durationMillis, (status.positionMillis || 0) + 10000); // 10 seconds forward
      await videoRef.current?.setPositionAsync(newPosition);
    }
  };

  const handleFullscreen = async () => {
    if (isFullscreen) {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        await videoRef.current?.dismissFullscreenPlayer();
        setIsFullscreen(false);
        StatusBar.setHidden(false);
      } catch (error) {
        console.error('Exit fullscreen error:', error);
      }
    } else {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        await videoRef.current?.presentFullscreenPlayer();
        setIsFullscreen(true);
        StatusBar.setHidden(true);
      } catch (error) {
        console.error('Fullscreen error:', error);
      }
    }
  };

  const formatTime = (millis) => {
    if (!millis) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const titleFontSize = Math.min(30, dimensions.width * 0.078); 
  const titleLineHeight = Math.min(30, dimensions.width * 0.093); 
  const subtitleFontSize = Math.min(16, dimensions.width * 0.041);
  const subtitleLineHeight = Math.min(20, dimensions.width * 0.052);

  // Fullscreen Landscape Mode
  if (isFullscreen) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} edges={[]}>
        <StatusBar hidden />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Video
            ref={videoRef}
            source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
            style={{ 
              width: dimensions.width, 
              height: dimensions.height 
            }}
            resizeMode="cover"
            shouldPlay={isPlaying}
            onPlaybackStatusUpdate={setStatus}
            useNativeControls={false}
          />

          {/* Controls Overlay */}
          <View style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            paddingVertical: 20, 
            paddingHorizontal: 24 
          }}>
            {/* Timeline Slider */}
            <Slider
              style={{ width: '100%', height: 40, marginBottom: 16 }}
              minimumValue={0}
              maximumValue={1}
              value={status.durationMillis ? (status.positionMillis || 0) / status.durationMillis : 0}
              minimumTrackTintColor="#3E0288"
              maximumTrackTintColor="#CCCCCC"
              thumbTintColor="#FFFFFF"
              onSlidingComplete={handleSeek}
            />

            {/* Horizontal Controls with FF/RW */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
              <TouchableOpacity 
                onPress={handleRewind} 
                style={{ padding: 8 }}
              >
                <Ionicons name="play-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handlePlayPause} 
                style={{ padding: 8 }}
              >
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleStop} 
                style={{ padding: 8 }}
              >
                <Ionicons name="stop" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleForward} 
                style={{ padding: 8 }}
              >
                <Ionicons name="play-forward" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleFullscreen} 
                style={{ padding: 8 }}
              >
                <Ionicons name="contract-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Normal Portrait Mode
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 40, paddingBottom: 120, alignItems: 'center' }}>
        
        {/* Top Row */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="arrow-back-outline" size={24} color="#3E0288" />
          </TouchableOpacity>

          <View className="flex-row">
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              className="mr-3 p-2 rounded-full bg-gray-200"
              style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="settings-outline" size={20} color="#3E0288" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              className="p-2 rounded-full bg-gray-200"
              style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="notifications-outline" size={20} color="#3E0288" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Header Text */}
        <View style={{ width: '100%', marginBottom: 24 }}>
          <Text numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.7} style={{ fontFamily: 'SF Compact Rounded', fontWeight: '600', fontSize: titleFontSize, lineHeight: titleLineHeight, marginBottom: 6, color: '#000' }}>
            {t('boarding.ourVision')}
          </Text>
          <Text numberOfLines={4} adjustsFontSizeToFit minimumFontScale={0.8} style={{ fontFamily: 'SF Compact Rounded', fontWeight: '400', fontSize: subtitleFontSize, lineHeight: subtitleLineHeight, color: '#6B7280' }}>
            {t('boarding.subtitle')}
          </Text>
        </View>

        {/* Video Container */}
        <View
          style={{
            width: '100%',
            height: 391,
            borderRadius: 23,
            overflow: 'hidden',
            marginBottom: 20,
            justifyContent: 'flex-end',
            paddingBottom: 12,
            borderTopWidth: 2,
            borderRightWidth: 5,
            borderBottomWidth: 5,
            borderLeftWidth: 2,
            borderColor: '#000',
            backgroundColor: '#000',
          }}
        >
          <Video
            ref={videoRef}
            source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
            style={{ 
              position: 'absolute',
              width: '100%', 
              height: '100%' 
            }}
            resizeMode="cover"
            shouldPlay={isPlaying}
            onPlaybackStatusUpdate={setStatus}
            useNativeControls={false}
          />

          {/* Timeline Slider */}
          <Slider
            style={{ width: '90%', alignSelf: 'center', height: 30, marginBottom: 12 }}
            minimumValue={0}
            maximumValue={1}
            value={status.durationMillis ? (status.positionMillis || 0) / status.durationMillis : 0}
            minimumTrackTintColor="#3E0288"
            maximumTrackTintColor="#CCCCCC"
            thumbTintColor="#FFFFFF"
            onSlidingComplete={handleSeek}
          />

          {/* Controls with FF/RW */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity onPress={handleRewind} style={{ padding: 8 }}>
              <Ionicons name="play-back" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePlayPause} style={{ padding: 8 }}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleStop} style={{ padding: 8 }}>
              <Ionicons name="stop" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForward} style={{ padding: 8 }}>
              <Ionicons name="play-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFullscreen} style={{ padding: 8 }}>
              <Ionicons name="expand-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Take Quiz Button */}
        <TouchableOpacity onPress={() => navigation.navigate('QuizScreen')} style={{ width: 287, height: 45, backgroundColor: '#3E0288', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontFamily: 'SF Compact Rounded', fontWeight: '500', fontSize: 16, lineHeight: 23, color: '#FFFFFF', textAlign: 'center' }}>
            {t('boarding.takeQuiz')}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: insets.bottom + 10,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <BottomNav
          navLeftMargin={Dimensions.get('window').width * 0.05}
          navWidth={Dimensions.get('window').width * 0.9}
          navHeight={60}
          navBorderRadius={30}
        />
      </View>

    </SafeAreaView>
  );
}
