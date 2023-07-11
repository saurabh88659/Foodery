import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoreScreen from '../Screens/MoreScreen';
import Notification from '../Screens/Notification';
import AboutUs from '../Screens/AboutUs';
import TermsCondition from '../Screens/TermsCondition';
import PrivacyPolicy from '../Screens/PrivacyPolicy';
import OrderHistoryMain from '../Screens/OrderHistory/OrderHistoryMain';
import OrderHistory from '../Screens/OrderHistory';
import OrderDetails from '../Screens/OrderDetails';
import Routes from './Routes';
import OrderHistoryLive from '../Screens/OrderHistory/OrderHistoryLive';
import YourOrder from '../Screens/YourOrder';

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
        name="OrderHistoryMain"
        component={OrderHistoryMain}
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
      <Stack.Screen
        name={Routes.ORDER_HISTORY}
        component={OrderHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.ORDER_DETAILS}
        component={OrderDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderHistoryLive"
        component={OrderHistoryLive}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.YOUR_ORDER}
        component={YourOrder}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MoreStack;
