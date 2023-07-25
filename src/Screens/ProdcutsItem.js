import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, createRef} from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import {
  BASE_URL,
  FontAwesomeIcon,
  SimpleToast,
  bannerIcon,
  IonIcon,
} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
import AddTocart from '../Components/AddTocart';
// import {addToCart} from '../Redux/action';
import {useDispatch, useSelector} from 'react-redux';
import Collapsible from 'react-native-collapsible';
import SubShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/SubShimmerPlaceHolder';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';
import {
  addToCart,
  decrementQuantity,
  getCartTotal,
  incrementQuantity,
  removeFromCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import Routes from '../Navigation/Routes';
import {
  addToWishlist,
  removeFromWishlist,
} from '../Redux/ReducerSlice/WishlistReducerSlice';
import GlobelStyles from '../utils/GlobelStyles';
import {useIsFocused} from '@react-navigation/native';

export default function ProdcutsItem({navigation, route}) {
  const SubCatitem = route.params;
  const actionSheetRef = createRef(false);
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  // const [cartitem, setCartitem] = useState(0);
  const [productiItem, setProductItem] = useState([]);
  const [notFound, setNoFound] = useState('');
  const [PrductByiDetails, setPrductByiDetails] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const [similar_Product, setSimilar_Product] = useState([]);
  const IsFocused = useIsFocused();

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const toggleBottomNavigationView = value => {
    actionSheetRef?.current?.setModalVisible(true);
    setPrductByiDetails(value);
  };
  useEffect(() => {
    if (IsFocused) {
      _ProductItem();
      _Similar_Product();
    }
  }, [IsFocused]);

  const _ProductItem = async () => {
    const token = await _getStorage('token');
    setIsloading(true);
    axios
      .get(
        BASE_URL +
          `/User/getAllProductByid/${SubCatitem.item._id}/${SubCatitem.categoryId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        console.log('Product Item response------->>>>', res.data.getAll);
        setProductItem(res?.data?.getAll);
        setIsloading(false);
      })
      .catch(error => {
        console.log('Product Item catch error------->>>>', error.response.data);
        setIsloading(false);
        if (error.response?.data?.message == 'Data Not Founded') {
          setNoFound(error.response?.data?.message);
        }
      });
  };
  const _Similar_Product = async () => {
    const token = await _getStorage('token');
    axios
      .get(
        BASE_URL +
          `/User/getSimmilarProduct/${SubCatitem.item._id}/${SubCatitem.categoryId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        // console.log('_Similar_Product Item response--->>>>', res?.data?.result);
        setSimilar_Product(res?.data?.result);
      })
      .catch(error => {
        console.log(
          '_Similar_Product Item catch error------->>>>',
          error?.response?.data,
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

  console.log('cartdata---------------', cartdata);

  let arr = [];

  cartdata.map(item => {
    arr.push({Imagenew: item?.productImage});
  });

  // console.log('arr===================', arr[0].Imagenew);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader
        onPressserchbar={() => navigation.navigate(Routes.SEARCH_BAR)}
        title={SubCatitem.item.subCategoryName}
        onPress={() => navigation.goBack()}
        UIBACK={
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.WHITE}
          />
        }
      />
      {notFound ? (
        <Text style={Styles.foundtext}>{notFound}</Text>
      ) : isloading ? (
        <SubShimmerPlaceHolder />
      ) : (
        <SafeAreaView style={Styles.CONTAINERMAIN}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.CONTAINERBOXMAIN}>
              {productiItem.map((value, index) => (
                <Productinfo
                  data={value}
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
                    toggleBottomNavigationView(value);
                  }}
                  Productimage={{uri: value?.productImage}}
                  Stocktitle={
                    value?.productStock === 'yes' ? null : 'Out of stock'
                  }
                  ProductName={value?.productName}
                  ProductSubName={value?.productUnit}
                  discountPrice={`Rs.${value.discountPrice}`}
                  ProductPrice={value.productPrice}
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
                              <Text style={Styles.ITEMTITEL}>
                                {item?.quantity}
                              </Text>
                              <TouchableOpacity
                                onPress={() => increaseQuantity(item)}>
                                <Text style={Styles.INCREAMENTTITLE}>+</Text>
                              </TouchableOpacity>
                            </View>
                          ) : null}
                        </View>
                      ))}

                      {cartdata.some(item => item._id == value._id) ? null : (
                        <TouchableOpacity
                          disabled={value.productStock === 'yes' ? false : true}
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

          {cartdata?.length !== 0 && (
            <AddTocart
              onPress={() => navigation.navigate(Routes.TAB_CART)}
              Image={{uri: arr[0].Imagenew}}
              data={arr}
              ItemTotalofnum={`item ${totalQuantity}`}
              PriceTotalofnum={`Rs.${totalprice}`}
              PriceTotalDis={`Rs.${totaldisPrice}`}
            />
          )}
        </SafeAreaView>
      )}

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
                  value => value._id == PrductByiDetails._id,
                ) ? null : (
                  <TouchableOpacity
                    disabled={
                      PrductByiDetails?.productStock === 'yes' ? false : true
                    }
                    onPress={() => addItemToCart(PrductByiDetails)}
                    activeOpacity={0.5}
                    style={[GlobelStyles.ADDBOTTONSTYL]}>
                    {PrductByiDetails?.productStock === 'yes' ? (
                      <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                    ) : (
                      <Text style={Styles.BOTTONTEXTSTYL}>Out of stock</Text>
                    )}
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
                <View style={GlobelStyles.EXPLOREBOX}>
                  <Text style={GlobelStyles.manufTitle}>
                    Manufacturer Details
                  </Text>
                  <Text numberOfLines={2} style={GlobelStyles.EXPLORETITLESUB}>
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
                data={similar_Product}
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
                            value => value._id == item._id,
                          ) ? null : (
                            <TouchableOpacity
                              disabled={
                                item?.productStock === 'yes' ? false : true
                              }
                              onPress={() => addItemToCart(item)}
                              activeOpacity={0.5}
                              style={[GlobelStyles.ADDBOTTONSTYL]}>
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
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  //   BOXCONTAINE: {
  //     height: heightPixel(90),
  //     width: widthPixel(80),
  //     backgroundColor: COLORS.WHITE,
  //     elevation: 4,
  //     borderRadius: 4,
  //     marginHorizontal: 5,
  //     marginVertical: 10,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   IMAGETOOLS: {
  //     height: heightPixel(60),
  //     width: widthPixel(80),
  //   },
  CONTAINERBOXMAIN: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 5,
    alignItems: 'center',
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
  foundtext: {
    color: COLORS.GRAYDARK,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: fontPixel(15),
  },
});
