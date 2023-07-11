import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/Colors';
import {
  EntypoIcon,
  LogoutIcon,
  OrderHistoryicon,
  PrivacyPolicyIcon,
  RateIconreview,
  TermsCondition,
  UpcomminIcon,
  Wishlisticon,
  carticon,
  notificationIcon,
} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import MyModalinfo from '../Components/MyModalinfo';
import Routes from '../Navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MoreScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const _Logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('isLoggedIn');
    setModalVisible(!modalVisible);
    navigation.navigate(Routes.LOG_IN_SCREEN);
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <View style={Styles.MainBOx}>
        <View style={Styles.HEADERBOX}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.HOME_SCREEN)}>
            <EntypoIcon title="cross" size={35} IconColor={COLORS.GRAYDARK} />
          </TouchableOpacity>
          <Text style={Styles.HEADERTITLE}>Good Morning Akila!</Text>
        </View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.YOUR_ORDER)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={OrderHistoryicon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Your Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.ORDER_HISTORY)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={OrderHistoryicon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.TAB_WISHLIST)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={Wishlisticon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.TAB_CART)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={carticon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>My Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.NOTIFICATION)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={notificationIcon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.TAB_OFFERS)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={UpcomminIcon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Upcoming Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.ABOUT_US)}
            TermsCondition
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={RateIconreview} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.TERMS_CONDITION)}
            PrivacyPolicy
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={TermsCondition} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Terms & Condition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.PRIVACY_POLICY)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={PrivacyPolicyIcon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            activeOpacity={0.6}
            style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}>
              <Image source={LogoutIcon} style={Styles.iconstyle} />
            </View>
            <Text style={Styles.boxTitle}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <MyModalinfo
        type={'log-out'}
        _YES={_Logout}
        _NO={() => {
          setModalVisible(!modalVisible);
        }}
        isModal={modalVisible}
        _Visible={() => setModalVisible(!modalVisible)}
      />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  MainBOx: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    elevation: 10,
    marginVertical: '5%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  HEADERBOX: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },
  HEADERTITLE: {
    fontSize: fontPixel(20),
    fontWeight: '500',
    color: COLORS.BLACK,
    paddingLeft: '5%',
    letterSpacing: 0.3,
  },
  GreenBoxMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 5,
  },
  Greenbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconstyle: {
    height: heightPixel(55),
    width: widthPixel(50),
    resizeMode: 'contain',
  },
  boxTitle: {
    paddingLeft: '3%',
    color: COLORS.BLACK,
    fontSize: fontPixel(19),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
