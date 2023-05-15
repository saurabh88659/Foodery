import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpalshScreen from '../Screens/SpalshScreen';
import Login from '../Screens/Login';
import OtpScreen from '../Screens/OtpScreen';
import HomeScreen from '../Screens/HomeScreen';
import HomeScreenTwo from '../Screens/HomeScreenTwo';
import CreateAccount from '../Screens/CreateAccount';
import Resetpassword from '../Screens/Resetpassword';
import SignUpscreen from '../Screens/SignUpscreen';
import ForgotEmailOtp from '../Screens/ForgotEmailOtp';
import ForgetNewPassword from '../Screens/ForgetNewPassword';
import BottomTabBar from './BottomTabBar';
import SubCategriesModal from '../Screens/SubCategriesModal';
import CartStack from './CartStack';

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
        name="BottomTabBar"
        component={BottomTabBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubCategriesModal"
        component={SubCategriesModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CartStack"
        component={CartStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
