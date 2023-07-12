import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyHeader from '../Components/MyHeader';
import Routes from '../Navigation/Routes';
import {COLORS} from '../utils/Colors';
import {_getStorage} from '../utils/Storage';
import Lottie from 'lottie-react-native';
import {
  BASE_URL,
  EntypoIcon,
  IonIcon,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import axios from 'axios';
import {BottomSheet} from 'react-native-btr';
import {useSelector} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';
import moment from 'moment';
import OrderDetailsShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/OrderDetailsShimmerPlaceHolder';

export default function OrderDetails({navigation, route}) {
  const OrderHistoryData = route.params;
  const [orderDetails, setOrderDetails] = useState([]);
  const [isorderdetails, setIsOrderDetails] = useState('');
  const [isloading, setIsloading] = useState(false);

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const Locations = useSelector(state => state.locationReducer);
  useEffect(() => {
    _Order_Details();
  }, []);

  const _Order_Details = async () => {
    const token = await _getStorage('token');
    console.log(token);
    setIsloading(true);
    axios
      .get(BASE_URL + `/User/getOneOrderData/${OrderHistoryData?._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('order data- Details---------->>', response?.data.result);
        setOrderDetails(response?.data?.result?.orderedProducts);
        setIsOrderDetails(response?.data?.result);
        setIsloading(false);
      })
      .catch(error => {
        console.log('catch error order data Details ------>>>', error);
        setIsloading(false);
      });
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader
        title={'Order Details'}
        onPress={() => navigation.goBack()}
        onPressserchbar={() => navigation.navigate(Routes.SEARCH_BAR)}
        UIBACK={
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.WHITE}
          />
        }
      />
      {isloading ? (
        <OrderDetailsShimmerPlaceHolder />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: 25}}>
          {OrderHistoryData?.orderStatus === 'processing' ? (
            <TouchableOpacity
              onPress={toggleBottomNavigationView}
              activeOpacity={0.4}
              style={Styles.QBOXBOT}>
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
            </TouchableOpacity>
          ) : (
            <View style={Styles.addressBox}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../Assets/Logo/delivery-man.png')}
                    style={Styles.imageicon}
                  />
                  <View style={{paddingLeft: widthPixel(10)}}>
                    <Text
                      style={
                        Styles.textorderid
                      }>{`Order Id: ${isorderdetails?.orderId}`}</Text>
                    <Text style={[Styles.textorderid]}>
                      {moment(isorderdetails?.delieveredAt).format(
                        'MMMM Do YYYY',
                      )}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: COLORS.WHITE,
                    paddingHorizontal: 10,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={[
                      Styles.textorderid,
                      {
                        color:
                          OrderHistoryData?.orderStatus === 'Order Placed'
                            ? 'red'
                            : OrderHistoryData?.orderStatus === 'Delivered'
                            ? '#0EC01d'
                            : OrderHistoryData?.orderStatus === 'Order Packed'
                            ? '#938'
                            : '#F1C114',
                      },
                    ]}>
                    {OrderHistoryData?.orderStatus}
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <Text style={[Styles.textorderid, {fontWeight: '900'}]}>
                  {isorderdetails?.user?.name}
                </Text>
                <Text style={[Styles.textorderid]}>
                  B-728 iTHUM TOWER, Block A, Industrial Area, Sector 62, Noida,
                  Uttar Pradesh 201309, India B-728 iTHUM TOWER, Block A,
                  Industrial Area, Sector 62, Noida, Uttar Pradesh 201309, India
                </Text>
              </View>
            </View>
          )}

          <View style={{marginHorizontal: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={require('../Assets/Logo/food-donation.png')}
                style={{height: 20, width: 20}}
              />
              <Text
                style={[
                  Styles.textorderid,
                  {fontWeight: '900', paddingLeft: 5},
                ]}>
                Item Details
              </Text>
            </View>
            <View style={Styles.MAINCONTAINERMAIN}>
              {orderDetails.map((item, index) => (
                <View key={index} style={Styles.MAINBOX}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  {`Rs.${OrderHistoryData?.totalAmount}`}
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
                  {`Rs.${OrderHistoryData?.totalAmount}`}
                </Text>
              </View>
            </View>
          </View>
          {OrderHistoryData?.orderStatus === 'Order Packed' ||
          OrderHistoryData?.orderStatus === 'Delivered' ||
          OrderHistoryData?.orderStatus === 'Cancelled' ? null : (
            <TouchableOpacity
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
          )}
        </ScrollView>
      )}

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            activeOpacity={0.6}
            style={Styles.CLOSEBTN}>
            <EntypoIcon title="cross" size={25} IconColor={COLORS.WHITE} />
          </TouchableOpacity>
          <View style={Styles.bottomNavigationView}>
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
                  />
                </MapView>
              )}
            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  addressBox: {
    backgroundColor: COLORS.LIGHTGREEN,
    // height: heightPixel(100),
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 10,
    borderRadius: 4,
    paddingHorizontal: 15,
  },
  imageicon: {
    height: heightPixel(50),
    width: widthPixel(50),
  },
  textorderid: {
    color: COLORS.BLACK,
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: 5,
  },
  MAINCONTAINERMAIN: {
    backgroundColor: COLORS.WHITE,
    // marginHorizontal: 10,
    borderRadius: 15,
  },
  MAINBOX: {
    marginVertical: 3,
    // marginHorizontal: 15,
    paddingVertical: heightPixel(10),
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
  bottomNavigationView: {
    backgroundColor: COLORS.WHITE,
    height: heightPixel(700),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  CLOSEBTN: {
    backgroundColor: COLORS.BLACK,
    height: heightPixel(50),
    width: widthPixel(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  MAPBOX: {
    marginTop: 10,
    height: heightPixel(600),
    backgroundColor: COLORS.GREEN,
    elevation: 9,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  QBOXBOT: {
    height: heightPixel(100),
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    marginVertical: 10,
  },
  PRICEBOX: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 10,
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
