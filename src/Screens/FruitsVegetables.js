import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {createRef, useState, useEffect} from 'react';
import MyHeader from '../Components/MyHeader';
import {
  BASE_URL,
  FontAwesomeIcon,
  IonIcon,
  SimpleToast,
  bannerIcon,
} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import ActionSheet from 'react-native-actions-sheet';
import Productinfo from '../Components/Productinfo';
import GlobelStyles from '../utils/GlobelStyles';
import Collapsible from 'react-native-collapsible';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {
  addToWishlist,
  removeFromWishlist,
} from '../Redux/ReducerSlice/WishlistReducerSlice';
import {useSelector, useDispatch} from 'react-redux';

export default function FruitsVegetables({navigation}) {
  const [heart, setHeart] = useState(true);
  const actionSheetRef = createRef(false);
  const [prodcutDetails, setProdcutDetails] = useState('');
  const [freshnes_ByID_Cat, setFreshnes_ByID_Cat] = useState({});
  const IsFocused = useIsFocused();
  const toggleBottomNavigationView = id => {
    actionSheetRef?.current?.setModalVisible(true);
    setProdcutDetails(id);
  };
  const [collapsed, setCollapsed] = useState(true);
  const [freshness_Cat, setFreshnes_Cat] = useState([]);
  const dispatch = useDispatch();

  console.log('freshnes_ByID_Cat', freshnes_ByID_Cat._id);

  const SRTDATA = [
    {
      id: 1,
      name: 'Ravi Kumar',
    },
    {
      id: 2,
      name: 'Ravi Kumar',
    },
    {
      id: 3,
      name: 'Ravi Kumar',
    },
    {
      id: 4,
      name: 'Ravi Kumar',
    },
    {
      id: 5,
      name: 'Ravi Kumar',
    },
    {
      id: 6,
      name: 'Ravi Kumar',
    },
    {
      id: 7,
      name: 'Ravi Kumar',
    },
    {
      id: 8,
      name: 'Ravi Kumar',
    },
    {
      id: 9,
      name: 'Ravi Kumar',
    },
    {
      id: 10,
      name: 'Ravi Kumar',
    },
    {
      id: 11,
      name: 'Ravi Kumar',
    },
    {
      id: 12,
      name: 'Ravi Kumar',
    },
  ];

  const SRTDATANEW = [
    {
      id: 1,
      Nmae: 'ravi rai',
    },
    {
      id: 2,
      Nmae: 'ravi rai',
    },
    {
      id: 3,
      Nmae: 'ravi rai',
    },
  ];

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (IsFocused) {
      _FreshnessCategory();
      if (freshnes_ByID_Cat._id) {
        _FreshnessCategoryBYIdDetails();
      }
    }
  }, [IsFocused]);

  const _FreshnessCategory = async () => {
    const token = await _getStorage('token');
    // console.log(token);
    axios
      .get(BASE_URL + `/User/freshProductlist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('Freshness Response QQQQQQQQQ----->>>', res?.data?.result);

        setFreshnes_Cat(res?.data?.result);
      })
      .catch(error => {
        console.log('Error Freshness catch error---->>>', error);
      });
  };

  const _FreshnessCategoryBYIdDetails = async () => {
    const token = await _getStorage('token');
    // console.log(token);
    axios
      .get(BASE_URL + `/User/getOneFreshProduct/${prodcutDetails}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log('Freshness BY Id Response <<<<<<<<<<----->>>', res?.data);
        if (res?.data) {
          setFreshnes_ByID_Cat(res?.data?.getoneProduct);
        }
      })
      .catch(error => {
        console.log('Error Freshness BY ID catch error---->>>', error);
      });
  };

  const addtoWishlist = value => {
    if (value) {
      dispatch(addToWishlist(value));
      SimpleToast({title: 'added to the wishlist.', isLong: true});
    }
  };
  const removeItemFromWishlist = value => {
    if (value) {
      dispatch(removeFromWishlist(value));
      SimpleToast({title: 'removed from the wishlist.', isLong: true});
    }
  };
  const wishlist = useSelector(state => state.WishlistReducerSlice.wishlist);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader title={'Fresh & Healthy'} onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={bannerIcon} style={Styles.bannerImage} />
        <View style={Styles.CONTAINERBOXMAIN}>
          {freshness_Cat.map((value, index) => (
            <Productinfo
              key={index}
              HeartUI={
                <View>
                  {wishlist.some(item => item?._id == value?._id) ? (
                    <TouchableOpacity
                      onPress={() => removeItemFromWishlist(value)}
                      style={[Styles.CONTAINERHEART]}>
                      <FontAwesomeIcon
                        title={'heart'}
                        size={20}
                        IconColor={COLORS.BROWN}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => addtoWishlist(value)}
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
              // heartonPress={() => setHeart(value.id)}
              // IconColor={heart !== value.id ? COLORS.GRAYDARK : COLORS.BROWN}
              // FontAwesomeIcontitle={heart !== value.id ? 'heart-o' : 'heart'}
              onPress={() => toggleBottomNavigationView(value._id)}
              Productimage={{uri: value.productImage}}
              ProductName={value.productName}
              ProductSubName={value.productUnit}
              discountPrice={`Rs.${value.discountPrice}`}
              ProductPrice={`Rs.${value.productPrice}`}
              UIBotton={
                <View>
                  {/* {cartData?.length !== 0 ? ( */}
                  {/* <View style={GlobelStyles.INCREAMENTBOTTONMAIN}>
                            <TouchableOpacity>
                              <Text style={GlobelStyles.DCREAMENTTITLE}>-</Text>
                            </TouchableOpacity>
                            <Text style={GlobelStyles.ITEMTITEL}>0</Text>
                            <TouchableOpacity>
                              <Text style={GlobelStyles.INCREAMENTTITLE}>
                                +
                              </Text>
                            </TouchableOpacity>
                          </View> */}
                  {/* ) : ( */}
                  <TouchableOpacity
                    // onPress={() => _Handle_AddToCart(value)}
                    activeOpacity={0.5}
                    style={GlobelStyles.ADDBOTTONSTYL}>
                    <Text style={GlobelStyles.BOTTONTEXTSTYL}>ADD</Text>
                  </TouchableOpacity>
                  {/* )} */}
                </View>
              }
            />
          ))}
        </View>
      </ScrollView>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          height: heightPixel(600),
          width: widthPixel(380),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.WHITE,
        }}
        indicatorColor={'#7484'}
        headerAlwaysVisible
        closeOnPressBack
        gestureEnabled
        indicatorStyle={{
          height: 5,
          backgroundColor: COLORS.GRAYDARK,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <Image
            source={{uri: freshnes_ByID_Cat?.productImage}}
            style={Styles.Modalimagestyle}
          />
          <View style={{marginHorizontal: 20, marginTop: '5%'}}>
            <Text numberOfLines={3} style={Styles.MODALTITLE}>
              {freshnes_ByID_Cat?.productName}
            </Text>
            <Text numberOfLines={3} style={Styles.SUBMODALTITLE}>
              {freshnes_ByID_Cat?.productUnit}
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 0.5,
                paddingVertical: 5,
                borderColor: COLORS.GRAYDARK,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: fontPixel(25),
                    color: COLORS.BLACK,
                    fontWeight: '500',
                  }}>
                  {freshnes_ByID_Cat?.productPrice}
                </Text>
                <Text
                  style={{
                    color: COLORS.GRAYDARK,
                    fontSize: fontPixel(13),
                    paddingLeft: 5,
                    fontWeight: '500',
                    top: 4,
                    textDecorationLine: 'line-through',
                  }}>
                  {freshnes_ByID_Cat?.discountPrice}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={Styles.ADDBOTTONSTYL}>
                <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderBottomWidth: 0.5,
                borderColor: COLORS.GRAYDARK,
              }}>
              <Text
                numberOfLines={3}
                style={{
                  color: COLORS.BLACK,
                  fontWeight: '500',
                  fontSize: fontPixel(19),
                }}>
                Product Details
              </Text>
              <Text
                numberOfLines={3}
                style={{fontSize: fontPixel(14), color: COLORS.BLACK}}>
                Shelf Life
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  color: COLORS.GRAYDARK,
                  fontSize: fontPixel(14),
                  top: 2,
                }}>
                5 Days
              </Text>

              <TouchableOpacity
                onPress={toggleExpanded}
                style={{
                  marginTop: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  numberOfLines={3}
                  style={{
                    color: COLORS.PURPLE,
                    fontSize: fontPixel(14),
                  }}>
                  View More Details
                </Text>
                <IonIcon
                  title={collapsed ? 'chevron-down-sharp' : 'chevron-up-sharp'}
                  size={16}
                  IconColor={COLORS.PURPLE}
                />
              </TouchableOpacity>

              <Collapsible collapsed={collapsed}>
                <View style={Styles.EXPLOREBOX}>
                  <Text style={Styles.manufTitle}>Manufacturer Details</Text>
                  <Text numberOfLines={2} style={Styles.EXPLORETITLESUB}>
                    hello
                  </Text>
                </View>
              </Collapsible>
            </View>
            <View>
              <Text
                numberOfLines={3}
                style={{
                  color: COLORS.BLACK,
                  fontWeight: '500',
                  fontSize: fontPixel(19),
                  marginTop: 7,
                }}>
                Similar Product
              </Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 5}}
                horizontal
                data={SRTDATANEW}
                renderItem={({item, index}) => (
                  <View key={index}>
                    <Productinfo
                      key={index}
                      heartonPress={() => setHeart(item.id)}
                      IconColor={
                        heart !== item.id ? COLORS.GRAYDARK : COLORS.BROWN
                      }
                      FontAwesomeIcontitle={
                        heart !== item.id ? 'heart-o' : 'heart'
                      }
                      Productimage={require('../Assets/Logo/mangoicon.png')}
                      ProductName={'Mango Alphonso'}
                      ProductSubName={'6 Pcs (Approx 1.2Kg - 1.4Kg)'}
                      discountPrice={'Rs.80'}
                      ProductPrice={'Rs.70'}
                      UIBotton={
                        <View>
                          {/* {cartData?.length !== 0 ? ( */}
                          {/* <View style={GlobelStyles.INCREAMENTBOTTONMAIN}>
                            <TouchableOpacity>
                              <Text style={GlobelStyles.DCREAMENTTITLE}>-</Text>
                            </TouchableOpacity>
                            <Text style={GlobelStyles.ITEMTITEL}>0</Text>
                            <TouchableOpacity>
                              <Text style={GlobelStyles.INCREAMENTTITLE}>
                                +
                              </Text>
                            </TouchableOpacity>
                          </View> */}
                          {/* ) : ( */}
                          <TouchableOpacity
                            // onPress={() => _Handle_AddToCart(value)}
                            activeOpacity={0.5}
                            style={GlobelStyles.ADDBOTTONSTYL}>
                            <Text style={GlobelStyles.BOTTONTEXTSTYL}>ADD</Text>
                          </TouchableOpacity>
                          {/* )} */}
                        </View>
                      }
                    />
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </ActionSheet>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  bannerImage: {
    height: heightPixel(180),
    alignSelf: 'center',
    width: widthPixel(410),
  },
  CONTAINERBOX: {
    backgroundColor: COLORS.WHITE,
    height: heightPixel(200),
    width: widthPixel(130),
    marginHorizontal: 3,
    marginTop: 10,
    elevation: 10,
    borderRadius: 4,
  },
  CONTAINERBOXMAIN: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 15,
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
  },
  BOTTONTEXTSTYL: {
    color: COLORS.PURPLE,
    fontWeight: '500',
    fontSize: fontPixel(13),
  },
  Modalimagestyle: {
    height: heightPixel(200),
    width: widthPixel(400),
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginTop: '4%',
  },
  MODALTITLE: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(18),
  },
  SUBMODALTITLE: {
    color: COLORS.GRAYDARK,
    marginTop: 8,
    fontSize: fontPixel(18),
  },
  EXPLOREBOX: {
    height: heightPixel(400),
  },
  manufTitle: {
    color: COLORS.BLACK,
    fontSize: fontPixel(12),
    fontWeight: '500',
    letterSpacing: 0.5,
    paddingTop: 5,
  },
  CONTAINERHEART: {alignItems: 'flex-end', margin: 5},
});
