import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpalshScreen from '../Screens/SpalshScreen';
import OtpScreen from '../Screens/OtpScreen';
import CreateAccount from '../Screens/CreateAccount';
import Resetpassword from '../Screens/Resetpassword';
import SignUpscreen from '../Screens/SignUpscreen';
import ForgotEmailOtp from '../Screens/ForgotEmailOtp';
import ForgetNewPassword from '../Screens/ForgetNewPassword';
import BottomTabBar from './BottomTabBar';
// import CartStack from './CartStack';
import Routes from './Routes';
import LoginScreen from '../Screens/LoginScreen';
import Otp from '../Screens/Otp';
import SearchBar from '../Screens/SearchBar';

const Stack = createNativeStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName={Routes.SCREEN_SPLASH}>
      <Stack.Screen
        name={Routes.SCREEN_SPLASH}
        component={SpalshScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.LOG_IN_SCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.OTP_SCREEN}
        component={Otp}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Resetpassword"
        component={Resetpassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpscreen"
        component={SignUpscreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotEmailOtp"
        component={ForgotEmailOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetNewPassword"
        component={ForgetNewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.BOTTOM_TAB_BAR}
        component={BottomTabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.SEARCH_BAR}
        component={SearchBar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
