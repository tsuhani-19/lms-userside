import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GotoScreen from './screens/GotoScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import ProgressScreen from './screens/UserProgressScreen';


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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
