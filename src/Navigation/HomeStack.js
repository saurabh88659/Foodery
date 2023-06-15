import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FruitsVegetables from '../Screens/FruitsVegetables';
import HomeScreen from '../Screens/HomeScreen';
import SubCategories from '../Screens/SubCategories';
import ProfileScreen from '../Screens/ProfileScreen';
import AddressScreen from '../Screens/AddressScreen';
import AddressScreenWithMap from '../Screens/AddressScreenWithMap';
import SubCategriesModal from '../Screens/SubCategriesModal';
import Routes from './Routes';
import ProdcutsItem from '../Screens/ProdcutsItem';
import NutsDryFruits from '../Screens/NutsDryFruits';

const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.HOME_SCREEN}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.FRUITS_VEGETABLES}
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
      <Stack.Screen
        name={Routes.ADDRESS_SCREEN}
        component={AddressScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddressScreenWithMap"
        component={AddressScreenWithMap}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.SUB_CATEGRIES_MODAL}
        component={SubCategriesModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.PRODUCT_ITEM}
        component={ProdcutsItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.NUTS_DREY_FRUITS}
        component={NutsDryFruits}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
