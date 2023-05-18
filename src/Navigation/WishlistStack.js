import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WishlistScreen from '../Screens/WishlistScreen';

const Stack = createNativeStackNavigator();
function WishlistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WishlistScreen"
        component={WishlistScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default WishlistStack;
