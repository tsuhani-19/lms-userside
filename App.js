import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './screens/i18n'; // Initialize i18n
import GotoScreen from './screens/GotoScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import ProgressScreen from './screens/UserProgressScreen';
import BoardingScreen from './screens/BoardingScreen'
import ProfileScreen from './screens/ProfileScreen';
import QuizScreen from './screens/QuizScreen';
import SettingsScreen from './screens/SettingsScreen';
import ChangePassword from './screens/ChangePassword';
import NotificationScreen from './screens/NotificationScreen';
import PerformanceScreen from './screens/PerformanceScreen';
import TopicScreen from './screens/TopicScreen';
import ResultScreen from './screens/ResultScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Goto" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Goto" component={GotoScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="UserHome" component={UserHomeScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="BoardingScreen" component={BoardingScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
          <Stack.Screen name='QuizScreen' component={QuizScreen} />
          <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} />
          <Stack.Screen name='Notification' component={NotificationScreen} />
          <Stack.Screen name='PerformanceScreen' component={PerformanceScreen }/>
          <Stack.Screen name='TopicScreen' component={TopicScreen} />
          <Stack.Screen name='ResultScreen' component={ResultScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}