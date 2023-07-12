import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BASE_URL,
  EntypoIcon,
  IonIcon,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  Yourordericonebox,
  yourirdercallsicon,
} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
// import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Lottie from 'lottie-react-native';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

export default function YourOrder({navigation}) {
  const [visible, setVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderdataOne, setOrderdataOne] = useState({});
  const IsFocused = useIsFocused();

  const Locations = useSelector(state => state.locationReducer);
  const cartdatapass = useSelector(state => state.CartDatapassSlices.cartdata);
  console.log('cartdatapass---------->>>>>', orderdataOne);

  useEffect(() => {
    _Order_Details();
  }, [IsFocused]);

  const _Order_Details = async () => {
    const token = await _getStorage('token');
    console.log(token);
    // setIsloading(true);

    axios
      .get(BASE_URL + `/getPaymentData/${cartdatapass._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('order data- Details---------->>', response?.data?.result);
        setOrderDetails(response?.data?.result?.orderedProducts);
        setOrderdataOne(response?.data?.result);
        // setIsloading(false);
      })
      .catch(error => {
        console.log(
          'catch error order data Details ------>>>',
          error.response.data.messsge,
        );
        // setIsloading(false);
      });
  };

  const Cancelled_Booking = async () => {
    const token = await _getStorage('token');

    console.log('orderdataOne?._id', orderdataOne?._id);
    axios
      .put(
        BASE_URL + `/cancelBooking/${orderdataOne?._id}`,
        {},

        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(response => {
        console.log('response cancelled booking', response?.data);
      })
      .catch(error => {
        console.log('catch cancelled error------->>>>>>', error.response.data);
      });
  };

  const makePhoneCall = () => {
    const phoneNumber = '7827902351'; // Replace with the desired phone number

    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Your Order'}
        onPress={() => navigation.goBack()}
        UIBACK={
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.WHITE}
          />
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {/* <View style={Styles.bottomNavigationView}>
          <View style={Styles.MAPBOX}>
            {Locations && (
              <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={{
                  latitude: Locations.latitude,
                  longitude: Locations.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                showsUserLocation={true}
                provider="google">
                <Marker
                  coordinate={{
                    latitude: Locations.latitude,
                    longitude: Locations.longitude,
                  }}
                  // title={address}
                  title="Noida scetor 62"
                />
              </MapView>
            )}
          </View>
        </View> */}
        <View>
          <View activeOpacity={0.4} style={Styles.QBOXBOT}>
            <Lottie
              source={require('../Assets/Lottiejson/58352-delivery-boy.json')}
              autoPlay
              loop={true}
              style={{height: heightPixel(90)}}
            />
            <View style={{width: widthPixel(200)}}>
              <Text style={{fontSize: fontPixel(15), color: COLORS.BLACK}}>
                Your Delivery Partner will be assigned soon
              </Text>
              <Text
                style={{
                  fontSize: fontPixel(15),
                  color: COLORS.BLACK,
                  paddingTop: 5,
                }}>
                +91 7739*******980
              </Text>
            </View>
          </View>
        </View>
        <View style={Styles.CONTEXTONEQ}>
          <Text style={Styles.TEXTONEQ}>Order Summary</Text>
        </View>

        <View style={Styles.cartBox}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              // paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image source={Yourordericonebox} style={Styles.iconeimage} />
              <View style={{paddingLeft: heightPixel(20)}}>
                <Text style={Styles.TEXTONEQ}>
                  {orderdataOne?.storeName} Store
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: COLORS.BLACK,
                    fontSize: fontPixel(14),
                    width: widthPixel(220),
                  }}>
                  By passing data through props, you can send various types of
                  values, such as strings, numbers, objects,
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={makePhoneCall} activeOpacity={0.6}>
              <Image
                source={yourirdercallsicon}
                style={{height: heightPixel(45), width: widthPixel(40)}}
              />
            </TouchableOpacity>
          </View>
          <View style={Styles.MAINCONTAINERMAIN}>
            {orderDetails.map((item, index) => (
              <View key={index} style={Styles.MAINBOX}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={{uri: item?.productId?.productImage}}
                    style={Styles.IMAGESTYLES}
                  />
                  <View style={Styles.QTEXTBOX}>
                    <View>
                      <Text numberOfLines={1} style={Styles.QTEXTNAME}>
                        {item?.productId?.productName}
                      </Text>
                      <Text
                        style={
                          Styles.QSUBTITEL
                        }>{`Pack:${item?.productId?.productUnit}`}</Text>
                      <Text
                        style={
                          Styles.QSUBTITEL
                        }>{`Pack:${item?.productId?.productUnit}`}</Text>
                      <Text
                        style={
                          Styles.QSUBTITEL
                        }>{`Qty: ${item?.quantity} Pack`}</Text>
                    </View>
                    <Text
                      style={
                        Styles.QPRICES
                      }>{`Total: ₹${item?.productId?.productPrice}`}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View style={Styles.PRICEBOX}>
            <View style={Styles.ROWBOX}>
              <Text numberOfLines={1} style={Styles.ROWTEXT}>
                Item Total
              </Text>
              <Text numberOfLines={1} style={Styles.ROWTEXT}>
                {`Rs.${'322'}`}
              </Text>
            </View>
            <View style={Styles.ROWBOX}>
              <Text
                numberOfLines={1}
                style={[
                  Styles.ROWTEXT,
                  {
                    color: COLORS.GRAYDARK,
                    fontSize: 15,
                    fontWeight: 'normal',
                  },
                ]}>
                Handling Charges{' '}
                <Text style={{color: COLORS.GREEN, fontSize: 12}}>
                  (Rs.24 Saved)
                </Text>
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  Styles.ROWTEXT,
                  {
                    fontWeight: 'normal',
                    fontSize: 14,
                    // textDecorationLine: 'line-through',
                  },
                ]}>
                Rs.15{' '}
                <Text
                  style={{
                    color: COLORS.GREEN,
                    fontWeight: 'normal',
                    // textDecorationLine: 'line-through',
                  }}>
                  Rs.24
                </Text>
              </Text>
            </View>
            <View style={Styles.ROWBOX}>
              <Text
                numberOfLines={1}
                style={[
                  Styles.ROWTEXT,
                  {
                    color: COLORS.GRAYDARK,
                    fontSize: 15,
                    fontWeight: 'normal',
                  },
                ]}>
                Delivery Free{' '}
                <Text
                  style={{
                    color: COLORS.GREEN,
                    fontSize: 12,
                    fontWeight: 'normal',
                  }}>
                  (Rs.24 Saved)
                </Text>
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  Styles.ROWTEXT,
                  {
                    fontWeight: 'normal',
                    fontSize: 14,
                  },
                ]}>
                Rs.35{' '}
                <Text
                  style={{
                    color: COLORS.GREEN,
                    fontWeight: 'normal',
                  }}>
                  Rs.0
                </Text>
              </Text>
            </View>
            <View style={Styles.ROWBOX}>
              <Text numberOfLines={1} style={Styles.ROWTEXT}>
                To Pay
              </Text>
              <Text numberOfLines={1} style={Styles.ROWTEXT}>
                {`Rs.${'2555'}`}
              </Text>
            </View>
          </View>
        </View>
        {orderdataOne?.orderStatus === 'Order Placed' ? (
          <TouchableOpacity
            onPress={Cancelled_Booking}
            activeOpacity={0.6}
            style={{
              marginTop: 20,
              width: widthPixel(150),
              height: heightPixel(50),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.GREEN,
              borderRadius: 4,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                fontWeight: '500',
                letterSpacing: 0.6,
              }}>
              Cancel Booking
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  bottomNavigationView: {
    backgroundColor: COLORS.WHITE,
    height: heightPixel(250),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  MAPBOX: {
    marginTop: 10,
    height: heightPixel(250),
    backgroundColor: COLORS.GREEN,
    elevation: 9,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  QBOXBOT: {
    height: heightPixel(100),
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    marginVertical: 20,
  },
  CONTEXTONEQ: {
    paddingHorizontal: 15,
    top: heightPixel(-10),
  },
  TEXTONEQ: {
    fontSize: fontPixel(19),
    fontWeight: '500',
    color: COLORS.BLACK,
    letterSpacing: 0.3,
  },
  cartBox: {
    // height: heightPixel(300),
    marginHorizontal: 15,
    // borderWidth: 1,
    elevation: 10,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
  },
  iconeimage: {
    height: heightPixel(60),
    width: widthPixel(60),
  },
  MAINCONTAINERMAIN: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 10,
    borderRadius: 15,
    // paddingHorizontal: 20,
  },
  MAINBOX: {
    marginVertical: 3,
    // backgroundColor: 'red',
    paddingVertical: heightPixel(10),
    // paddingHorizontal: 20,
    // marginHorizontal: 20,
    flexWrap: 'wrap',
  },
  IMAGESTYLES: {
    height: heightPixel(60),
    width: widthPixel(60),
    resizeMode: 'contain',
  },
  PRODUCTTEXT: {
    color: COLORS.BLACK,
    paddingLeft: widthPixel(10),
  },
  QTEXTBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: widthPixel(20),
  },
  QTEXTNAME: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    fontWeight: '500',
    letterSpacing: 0.3,
    width: widthPixel(200),
  },
  QSUBTITEL: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(14),
    letterSpacing: 0.3,
    paddingTop: heightPixel(5),
  },
  QPRICES: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  PRICEBOX: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: COLORS.GRAYDARK,
  },
  ROWBOX: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  ROWTEXT: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(17),
  },
});
