import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../utils/Colors';
import HomeStack from './HomeStack';
import MoreStack from './MoreStack';
import {
  IonIcon,
  FoundationIcon,
  FontAwesomeIcon,
  shoppingbagIcon,
  shoppingcartIcon,
} from '../utils/Const';
import OffersStack from './OffersStack';
import WishlistStack from './WishlistStack';
import CartStack from './CartStack';
import {Image, View} from 'react-native';
import {heightPixel, widthPixel} from '../Components/Dimensions';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (
    routeName === 'FruitsVegetables' ||
    routeName === 'SubCategories' ||
    routeName === 'ProfileScreen' ||
    routeName === 'OrderHistory' ||
    routeName === 'Notification' ||
    routeName === 'AddressScreen' ||
    routeName === 'AddressScreenWithMap'
  ) {
    return 'none';
  }
  return 'flex';
};

function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarHideOnKeyboard={true}
      screenOptions={{
        showLabel: false,
        headerShown: true,
        tabBarActiveTintColor: COLORS.GREEN,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          backgroundColor: COLORS.WHITE,
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          headerShown: false,
          tabBarColor: COLORS.BLUE,
          tabBarIcon: ({focused}) => (
            <Image
              source={shoppingcartIcon}
              style={{
                height: heightPixel(27),
                width: widthPixel(30),
                tintColor: focused ? COLORS.GREEN : COLORS.GRAYDARK,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistStack}
        options={{
          headerShown: false,
          tabBarColor: COLORS.BLUE,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              title={'heart-o'}
              size={26}
              IconColor={focused ? COLORS.GREEN : COLORS.GRAYDARK}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {display: getTabBarVisibility(route)},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 50,
                backgroundColor: COLORS.GREEN,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -35,
                elevation: 10,
              }}>
              <IonIcon
                title="ios-home-sharp"
                size={28}
                IconColor={focused ? COLORS.WHITE : COLORS.WHITE}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Offers"
        component={OffersStack}
        options={{
          headerShown: false,
          tabBarColor: COLORS.BLUE,
          tabBarIcon: ({focused}) => (
            <Image
              source={shoppingbagIcon}
              style={{
                height: heightPixel(27),
                width: widthPixel(27),
                tintColor: focused ? COLORS.GREEN : COLORS.GRAYDARK,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreStack}
        options={({route}) => ({
          tabBarStyle: {display: getTabBarVisibility(route)},
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FoundationIcon
              title="indent-more"
              size={28}
              IconColor={focused ? COLORS.GREEN : COLORS.GRAYDARK}
            />
          ),
        })}
      />

      {/* <Tab.Screen
        name="More"
        component={MoreStack}
        options={{
          headerShown: false,
          tabBarColor: COLORS.BLUE,
          tabBarIcon: ({focused}) => (
            <FoundationIcon
              title="indent-more"
              size={28}
              IconColor={focused ? COLORS.GREEN : COLORS.GRAYDARK}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default BottomTabBar;
