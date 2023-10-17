import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MyHeader from '../Components/MyHeader';
import Collapsible from 'react-native-collapsible';

import {
  EntypoIcon,
  FontAwesomeIcon,
  IonIcon,
  MaterialCommunityIconsTwo,
  MaterialIconsIcon,
  SimpleToast,
  cartemptyIcon,
} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
// import GlobelStyles from '../utils/GlobelStyles';a
import Button from '../Components/Button';
import Routes from '../Navigation/Routes';
import {useSelector} from 'react-redux';
import {BottomSheet} from 'react-native-btr';

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
import {useIsFocused} from '@react-navigation/native';
import {fetchApiData} from '../Redux/ReducerSlice/cartapiSlice';
import Lottie from 'lottie-react-native';
import MyModalinfo from '../Components/MyModalinfo';
import {WebView} from 'react-native-webview';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import Toast from 'react-native-toast-message';
import {setCartdata} from '../Redux/ReducerSlice/CartDatapassSlices';
import GlobelStyles from '../utils/GlobelStyles';
import {useNavigation} from '@react-navigation/native';

import {
  _getProfile,
  _getaddorder,
  _getcreatpayment,
  _getmightmissed,
  _getorderDetailorderkey,
  _postNotifee,
  _putpaymentHistory,
} from '../utils/Handler/EpicControllers';

export default function CartScreen() {
  const [order_Might_Missed, setOrder_Might_Missed] = useState([]);
  const IsFocused = useIsFocused();
  const productDataByRe = useSelector(state => state.CartReducerSlice.cart);
  const wishlist = useSelector(state => state.WishlistReducerSlice.wishlist);
  const dispatch = useDispatch();
  const [orderKey, setOrderKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const [payLoading, setPayLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const [state, setState] = useState({
    isLoading: false,
  });

  const [linkpay, setLinkpay] = useState('');
  const [paidmess, setPaidmess] = useState('');
  const [statusId, setStatusId] = useState('');
  const [isProfile, setIsProfile] = useState('');
  const webviewRef = useRef(null);
  const [showWebView, setShowWebView] = useState(false);
  const [PrductByiDetails, setPrductByiDetails] = useState('');
  const [collapsed, setCollapsed] = useState(true);

  // console.log('orderKey------>>', orderKey);

  // const addressCurrent = useSelector(
  //   state => state.AddressLSlice.currentAddress,
  // );

  // console.log('addressCurrent--------DG-', addressCurrent);

  const totalprice = useSelector(state => state.CartReducerSlice.totalPrice);

  const newAddress = useSelector(state => state.AddressLSlice.animalAddress);

  console.log('newAddress', newAddress);

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
      _Handle_Profile();
    }
  }, [IsFocused]);

  const _Order_Might_Missed = async () => {
    const result = await _getmightmissed();
    if (result?.data) {
      // console.log('_Order_Might_Missed=========', result?.data);
      setOrder_Might_Missed(result.data.categoryData);
    } else {
      console.log('_Order_Might_Missed catch Error', result?.data);
    }
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

  const _Handle_Profile = async () => {
    const result = await _getProfile();
    if (result?.data) {
      setIsProfile(result?.data?.result);
    } else {
      console.log('Profile Catch Error', error);
    }
  };

  const _Handle_Cart_Data = async datapay => {
    console.log('datapay---------------new', datapay);

    let arr = [];
    {
      productDataByRe.map(item => {
        arr.push({productId: item._id, quantity: item.quantity});
      });
    }
    const objcartdata = {
      orderedProducts: arr,
      totalAmount: totalprice,
      txnId: datapay?.orderKeyId,
      resCode: datapay?.orderStatus,
      txnRef: datapay?.TransactionRefNo,
      status: datapay?.status,
      delieveryAddress: {
        completeAddress: newAddress?.compleAddress,
        floor: newAddress?.floor,
        nearby_landmark: newAddress?.nearby,
        receiverName: newAddress?.namer,
      },
    };

    console.log('objcartdata=======>>', objcartdata);

    const result = await _getaddorder(objcartdata);
    console.log('resul------one', result?.data);
    if (result?.data) {
      console.log('Response api ------------->>>>', result?.data);
      setStatusId(result?.data?.result?._id);
      dispatch(setCartdata(result?.data?.result));
      orderNotifee(result?.data);
    } else {
      console.log('add to cart data catch error', result?.data);
    }
  };

  const _Payment_Handle = async () => {
    setState({
      ...state,
      isLoading: true,
    });
    const dataPayment = {
      // RedirectUrl: Routes.YOUR_ORDER,
      RedirectUrl: '',
      OrderAmount: totalprice,
      ProductData: {PaymentReason: "''", ItemId: "''", AppName: 'fooderyApp'},
      CustomerData: {
        MobileNo: isProfile?.phone,
        Email: isProfile?.email,
        CustomerId: isProfile?._id,
      },
    };

    const result = await _getcreatpayment(dataPayment);
    console.log('ddddddddddddd', result?.data);

    if (result?.data) {
      if (result?.data?.message === 'Payment Url Generated') {
        setOrderKey(result?.data?.orderKeyId);
        setShowWebView(true);
        setLinkpay(result?.data);
        setState({
          ...state,
          isLoading: false,
        });
      }
    } else {
      console.log('Payment  API catch error ', result?.data);
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    let intervalid;
    if (showWebView) {
      intervalid = setInterval(_Payment_Check_Handle, 5000);
    }
    return () => clearInterval(intervalid);
  }, [showWebView]);

  const _Payment_Check_Handle = async () => {
    const result = await _getorderDetailorderkey(orderKey);
    if (result?.data) {
      console.log('check data -----------new---------->>>', result?.data);
      if (result?.data?.OrderPaymentStatusText !== 'Pending') {
        SimpleToast({
          title: `Order Status: ${result?.data?.OrderPaymentStatusText}`,
          isLong: true,
        });
        _Handle_Cart_Data(result?.data);
        setShowWebView(false);
        navigation.navigate('PaymentSuccessful', result?.data);
      }
    } else {
      console.log('Payment check', result?.data);
    }
  };

  const orderNotifee = async data => {
    console.log('data datblu----->>', data?.result?.orderId);
    const result = await _postNotifee({orderId: data?.result?.orderId});
    if (result?.data) {
      console.log('NotiFeee:', result?.data);
    } else {
      console.log('Notifee:error', result?.data);
    }
  };

  // const paymentHistory = async datatype => {
  //   const data = {
  //     order_id: statusId,
  //     txnId: datatype?.orderKeyId,
  //     resCode: datatype?.orderStatus,
  //     txnRef: datatype?.TransactionRefNo,
  //     totalAmount: datatype?.OrderAmount,
  //     status: datatype?.status,
  //   };

  //   console.log('ravi 22222--------->>>', data);

  //   const result = await _putpaymentHistory(data);
  //   if (result?.data) {
  //     console.log('response data--->>>', result?.data);
  //   } else {
  //     console.log('payment history:', result?.data);
  //   }
  // };

  const openWebView = () => {
    _Payment_Handle();
  };

  const handleGoBack = () => {
    setShowWebView(!showWebView);
  };
  const handleNavigationStateChange = navState => {
    if (navState.url === linkpay.paymnetProcessUrl) {
      navigation.navigate(Routes.YOUR_ORDER);
    }
  };
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Payment Successful!✅',
      // text2: 'This is some something 👋',
    });
  };
  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={Styles.ActivityIndicatorStyle}
      />
    );
  }
  const toggleBottomNavigationView = item => {
    setVisible(!visible);
    setPrductByiDetails(item);
  };
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  console.log('statusId-------------', statusId);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      {showWebView ? (
        <View style={{flex: 1}}>
          <MyHeaderNo2 title={'Payment'} onPress={handleGoBack} />
          <WebView
            ref={webviewRef}
            source={{
              uri: linkpay.paymnetProcessUrl,
            }}
            // onNavigationStateChange={handleNavigationStateChange}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            style={{flex: 1}}
          />
        </View>
      ) : (
        <View style={Styles.CONTAINERMAIN}>
          <MyHeader
            onPressserchbar={() => navigation.navigate(Routes.SEARCH_BAR)}
            title={'Shopping Cart'}
            onPress={() => navigation.goBack()}
          />
          {productDataByRe?.length !== 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              scrollEnabled={true}
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
                    {newAddress?.compleAddress}{' '}
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
                scrollEnabled={false}
                data={productDataByRe}
                renderItem={({item, index}) => (
                  <View key={index} style={Styles.MAINCARD}>
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
                          style={
                            Styles.PRICES
                          }>{`Rs.${item?.productPrice}`}</Text>
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
                        <Text style={Styles.TOTALITEMTITLE}>
                          {item?.quantity}
                        </Text>
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
                <Text style={Styles.MIGHTSTYLESTITLE}>
                  You Might Have Missed
                </Text>
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
                        onPress={() => toggleBottomNavigationView(item)}
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
                        Stocktitle={
                          item?.productStock === 'yes' ? null : 'Out of stock'
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
                                  <View
                                    key={index}
                                    style={Styles.INCREAMENTBOTTONMAIN}>
                                    <TouchableOpacity
                                      onPress={() => decreaseQuantity(value)}>
                                      <Text style={Styles.DCREAMENTTITLE}>
                                        -
                                      </Text>
                                    </TouchableOpacity>
                                    <Text style={Styles.ITEMTITEL}>
                                      {value.quantity}
                                    </Text>
                                    <TouchableOpacity
                                      onPress={() => increaseQuantity(value)}>
                                      <Text style={Styles.INCREAMENTTITLE}>
                                        +
                                      </Text>
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
                    {`Rs.${totalprice + 13}`}
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
                scrollEnabled={true}
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
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
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
                    Order Cannot be Cancelled once packed for delivery. in case
                    of unexpected delays, a refund will be provider.if
                    applicable
                  </Text>
                </View>
              </View>

              <View style={{marginVertical: 15}}>
                {newAddress.compleAddress &&
                newAddress?.floor &&
                newAddress?.nearby ? (
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
                    onPress={openWebView}
                    // onPress={_Payment_Handle}
                    // onPress={showToast}
                  />
                ) : (
                  <Button
                    title={'Choose address at next step   ▶'}
                    onPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
                  />
                )}
              </View>
              {/* <Button
                title={'Choose address at next step   ▶'}
                onPress={() => navigation.navigate('PaymentSuccessful')}
              /> */}
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

          <BottomSheet
            visible={visible}
            onBackButtonPress={toggleBottomNavigationView}
            onBackdropPress={toggleBottomNavigationView}>
            <View>
              <TouchableOpacity
                onPress={() => setVisible(!visible)}
                activeOpacity={0.6}
                style={Styles.CLOSEBTN}>
                <EntypoIcon title="cross" size={25} IconColor={COLORS.WHITE} />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: COLORS.WHITE,
                  height: heightPixel(700),
                  marginHorizontal: 10,
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}
                  contentContainerStyle={{}}>
                  <Image
                    source={{uri: PrductByiDetails?.productImage}}
                    style={GlobelStyles.Modalimagestyle}
                  />
                  <View style={{marginHorizontal: 20, marginTop: '5%'}}>
                    <Text numberOfLines={4} style={GlobelStyles.MODALTITLE}>
                      {PrductByiDetails?.productName}
                    </Text>
                    <Text numberOfLines={3} style={GlobelStyles.SUBMODALTITLE}>
                      {PrductByiDetails?.productUnit}
                    </Text>
                    <View style={GlobelStyles.ACTIONMAINCONQ}>
                      <View style={GlobelStyles.MAINQ}>
                        <Text style={GlobelStyles.MAINQTEXT}>
                          {PrductByiDetails?.productPrice}
                        </Text>
                        <Text style={GlobelStyles.MAINQDISCOUNT}>
                          {PrductByiDetails?.discountPrice}
                        </Text>
                      </View>

                      <View>
                        {productDataByRe.map((value, index) => (
                          <View key={value?._id}>
                            {PrductByiDetails?._id == value?._id ? (
                              <View style={Styles.INCREAMENTBOTTONMAIN}>
                                <TouchableOpacity
                                  onPress={() => decreaseQuantity(value)}>
                                  <Text style={Styles.DCREAMENTTITLE}>-</Text>
                                </TouchableOpacity>
                                <Text style={Styles.ITEMTITEL}>
                                  {value?.quantity}
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
                          value => value._id == PrductByiDetails._id,
                        ) ? null : (
                          <TouchableOpacity
                            onPress={() => addItemToCart(PrductByiDetails)}
                            activeOpacity={0.5}
                            style={GlobelStyles.ADDBOTTONSTYL}>
                            <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>

                    <View style={GlobelStyles.MAINQCON}>
                      <Text numberOfLines={3} style={GlobelStyles.MAINQTEXTDEL}>
                        Product Details
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={{fontSize: fontPixel(14), color: COLORS.BLACK}}>
                        Shelf Life
                      </Text>
                      <Text numberOfLines={3} style={GlobelStyles.MAINQTEXTDAY}>
                        5 Days
                      </Text>
                      <TouchableOpacity
                        onPress={toggleExpanded}
                        style={GlobelStyles.MAINQTEXTVIEWDETAILS}>
                        <Text
                          numberOfLines={3}
                          style={GlobelStyles.MAINQVIEWMORE}>
                          View More Details
                        </Text>
                        <IonIcon
                          title={
                            collapsed
                              ? 'chevron-down-sharp'
                              : 'chevron-up-sharp'
                          }
                          size={16}
                          IconColor={COLORS.PURPLE}
                        />
                      </TouchableOpacity>
                      <Collapsible collapsed={collapsed}>
                        <View style={GlobelStyles.EXPLOREBOX}>
                          <Text style={GlobelStyles.manufTitle}>
                            Manufacturer Details
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={GlobelStyles.EXPLORETITLESUB}>
                            {PrductByiDetails?.productDescription}
                          </Text>
                        </View>
                      </Collapsible>
                    </View>
                    <View>
                      <Text numberOfLines={3} style={GlobelStyles.MAINQSIMILAR}>
                        Similar Product
                      </Text>
                      <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 5}}
                        horizontal
                        scrollEnabled={true}
                        data={[1, 2, 3, 4]}
                        renderItem={({item, index}) => (
                          <View key={index}>
                            <Productinfo
                              key={index}
                              HeartUI={
                                <View>
                                  {wishlist.some(
                                    value => value?._id == item?._id,
                                  ) ? (
                                    <TouchableOpacity
                                      onPress={() =>
                                        removeItemFromWishlist(item)
                                      }
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
                                      {item?._id == value?._id ? (
                                        <View
                                          key={index}
                                          style={Styles.INCREAMENTBOTTONMAIN}>
                                          <TouchableOpacity
                                            onPress={() =>
                                              decreaseQuantity(value)
                                            }>
                                            <Text style={Styles.DCREAMENTTITLE}>
                                              -
                                            </Text>
                                          </TouchableOpacity>
                                          <Text style={Styles.ITEMTITEL}>
                                            {value?.quantity}
                                          </Text>
                                          <TouchableOpacity
                                            onPress={() =>
                                              increaseQuantity(value)
                                            }>
                                            <Text
                                              style={Styles.INCREAMENTTITLE}>
                                              +
                                            </Text>
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
                                      style={GlobelStyles.ADDBOTTONSTYL}>
                                      <Text style={Styles.BOTTONTEXTSTYL}>
                                        ADD
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              }
                            />
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </BottomSheet>
        </View>
      )}
      <Toast />
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
    height: heightPixel(80),
    width: widthPixel(60),
    borderRadius: 10,
    resizeMode: 'contain',
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
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
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
});
