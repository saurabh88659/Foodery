import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FruitsVegetables from '../Screens/FruitsVegetables';
import HomeScreen from '../Screens/HomeScreen';
import SubCategories from '../Screens/SubCategories';
import ProfileScreen from '../Screens/ProfileScreen';

const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FruitsVegetables"
        component={FruitsVegetables}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubCategories"
        component={SubCategories}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
