import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartScreen from '../Screens/CartScreen';
import Routes from './Routes';
import PaymentSuccessful from '../Screens/PaymentSuccessful';

const Stack = createNativeStackNavigator();
function CartStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.PAYMENTSUCCESSFUL}
        component={PaymentSuccessful}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default CartStack;
