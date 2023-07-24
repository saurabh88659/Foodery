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
import {
  addToCart,
  decrementQuantity,
  getCartTotal,
  incrementQuantity,
  removeFromCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import Routes from '../Navigation/Routes';
import AddTocart from '../Components/AddTocart';

export default function NutsDryFruits({navigation, route}) {
  const actionSheetRef = createRef(false);
  const [PrductByiDetails, setPrductByiDetails] = useState('');
  const [freshnes_ByID_Cat, setFreshnes_ByID_Cat] = useState({});

  const IsFocused = useIsFocused();
  const toggleBottomNavigationView = value => {
    actionSheetRef?.current?.setModalVisible(true);
  };

  const similar_Product = route.params;

  const [collapsed, setCollapsed] = useState(true);
  const [freshness_Cat, setFreshnes_Cat] = useState([]);
  const dispatch = useDispatch();
  const [_Simailr, set_Simailr] = useState([]);

  async function ModalDataPass() {
    if (route.params.fruitItem) {
      setPrductByiDetails(route.params.fruitItem);
      toggleBottomNavigationView(PrductByiDetails);
    }
  }

  const _Simailar_Product = async () => {
    const token = await _getStorage('token');
    axios
      .get(
        BASE_URL +
          `/User/getSimmilarProductByCatId/${similar_Product.fruitItem.categoryId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(response => {
        console.log('_Simailar_Product', response.data.result);
        set_Simailr(response.data.result);
      })
      .catch(error => {
        console.log('_Simailar_Product catch error', error);
      });
  };

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (IsFocused) {
      _FreshnessCategory();
      _Simailar_Product();
      ModalDataPass();
      if (freshnes_ByID_Cat._id) {
        _FreshnessCategoryBYIdDetails();
      }
    }
  }, [IsFocused]);

  const _FreshnessCategory = async () => {
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/User/nutdryProductlist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(
          'NUTS & DRY FRUITS FOR YOU Response ----->>>',
          res?.data?.result,
        );
        setFreshnes_Cat(res?.data?.result);
      })
      .catch(error => {
        console.log(
          'Error NUTS & DRY FRUITS FOR YOU Response catch error---->>>',
          error,
        );
      });
  };

  const addItemToCart = item => {
    dispatch(addToCart(item));
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
  const cartdata = useSelector(state => state.CartReducerSlice.cart);
  const totalprice = useSelector(state => state.CartReducerSlice.totalPrice);

  const totalQuantity = useSelector(
    state => state.CartReducerSlice.totalQuantity,
  );
  const totaldisPrice = useSelector(
    state => state.CartReducerSlice.discountTotalPrice,
  );

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartdata]);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader
        title={'Nuts and Dry Fruits'}
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
              onPress={() => {
                toggleBottomNavigationView(value?._id);
                setPrductByiDetails(value);
              }}
              Stocktitle={value?.productStock === 'yes' ? null : 'Out of stock'}
              Productimage={{uri: value?.productImage}}
              ProductName={value?.productName}
              ProductSubName={value?.productUnit}
              discountPrice={`Rs.${value?.discountPrice}`}
              ProductPrice={`Rs.${value?.productPrice}`}
              UIBotton={
                <View>
                  {cartdata.map((item, index) => (
                    <View key={item?._id}>
                      {value?._id == item?._id ? (
                        <View style={Styles.INCREAMENTBOTTONMAIN}>
                          <TouchableOpacity
                            onPress={() => decreaseQuantity(item)}>
                            <Text style={Styles.DCREAMENTTITLE}>-</Text>
                          </TouchableOpacity>
                          <Text style={Styles.ITEMTITEL}>{item?.quantity}</Text>
                          <TouchableOpacity
                            onPress={() => increaseQuantity(item)}>
                            <Text style={Styles.INCREAMENTTITLE}>+</Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  ))}
                  {cartdata.some(item => item?._id == value?._id) ? null : (
                    <TouchableOpacity
                      onPress={() => addItemToCart(value)}
                      activeOpacity={0.5}
                      style={GlobelStyles.ADDBOTTONSTYL}>
                      <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
            />
          ))}
        </View>
      </ScrollView>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={GlobelStyles.ACTIONCON}
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
            source={{uri: PrductByiDetails?.productImage}}
            style={GlobelStyles.Modalimagestyle}
          />
          <View style={{marginHorizontal: 20, marginTop: '5%'}}>
            <Text numberOfLines={3} style={GlobelStyles.MODALTITLE}>
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
                {cartdata.map((value, index) => (
                  <View key={value?._id}>
                    {PrductByiDetails?._id == value?._id ? (
                      <View style={Styles.INCREAMENTBOTTONMAIN}>
                        <TouchableOpacity
                          onPress={() => decreaseQuantity(value)}>
                          <Text style={Styles.DCREAMENTTITLE}>-</Text>
                        </TouchableOpacity>
                        <Text style={Styles.ITEMTITEL}>{value?.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => increaseQuantity(value)}>
                          <Text style={Styles.INCREAMENTTITLE}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                ))}
                {cartdata.some(
                  value => value?._id == PrductByiDetails?._id,
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
                <Text numberOfLines={3} style={GlobelStyles.MAINQVIEWMORE}>
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
              <Text numberOfLines={3} style={GlobelStyles.MAINQSIMILAR}>
                Similar Product
              </Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 5}}
                horizontal
                data={_Simailr}
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
                          {cartdata.map((value, index) => (
                            <View key={value?._id}>
                              {item?._id == value?._id ? (
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
                                    <Text style={Styles.INCREAMENTTITLE}>
                                      +
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              ) : null}
                            </View>
                          ))}
                          {cartdata.some(
                            value => value?._id == item?._id,
                          ) ? null : (
                            <TouchableOpacity
                              onPress={() => addItemToCart(item)}
                              activeOpacity={0.5}
                              style={GlobelStyles.ADDBOTTONSTYL}>
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
          </View>
        </ScrollView>
      </ActionSheet>

      {cartdata?.length !== 0 && (
        <AddTocart
          onPress={() => navigation.navigate(Routes.TAB_CART)}
          Image={bannerIcon}
          ItemTotalofnum={`item ${totalQuantity}`}
          PriceTotalofnum={`Rs.${totalprice}`}
          PriceTotalDis={`Rs.${totaldisPrice}`}
        />
      )}
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
    fontSize: 14,
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
});
