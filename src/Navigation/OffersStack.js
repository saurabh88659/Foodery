import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './Routes';
import Offersscreen from '../Screens/Offersscreen';

const Stack = createNativeStackNavigator();
function OffersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.OFFERS_SCREEN}
        component={Offersscreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default OffersStack;
