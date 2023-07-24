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
import {Image, StyleSheet, Text, View} from 'react-native';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
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
    routeName === 'OrderHistoryMain' ||
    routeName === 'OrderHistoryMain' ||
    routeName === 'OrderDetails'
  ) {
    return 'none';
  }
  return 'flex';
};

function BottomTabBar() {
  const cartdata = useSelector(state => state.CartReducerSlice.cart);

  return (
    <Tab.Navigator
      initialRouteName={Routes.TAB_HOME}
      tabBarHideOnKeyboard={true}
      backBehavior="none"
      screenOptions={{
        showLabel: false,
        headerShown: true,
        tabBarActiveTintColor: COLORS.GREEN,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tab,
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 11,
        },
      }}>
      <Tab.Screen
        name={Routes.TAB_CART}
        component={CartStack}
        options={{
          headerShown: false,
          tabBarColor: COLORS.BLUE,
          tabBarIcon: ({focused}) => (
            <View style={[styles.btnInactive, focused && styles.btnActive]}>
              <Badge
                style={{top: -8, zIndex: +99999, position: 'absolute'}}
                size={19}>
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
              {focused ? <Text style={styles.hindentext}>Cart</Text> : null}
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
            <View style={[styles.btnInactive, focused && styles.btnActive]}>
              <FontAwesomeIcon
                title={'heart-o'}
                size={25}
                IconColor={focused ? COLORS.GREEN : COLORS.GRAYDARK}
              />
              {focused ? <Text style={styles.hindentext}>Wishlist</Text> : null}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={Routes.TAB_HOME}
        component={HomeStack}
        options={({route, tabBarStyle}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: COLORS.WHITE,
            height: 65,
            alignItems: 'center',
            // position: 'absolute',
            borderTopWidth: 2,
            borderTopColor: COLORS.GRAYDARK,
            elevation: 10,
            borderTopRightRadius: 45 / 4,
            borderTopLeftRadius: 45 / 4,
          },
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={[styles.btnInactive, focused && styles.btnActive]}>
              <IonIcon
                title="ios-home-sharp"
                size={25}
                IconColor={focused ? COLORS.GREEN : COLORS.GRAYDARK}
              />
              {focused ? <Text style={styles.hindentext}>Home</Text> : null}
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
            <View style={[styles.btnInactive, focused && styles.btnActive]}>
              <Image
                source={shoppingbagIcon}
                style={{
                  height: heightPixel(25),
                  width: widthPixel(25),
                  tintColor: focused ? COLORS.GREEN : COLORS.GRAYDARK,
                }}
              />
              {focused ? <Text style={styles.hindentext}>Offers</Text> : null}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={Routes.TAB_MERE}
        component={MoreStack}
        options={({route, tabBarStyle}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: COLORS.WHITE,
            height: 65,
            alignItems: 'center',
            // position: 'absolute',
            borderTopWidth: 2,
            borderTopColor: COLORS.GRAYDARK,
            elevation: 10,
            borderTopRightRadius: 45 / 4,
            borderTopLeftRadius: 45 / 4,
          },
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={[styles.btnInactive, focused && styles.btnActive]}>
              <FoundationIcon
                title="indent-more"
                size={25}
                IconColor={focused ? COLORS.GREEN : COLORS.GRAYDARK}
              />
              {focused ? <Text style={styles.hindentext}>More</Text> : null}
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export default BottomTabBar;

const styles = StyleSheet.create({
  tab: {
    backgroundColor: COLORS.WHITE,
    height: 65,
    alignItems: 'center',
    // position: 'absolute',
    borderTopWidth: 2,
    borderTopColor: COLORS.GRAYDARK,
    elevation: 10,
    borderTopRightRadius: 45 / 4,
    borderTopLeftRadius: 45 / 4,
  },
  btnActive: {
    backgroundColor: COLORS.LIGHTGREEN,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: widthPixel(100),
    // paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: heightPixel(46),
  },
  btnInactive: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 60,
    borderRadius: 45 / 4,
  },
  hindentext: {
    color: COLORS.BLACK,
    fontSize: fontPixel(17),
    fontWeight: '500',
    paddingLeft: widthPixel(6),
  },
});
