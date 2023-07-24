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
import ActionSheet from 'react-native-actions-sheet';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import SubShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/SubShimmerPlaceHolder';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  addToCart,
  getCartTotal,
} from '../Redux/ReducerSlice/CartReducerSlice';
import Routes from '../Navigation/Routes';
import {
  addToWishlist,
  removeFromWishlist,
} from '../Redux/ReducerSlice/WishlistReducerSlice';
import {
  cartdata_in_data_base,
  fetchApiData_wishlist,
} from '../Redux/RootsagaEpic';
import GlobelStyles from '../utils/GlobelStyles';

export default function SubCategories({navigation, route}) {
  const CatItem = route.params;
  const [isloading, setIsloading] = useState(false);
  // const [cartitem, setCartitem] = useState(0);
  const [subCatProduct, setSubCatProduct] = useState([]);
  const [productById, setProductById] = useState([]);
  const [status, setStatus] = useState('tab1');
  const [detalist, setDetalist] = useState(productById);
  // const [totl_Price, setTotal_Price] = useState('');
  // const [total_quantity, seTtotal_quantity] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const actionSheetRef = createRef(false);
  const [PrductByiDetails, setPrductByiDetails] = useState('');
  const dispatch = useDispatch();
  const IsFocused = useIsFocused();
  const cartData = useSelector(state => state.reducer);
  // const [iscartdata, setIscartdata] = useState('');
  const [similar_Product, setSimilar_Product] = useState([]);

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
      _ProductItemById();
      setStatusFilter(status);
      _get_quantity_item();
      _Wishlist_get_data();
      _Cart_get_data();
      _Similar_Product();
    }
  }, [IsFocused]);

  const _ProductItem = async () => {
    setIsloading(true);
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/User/getsubCategory2/${CatItem?._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // console.log('res?.data?.result---------', res?.data?.result);
        setSubCatProduct(res?.data?.result);
        setIsloading(false);
      })
      .catch(error => {
        console.log(
          'Product Item catch error------->>>>',
          error?.response?.data,
        );
        setIsloading(false);
      });
  };

  const _ProductItemById = async () => {
    const token = await _getStorage('token');
    // console.log('hey======', token);
    axios
      .get(BASE_URL + `/User/getAllProduct2Byid/${CatItem._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        console.log(
          'Product Item _ProductItemById response------->>>>',
          res.data,
        );
        if (res.data.message == 'All New Product list Founded Successfully.') {
          setProductById(res?.data?.result);
        }
      })
      .catch(error => {
        console.log(
          'Product Item catch error------->>>>',
          error?.response?.data,
        );
      });
  };

  const setStatusFilter = async type => {
    if (type !== 'tab1') {
      setDetalist([...productById.filter(item => item.type === type)]);
    }
    setStatus(type);
  };

  // const setStatusFilter = type => {
  //   if (type !== 'tab1') {
  //     setDetalist([...productById.filter(item => item.type === type)]);
  //   } else {
  //     setDetalist(productById);
  //   }
  //   setStatus(type);
  // };

  const addItemToCart = item => {
    if (item) {
      // _addTocart(item);
      dispatch(addToCart(item));
    }
  };

  const increaseQuantity = item => {
    if (item) {
      // _addTocart(item);
      dispatch(incrementQuantity(item));
    }
  };
  const decreaseQuantity = item => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
      _ReduceTocart(item);
    } else {
      dispatch(decrementQuantity(item));
      _ReduceTocart(item);
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

  const _get_quantity_item = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/User/getCart1`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log(
          'reposne  _get_quantity_item-------->>>',
          response.data.cart.cart,
        );
      })
      .catch(error => {
        console.log('Get quantity catch error', error);
      });
  };

  const _Wishlist_get_data = async () => {
    const token = await _getStorage('token');
    // dispatch(fetchApiData_wishlist(token));
  };

  const _Similar_Product = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/User/getSimmilarProductByCatId/${CatItem?._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // console.log(
        //   '_Similar_Product Item response-++++++++++++++=-->>>>',
        //   res?.data?.result,
        // );
        setSimilar_Product(res?.data?.result);
      })
      .catch(error => {
        console.log(
          '_Similar_Product Item catch error------->>>>',
          error?.response?.data,
        );
      });
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartdata]);

  const _Cart_get_data = async () => {
    const token = await _getStorage('token');
    // dispatch(cartdata_in_data_base(token));
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader
        title={CatItem.categoryName}
        onPressserchbar={() => navigation.navigate(Routes.SEARCH_BAR)}
        onPress={() => navigation.goBack()}
        UIBACK={
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.WHITE}
          />
        }
      />
      {isloading ? (
        <SubShimmerPlaceHolder />
      ) : (
        <SafeAreaView style={Styles.CONTAINERMAIN}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={{uri: CatItem.categoryBanner}}
              style={Styles.bannerImage}
            />
            <FlatList
              keyExtractor={(item, index) => index?.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              horizontal
              data={subCatProduct}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setStatusFilter(item?.type)}
                  activeOpacity={0.7}
                  style={{
                    alignItems: 'center',
                    marginVertical: 5,
                    alignItems: 'center',
                  }}>
                  <View style={Styles.BOXCONTAINE}>
                    <Image
                      source={{uri: item?.subCategoryPic}}
                      style={Styles.IMAGETOOLS}
                    />
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontWeight: '500',
                      color: COLORS.GRAYDARK,
                      textAlign: 'center',
                      width: 100,
                    }}>
                    {item?.subCategoryName}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={Styles.CONTAINERBOXMAIN}>
              {status == 'tab1' &&
                productById.map((value, index) => (
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
                    onPress={() => toggleBottomNavigationView(value)}
                    Stocktitle={
                      value?.productStock === 'yes' ? null : 'Out of stock'
                    }
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
                        {cartdata.some(
                          item => item?._id == value?._id,
                        ) ? null : (
                          <TouchableOpacity
                            onPress={() => addItemToCart(value)}
                            activeOpacity={0.5}
                            style={Styles.ADDBOTTONSTYL}>
                            <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    }
                  />
                ))}

              {detalist.map((value, index) => (
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
                  onPress={() => toggleBottomNavigationView(value)}
                  Stocktitle={
                    value?.productStock === 'yes' ? null : 'Out of stock'
                  }
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
                              <Text style={Styles.ITEMTITEL}>
                                {item.quantity}
                              </Text>
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
                          style={Styles.ADDBOTTONSTYL}>
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
              Image={bannerIcon}
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
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  bannerImage: {
    height: heightPixel(200),
    alignSelf: 'center',
    width: widthPixel(420),
  },
  BOXCONTAINE: {
    height: heightPixel(90),
    width: widthPixel(80),
    backgroundColor: COLORS.WHITE,
    elevation: 4,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red'
  },
  IMAGETOOLS: {
    height: heightPixel(70),
    width: widthPixel(70),
    borderRadius: 10,
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
});
