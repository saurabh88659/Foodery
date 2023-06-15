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
import Routes from './Routes';
import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';
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
    routeName === 'AddressScreenWithMap' ||
    routeName === 'ProdcutsItem' ||
    routeName === 'TermsCondition' ||
    routeName === 'PrivacyPolicy' ||
    routeName === 'AboutUs' ||
    routeName === 'Notification' ||
    routeName === 'OrderHistory' ||
    routeName === 'NutsDryFruits' ||
    routeName === 'OrderHistoryMain'
  ) {
    return 'none';
  }
  return 'flex';
};

function BottomTabBar() {
  const cartdata = useSelector(state => state.CartReducerSlice.cart);

  console.log('cartdata', cartdata.length);

  return (
    <Tab.Navigator
      initialRouteName={Routes.TAB_HOME}
      tabBarHideOnKeyboard={true}
      backBehavior="none"
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
        name={Routes.TAB_CART}
        component={CartStack}
        options={{
          headerShown: false,
          tabBarColor: COLORS.BLUE,
          tabBarIcon: ({focused}) => (
            <View style={{}}>
              <Badge style={{top: 10, zIndex: +99999}} size={19}>
                {cartdata.length}
              </Badge>
              <Image
                source={shoppingcartIcon}
                style={{
                  height: heightPixel(27),
                  width: widthPixel(30),
                  tintColor: focused ? COLORS.GREEN : COLORS.GRAYDARK,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={Routes.TAB_WISHLIST}
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
        name={Routes.TAB_HOME}
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
        name={Routes.TAB_OFFERS}
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
        name={Routes.TAB_MERE}
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
    </Tab.Navigator>
  );
}

export default BottomTabBar;
