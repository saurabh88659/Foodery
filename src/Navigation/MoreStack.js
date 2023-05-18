import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoreScreen from '../Screens/MoreScreen';
import OrderHistory from '../Screens/OrderHistory';
import Notification from '../Screens/Notification';
import AboutUs from '../Screens/AboutUs';
import TermsCondition from '../Screens/TermsCondition';
import PrivacyPolicy from '../Screens/PrivacyPolicy';

const Stack = createNativeStackNavigator();
function MoreStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MoreStack;
