import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MyHeader from '../Components/MyHeader';
import {
  BASE_URL,
  FontAwesomeIcon,
  IonIcon,
  MaterialCommunityIconsTwo,
  MaterialIconsIcon,
  SimpleToast,
  bannerIcon,
  cartemptyIcon,
} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
// import GlobelStyles from '../utils/GlobelStyles';a
import Button from '../Components/Button';
import Routes from '../Navigation/Routes';
import {useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  getCartTotal,
  incrementQuantity,
  removeFromCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import {useDispatch} from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
} from '../Redux/ReducerSlice/WishlistReducerSlice';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {fetchApiData} from '../Redux/ReducerSlice/cartapiSlice';
import Lottie from 'lottie-react-native';
import MyModalinfo from '../Components/MyModalinfo';
import {WebView} from 'react-native-webview';
import WebViewHeader from '../Components/WebViewHeader';
import MyHeaderNo2 from '../Components/MyHeaderNo2';

export default function CartScreen({navigation}) {
  const [order_Might_Missed, setOrder_Might_Missed] = useState([]);
  const IsFocused = useIsFocused();
  const productDataByRe = useSelector(state => state.CartReducerSlice.cart);
  const wishlist = useSelector(state => state.WishlistReducerSlice.wishlist);
  const dispatch = useDispatch();
  const [orderKey, setOrderKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const [payLoading, setPayLoading] = useState(true);
  const [state, setState] = useState({
    isLoading: false,
  });
  const [paidmess, setPaidmess] = useState('');
  const [statusId, setStatusId] = useState('');

  const webviewRef = useRef(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [showWebView, setShowWebView] = useState(false);

  // console.log('orderKey------>>', orderKey);

  const addressCurrent = useSelector(
    state => state.AddressLSlice.currentAddress,
  );

  console.log('addressCurrent--------DG-', addressCurrent);

  const totalprice = useSelector(state => state.CartReducerSlice.totalPrice);
  const totalQuantity = useSelector(
    state => state.CartReducerSlice.totalQuantity,
  );
  const totaldisPrice = useSelector(
    state => state.CartReducerSlice.discountTotalPrice,
  );

  useEffect(() => {
    dispatch(getCartTotal());
  }, [productDataByRe]);

  // const apiData = useSelector(state => state.apiSlice);

  useEffect(() => {
    apidataNew();
  }, [dispatch]);

  const apidataNew = async () => {
    const token = await _getStorage('token');
    dispatch(fetchApiData(token));
  };

  useEffect(() => {
    if (IsFocused) {
      _Order_Might_Missed();
    }
  }, [IsFocused]);

  const _Order_Might_Missed = async () => {
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/getAllshowCarts`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log('_Order_Might_Missed=========', response.data.categoryData);
        setOrder_Might_Missed(response.data.categoryData);
      })
      .catch(error => {
        console.log('_Order_Might_Missed catch Error', error);
      });
  };

  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };
  const addItemToCart = item => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = item => {
    dispatch(removeFromCart(item));
  };
  const addtoWishlist = value => {
    if (value) {
      dispatch(addToWishlist(value));
      SimpleToast({title: 'added to the wishlist.', isLong: true});
    }
  };
  const removeItemFromWishlist = value => {
    dispatch(removeFromWishlist(value));
    SimpleToast({title: 'removed from the wishlist.', isLong: true});
  };

  const _Handle_Cart_Data = async () => {
    const token = await _getStorage('token');
    console.log(token);
    let arr = [];
    {
      productDataByRe.map((item, index) => {
        arr.push({productId: item._id, quantity: item.quantity});
      });
    }

    const objcartdata = {
      orderedProducts: arr,
      totalAmount: totalprice,
      delieveryAddress: {
        address: 'abc',
        city: 'abc',
        state: 'abc',
        pin: '201310',
      },
    };

    const statusobj = {
      paymentId: orderKey,
      _id: statusId,
      paid: true,
      status: 'Successful',
    };

    axios
      .post(BASE_URL + `/addOrder`, objcartdata, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('Response api ------------->>>>', response?.data);
        setStatusId(response?.data?.result?._id);

        axios
          .put(BASE_URL + `/updatePaymentStatus`, statusobj, {
            headers: {Authorization: `Bearer ${token}`},
          })
          .then(res => {
            console.log('status----------paid', res.data);
          })
          .catch(error => {
            console.log('status catch error', error);
          });
      })
      .catch(error => {
        console.log(
          'add to cart data catch error',
          error.response.data.message,
        );
      });
  };

  const _Payment_Handle = async () => {
    const token = await _getStorage('token');
    setState({
      ...state,
      isLoading: true,
    });

    const dataPayment = {
      RedirectUrl: '',
      OrderAmount: totalprice,
      ProductData: {PaymentReason: "''", ItemId: "''", AppName: 'fooderyApp'},
      CustomerData: {
        MobileNo: '7739688360',
        Email: 'dablugupta7739@gmail.com',
        CustomerId: '648beac299f3ad5d8b4059b5',
      },
    };

    axios
      .post(BASE_URL + `/payG/createOrder`, dataPayment, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log(
          'Response api payment API ------------->>>>',
          response.data,
        );

        if (response?.data?.message === 'Payment Url Generated') {
          const paymentLink = response?.data?.paymnetProcessUrl;

          setOrderKey(response?.data?.orderKeyId);
          Linking?.openURL(paymentLink);
          setModalVisible(true);
          setState({
            ...state,
            isLoading: false,
          });
        }
      })
      .catch(error => {
        console.log(
          'Payment  API catch error ',
          error?.response?.data?.message,
        );
        setState({
          ...state,
          isLoading: false,
        });
      });
  };

  const _Payment_Check_Handle = async () => {
    const token = await _getStorage('token');
    setState({
      ...state,
      isLoading: true,
    });
    axios
      .get(BASE_URL + `/payG/orderDetail/${orderKey}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(
          'Response api _Payment_Check_Handle ------------->>>>',
          res?.data,
        );
        setPaidmess(res?.data?.OrderPaymentStatusText);
        if (res?.data?.OrderPaymentStatusText == 'Pending') {
          setModalVisible(true);
        } else if (res?.data?.OrderPaymentStatusText == 'Paid') {
          setModalVisible(false);
          _Handle_Cart_Data();
        }
      })
      .catch(error => {
        setState({
          ...state,
          isLoading: false,
        });
        console.log(
          'Payment  API _Payment_Check_Handle catch error ',
          error?.response?.data?.message,
        );
      });
  };

  const openWebView = () => {
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = newNavState => {
    setCurrentUrl(newNavState.url);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader
        onPressserchbar={() => navigation.navigate(Routes.SEARCH_BAR)}
        title={'Shopping Cart'}
        onPress={() => navigation.goBack()}
      />
      {productDataByRe?.length !== 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{paddingBottom: 15}}>
          <View style={Styles.LOCATIONMAINBOX}>
            <View style={Styles.SUBTITLELOCATIONS}>
              <IonIcon
                title="ios-location-sharp"
                size={23}
                IconColor={COLORS.BLACK}
              />
              <Text numberOfLines={1} style={Styles.SUBTITLELOCATIONS2}>
                {/* Current Locations Current
                 */}
                {addressCurrent}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
              activeOpacity={0.6}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIconsIcon
                title="keyboard-arrow-down"
                size={25}
                IconColor={COLORS.BLACK}
                IconStyle={{right: widthPixel(7)}}
              />
              <Text style={Styles.SUBTITLELOCATIONS3}>Change Address</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 5}}
            data={productDataByRe}
            renderItem={({item, index}) => (
              <View style={Styles.MAINCARD}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item?.productImage}}
                    style={Styles.IMAGESTYLES}
                  />
                  <View style={{paddingLeft: widthPixel(20)}}>
                    <Text numberOfLines={1} style={Styles.MAINTITEL}>
                      {item?.productName}
                    </Text>
                    <Text
                      style={
                        Styles.DISPRICE
                      }>{`Rs.${item?.discountPrice}`}</Text>
                    <Text
                      style={Styles.PRICES}>{`Rs.${item?.productPrice}`}</Text>
                  </View>
                </View>
                <View>
                  <View style={Styles.CONBOXRIGHT}>
                    <Text style={Styles.SAVEPRICES}>Rs. 100 saved</Text>
                    <TouchableOpacity
                      onPress={() => removeItemFromCart(item)}
                      activeOpacity={0.6}>
                      <MaterialCommunityIconsTwo
                        title="delete"
                        size={25}
                        IconColor={COLORS.BLACK}
                        IconStyle={{right: widthPixel(7)}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.CONTAINERMAINBOXPLUS}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item)}
                      activeOpacity={0.6}
                      style={Styles.DCREAMENTBOTTONINCREAMENT}>
                      <Text style={Styles.TOTALITEMTITLE}>-</Text>
                    </TouchableOpacity>
                    <Text style={Styles.TOTALITEMTITLE}>{item?.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(item)}
                      activeOpacity={0.6}
                      style={Styles.DCREAMENTBOTTONINCREAMENT}>
                      <Text style={Styles.TOTALITEMTITLE}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <View
            style={{
              marginVertical: 8,
            }}>
            <Text style={Styles.MIGHTSTYLESTITLE}>You Might Have Missed</Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 5}}
              horizontal
              data={order_Might_Missed}
              renderItem={({item, index}) => (
                <View key={index}>
                  <Productinfo
                    key={index}
                    HeartUI={
                      <View>
                        {wishlist.some(value => value?._id == item?._id) ? (
                          <TouchableOpacity
                            onPress={() => removeItemFromWishlist(item)}
                            style={[Styles.CONTAINERHEART]}>
                            <FontAwesomeIcon
                              title={'heart'}
                              size={20}
                              IconColor={COLORS.BROWN}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => addtoWishlist(item)}
                            style={[Styles.CONTAINERHEART]}>
                            <FontAwesomeIcon
                              title={'heart-o'}
                              size={20}
                              IconColor={COLORS.GRAYDARK}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    }
                    Productimage={{uri: item?.productImage}}
                    ProductName={item?.productName}
                    ProductSubName={item?.productUnit}
                    discountPrice={item?.discountPrice}
                    ProductPrice={item?.productPrice}
                    UIBotton={
                      <View>
                        {productDataByRe.map((value, index) => (
                          <View key={value?._id}>
                            {value?._id == item?._id ? (
                              <View style={Styles.INCREAMENTBOTTONMAIN}>
                                <TouchableOpacity
                                  onPress={() => decreaseQuantity(value)}>
                                  <Text style={Styles.DCREAMENTTITLE}>-</Text>
                                </TouchableOpacity>
                                <Text style={Styles.ITEMTITEL}>
                                  {value.quantity}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => increaseQuantity(value)}>
                                  <Text style={Styles.INCREAMENTTITLE}>+</Text>
                                </TouchableOpacity>
                              </View>
                            ) : null}
                          </View>
                        ))}
                        {productDataByRe.some(
                          value => value._id == item._id,
                        ) ? null : (
                          <TouchableOpacity
                            onPress={() => addItemToCart(item)}
                            activeOpacity={0.5}
                            style={Styles.ADDBOTTONSTYL}>
                            <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    }
                  />
                </View>
              )}
            />
          </View>

          <View style={Styles.TOTALBOXSTY}>
            <View style={Styles.SUBBOX}>
              <Text style={Styles.TOTALTITLES}>Item Total</Text>
              <Text style={[Styles.TOTALTITLES, {fontSize: fontPixel(20)}]}>
                {`Rs.${totalprice}`}
              </Text>
            </View>

            <View style={[Styles.SUBBOX, {marginTop: 5}]}>
              <Text style={Styles.HANDLINGTITLE}>
                Handling Charges
                <Text style={{color: COLORS.GREEN}}> (Rs.10 Saved)</Text>
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.DELIVERYTITLE}>Rs.15</Text>
                <Text style={Styles.FREEPRICES}>Rs.5</Text>
              </View>
            </View>

            <View
              style={[
                Styles.SUBBOX,
                {
                  borderBottomWidth: 0.2,
                  color: COLORS.LIGHTGREEN,
                  paddingVertical: 5,
                },
              ]}>
              <Text style={Styles.HANDLINGTITLE}>
                Delivery Free{' '}
                <Text style={{color: COLORS.GREEN}}>(Rs.36 Saved)</Text>
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.DELIVERYTITLE}>Rs.18</Text>
                <Text style={Styles.FREEPRICES}>Rs.8</Text>
              </View>
            </View>

            <View
              style={[
                Styles.SUBBOX,
                {alignItems: 'center', marginTop: 5, paddingVertical: 7},
              ]}>
              <Text style={Styles.TOTALTITLES}>To pay</Text>
              <Text style={[Styles.TOTALTITLES, {fontSize: fontPixel(20)}]}>
                {`Rs.${totalprice}`}
              </Text>
            </View>
            <View style={Styles.SAVETHISORDERTITLE}>
              <IonIcon
                title="ios-checkmark-circle"
                size={20}
                IconColor={COLORS.GREEN}
                IconStyle={{}}
              />
              <Text style={{color: COLORS.GREEN}}>
                {' '}
                <Text style={{fontSize: fontPixel(16), fontWeight: '500'}}>
                  Rs 91
                </Text>{' '}
                saved on this order
              </Text>
            </View>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 5, marginHorizontal: 10}}
            horizontal
            data={[1, 2, 3, 4]}
            renderItem={({item, index}) => (
              <View key={index} style={[Styles.DELIVERYBOX_FOOTER]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIconsTwo
                    title="bell-ring"
                    size={30}
                    IconColor={COLORS.BLACK}
                    IconStyle={{}}
                  />
                  <View>
                    <Text style={Styles.DELTITLE}>No Contact Delivery</Text>
                    <Text numberOfLines={3} style={Styles.DELSUBTITLE}>
                      Delivery Partner will leave your order at your door
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
          <View
            style={[
              Styles.DELIVERYBOX_FOOTER,
              {
                backgroundColor: COLORS.WHITE,
                marginTop: 5,
                borderColor: COLORS.GRAYDARK,
                elevation: 4,
                marginHorizontal: 15,
                borderWidth: 0,
              },
            ]}>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={Styles.DELTITLE}>Order For Someone else</Text>
                <Text style={[Styles.DELTITLE, {color: COLORS.GREEN}]}>
                  ADD
                </Text>
              </View>
              <Text numberOfLines={3} style={Styles.FOOTERTITLE2}>
                Add a message to be sent as an SMS with your Gift
              </Text>
            </View>
          </View>
          <View
            style={[
              Styles.DELIVERYBOX_FOOTER,
              {
                backgroundColor: COLORS.WHITE,
                marginTop: 5,
                borderColor: COLORS.GRAYDARK,
                elevation: 4,
                marginHorizontal: 15,
                borderWidth: 0,
              },
            ]}>
            <View>
              <Text style={Styles.DELTITLE}>Cancellation Policy</Text>
              <Text numberOfLines={3} style={Styles.FOOTERTITLE2}>
                Order Cannot be Cancelled once packed for delivery. in case of
                unexpected delays, a refund will be provider.if applicable
              </Text>
            </View>
          </View>
          <View style={{marginVertical: 15}}>
            <Button
              title={'Choose address at next step   ▶'}
              onPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
              // onPress={_Handle_Cart_Data}
              // onPress={_Payment_Handle}
            />

            {/* <Button
              title={
                state.isLoading ? (
                  <View style={Styles.activStylesIndicator}>
                    <ActivityIndicator color={COLORS.LIGHTGREEN} />
                    <Text style={Styles.activeStylesTitleIndicator}>
                      Payment Proceed
                    </Text>
                  </View>
                ) : (
                  'Payment Proceed'
                )
              }
              // onPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
              // onPress={_Handle_Cart_Data}
              onPress={_Payment_Handle}
            /> */}

            {/* {!showWebView && ( */}
            <Button
              title={
                state.isLoading ? (
                  <View style={Styles.activStylesIndicator}>
                    <ActivityIndicator color={COLORS.LIGHTGREEN} />
                    <Text style={Styles.activeStylesTitleIndicator}>
                      Payment Proceed
                    </Text>
                  </View>
                ) : (
                  'Payment Proceed'
                )
              }
              // onPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
              // onPress={_Handle_Cart_Data}
              onPress={_Payment_Handle}
            />
            {/* )} */}

            {/* {showWebView && (  */}
            {/* <View style={{flex: 1}}> */}
            {/* <WebViewHeader title={currentUrl} goBack={handleGoBack} /> */}
            {/* <MyHeaderNo2
                  title={'Paymnet'}
                  onPress={() => navigation.goBack()}
                />
                <WebView
                  ref={webviewRef}
                  source={{
                    uri: 'https://www.npmjs.com/package/@react-native-community/cli-platform-android',
                  }}
                  onNavigationStateChange={handleWebViewNavigationStateChange}
                  style={{flex: 1, backgroundColor: 'red'}}
                /> */}
            {/* </View> */}
            {/* )} */}
          </View>
        </ScrollView>
      ) : (
        <View style={Styles.EMPTYBOXMAIN}>
          <Lottie
            source={cartemptyIcon}
            autoPlay
            loop={true}
            style={{height: heightPixel(300)}}
          />
          <Text style={Styles.EMPRTYTITLEONE}>Your cart is empty</Text>
          <Text style={Styles.EMPTYTITLETWO}>
            You have no items in your shopping cart. Let's go buy something!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.TAB_HOME)}
            style={Styles.shopbutton}>
            <Text style={Styles.ShopText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}

      <MyModalinfo
        type={'payment_check'}
        _YES={() => setModalVisible(!modalVisible)}
        _PayUI={
          <View>
            <ActivityIndicator size="large" color={COLORS.LIGHTGREEN} />
          </View>
        }
        _NO={_Payment_Check_Handle}
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
  LOCATIONMAINBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    alignItems: 'center',
    marginVertical: 10,
  },
  SUBTITLELOCATIONS: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SUBTITLELOCATIONS2: {
    color: COLORS.BLACK,
    fontSize: fontPixel(17),
    fontWeight: '500',
    width: widthPixel(220),
    paddingLeft: 8,
    letterSpacing: 0.2,
  },
  SUBTITLELOCATIONS3: {
    color: COLORS.BLUE,
    fontSize: fontPixel(17),
    fontWeight: '500',
  },
  MAINCARD: {
    height: heightPixel(140),
    backgroundColor: COLORS.LIGHT_WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: COLORS.GRAYDARK,
  },
  IMAGESTYLES: {
    height: heightPixel(90),
    width: widthPixel(60),
    borderRadius: 10,
  },
  CONTAINERMAINBOXPLUS: {
    flexDirection: 'row',
    width: widthPixel(100),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPixel(40),
  },
  DCREAMENTBOTTONINCREAMENT: {
    paddingVertical: 3,
    width: widthPixel(33),
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.BLACK,
  },
  TOTALITEMTITLE: {color: COLORS.BLACK, fontSize: fontPixel(18)},
  MAINTITEL: {
    fontSize: fontPixel(18),
    color: COLORS.BLACK,
    fontWeight: '500',
    paddingBottom: 20,
    width: widthPixel(150),
  },
  DISPRICE: {
    color: COLORS.GRAYDARK,
    top: heightPixel(-10),
    textDecorationLine: 'line-through',
    fontSize: fontPixel(17),
  },
  PRICES: {
    fontSize: fontPixel(20),
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  CONBOXRIGHT: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SAVEPRICES: {
    fontSize: fontPixel(13),
    color: COLORS.GREEN,
    fontWeight: '500',
    paddingRight: 10,
  },
  MIGHTSTYLESTITLE: {
    fontSize: fontPixel(18),
    fontWeight: '500',
    color: COLORS.BLACK,
    marginHorizontal: 10,
    //   paddingVertical: 7,
    letterSpacing: 0.5,
  },
  TOTALBOXSTY: {height: heightPixel(200), backgroundColor: COLORS.LIGHT_WHITE},
  SUBBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    top: heightPixel(17),
  },
  TOTALTITLES: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(18),
  },
  HANDLINGTITLE: {color: COLORS.GRAYDARK, fontSize: fontPixel(17)},
  DELIVERYTITLE: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(17),
    paddingRight: 10,
    textDecorationLine: 'line-through',
  },
  FREEPRICES: {
    color: COLORS.GREEN,
    fontSize: fontPixel(17),
  },
  SAVETHISORDERTITLE: {
    paddingVertical: 3,
    backgroundColor: '#cbede1',
    alignItems: 'center',
    marginVertical: heightPixel(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  DELIVERYBOX_FOOTER: {
    // height: heightPixel(70),
    paddingVertical: 8,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    borderColor: COLORS.PURPLE,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    // backgroundColor: COLORS.LIGHT_WHITE,
  },
  DELTITLE: {
    paddingLeft: widthPixel(10),
    fontSize: fontPixel(16),
    color: COLORS.BLACK,
    fontWeight: '900',
  },
  DELSUBTITLE: {
    paddingLeft: widthPixel(10),
    fontSize: fontPixel(15),
    width: widthPixel(220),
    color: COLORS.GRAYDARK,
  },
  FOOTERTITLE2: {
    fontSize: fontPixel(15),
    color: COLORS.GRAYDARK,
    width: widthPixel(350),
    paddingLeft: widthPixel(10),
  },
  CONTAINERBOXMAIN: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 5,
    alignItems: 'center',
  },
  ADDBOTTONSTYL: {
    borderWidth: 1,
    borderColor: COLORS.PURPLE,
    paddingVertical: 4,
    width: widthPixel(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    top: -5,
  },
  BOTTONTEXTSTYL: {
    color: COLORS.PURPLE,
    fontWeight: '500',
    fontSize: fontPixel(13),
  },
  INCREAMENTBOTTONMAIN: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPixel(60),
    backgroundColor: COLORS.PURPLE,
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 4,
    top: -5,
  },
  DCREAMENTTITLE: {
    color: COLORS.WHITE,
    fontSize: 17,
    paddingVertical: 4,
  },
  ITEMTITEL: {
    color: COLORS.WHITE,
    fontSize: 13,
    paddingVertical: 4,
    fontWeight: '500',
  },
  INCREAMENTTITLE: {
    color: COLORS.WHITE,
    fontSize: 14,
    paddingVertical: 4,
  },
  CONTAINERHEART: {alignItems: 'flex-end', margin: 5},
  EMPTYBOXMAIN: {alignItems: 'center', justifyContent: 'center', flex: 1},
  EMPRTYTITLEONE: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(23),
    fontWeight: '500',
  },
  EMPTYTITLETWO: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(17),
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 5,
    marginHorizontal: '12%',
    letterSpacing: 0.5,
  },
  shopbutton: {
    backgroundColor: COLORS.DarkGreen2,
    marginVertical: 20,
    paddingVertical: 10,
    width: widthPixel(120),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  ShopText: {
    color: COLORS.WHITE,
    fontWeight: '500',
    fontSize: fontPixel(16),
  },
  activStylesIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStylesTitleIndicator: {
    color: COLORS.WHITE,
    fontSize: fontPixel(15),
    paddingLeft: 5,
  },
});
