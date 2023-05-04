import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpalshScreen from '../Screens/SpalshScreen';
import OnboardingScreen from '../Screens/OnboardingScreen';
import Login from '../Screens/Login';
import OtpScreen from '../Screens/OtpScreen';
import HomeScreen from '../Screens/HomeScreen';
import HomeScreenTwo from '../Screens/HomeScreenTwo';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SpalshScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreenTwo"
        component={HomeScreenTwo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
