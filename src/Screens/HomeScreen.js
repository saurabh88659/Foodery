import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  Stylesheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  Pressable,
  Dimensions,
  Linking,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Header from '../Components/Header';
// import {getCloser} from '../Components/utils';
import {COLORS} from '../utils/Colors';
import {
  fontPixel,
  heightPixel,
  screenHeight,
  screenWidth,
  widthPixel,
} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  IonIcon,
  MaterialIconsIcon,
  FontAwesomeIcon,
  SimpleLineIconsIcon,
  Floatingicon,
  bannerIcon,
  Footerbanner1,
  generousvegetablicon,
  SimpleToast,
  BASE_URL,
  EntypoIcon,
  Down_Arrow,
  Up_Arrow,
  deliveryBoyjson,
} from '../utils/Const';
import Collapsible from 'react-native-collapsible';
import MyModalinfo from '../Components/MyModalinfo';
import HomeShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/HomeShimmerPlaceHolder';
import Routes from '../Navigation/Routes';
import {useDoubleBackPressExit} from '../utils/Handler/BackHandler';
import Swiper from 'react-native-swiper';
import {_getStorage} from '../utils/Storage';
import {useIsFocused} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../Redux/ReducerSlice/WishlistReducerSlice';
import {checkLocationEnabled} from '../utils/Handler/Locationhandles';
import {BottomSheet} from 'react-native-btr';
import GlobelStyles from '../utils/GlobelStyles';

const {diffClamp} = Animated;
const headerHeight = 58 * 2;

export default function HomeScreen({navigation}) {
  const ref = useRef(null);
  const translateYNumber = useRef();
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const [collapsed, setCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const IsFocused = useIsFocused();
  const [firstBanner, setFirstBanner] = useState([]);
  const [second_Banner, setSecond_Banner] = useState([]);
  const [all_Category, setAll_Category] = useState([]);
  const [ex_Category_Two, setEx_category_Two] = useState([]);
  const [freshness_Cat, setFreshnes_Cat] = useState([]);
  const [nuts_and_Dry_Cat, setNuts_and_Dry_Cat] = useState([]);
  const [order_Again, setOrder_Again] = useState([]);
  const dispatch = useDispatch();
  const [PrductByiDetails, setPrductByiDetails] = useState('');
  // const [collapsed, setCollapsed] = useState(true);
  const [visible, setVisible] = useState(false);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 1.6)],
  });

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const clickHandler = () => {
    setModalVisible(!modalVisible);
  };

  const [scrollXoNe] = useState(new Animated.Value(0));

  const handleScrollOne = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollXoNe}}}],
    {useNativeDriver: false},
  );

  const imageOpacityOne = scrollXoNe.interpolate({
    inputRange: [0, 100], // Adjust the input range as needed
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const [scrollX] = useState(new Animated.Value(0));
  const handleScrollTow = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  const imageOpacity = scrollX.interpolate({
    inputRange: [0, 100], // Adjust the input range as needed
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  //  < ===================BackHandler Function =======================>

  useEffect(() => {
    useDoubleBackPressExit();
    if (IsFocused) {
      _First_Banner();
      _all_Category();
      _ExSubCategory();
      _FreshnessCategory();
      _Nuts_and_Dry_sCategory();
      _Order_Again();
      checkLocationEnabled();
    }
  }, [IsFocused]);

  const _First_Banner = async () => {
    const token = await _getStorage('token');
    setIsLoading(true);
    axios
      .get(BASE_URL + `/User/getAllBanner`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log('Banner Response=======', response.data);
        setFirstBanner(response?.data?.advertisement);
        setSecond_Banner(response?.data?.offer);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Banner Catch error', error);
        setIsLoading(false);
      });
  };

  const _all_Category = async () => {
    const token = await _getStorage('token');
    setIsLoading(true);
    axios
      .get(BASE_URL + `/User/getAllcategorylist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log(
        //   'All Category Response----------->>>>>',
        //   response.data.getAll,
        // );
        setAll_Category(response?.data?.getAll);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('All Category Catch error', error);
        setIsLoading(false);
      });
  };

  const _ExSubCategory = async () => {
    const token = await _getStorage('token');
    setIsLoading(true);
    axios
      .get(BASE_URL + `/User/getAllcategorylist1`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log(
        //   '_ExSubCategory Category Two Response----->>>',
        //   response?.data?.getAll,
        // );
        setEx_category_Two(response?.data?.getAll);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('All Category Two Catch error', error);
        setIsLoading(false);
      });
  };

  const _FreshnessCategory = async () => {
    const token = await _getStorage('token');
    setIsLoading(true);
    axios
      .get(BASE_URL + `/User/freshProductlist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // console.log('Freshness Response----->>>', res?.data?.result);
        setFreshnes_Cat(res?.data?.result);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error Freshness catch error---->>>', error);
        setIsLoading(false);
      });
  };

  const _Nuts_and_Dry_sCategory = async () => {
    const token = await _getStorage('token');
    // console.log(token);
    setIsLoading(true);
    axios
      .get(BASE_URL + `/User/nutdryProductlist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // console.log('Nuts_and_Dry Response----->>>', res?.data?.result);
        setNuts_and_Dry_Cat(res?.data?.result);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error Nuts_and_Dry catch error---->>>', error);
        setIsLoading(false);
      });
  };

  const _Order_Again = async () => {
    const token = await _getStorage('token');
    console.log('token', token);
    setIsLoading(true);
    axios
      .get(BASE_URL + `/User/getTrandingProduct`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log('ORDER GAAIN=========', response?.data?.result);
        setOrder_Again(response?.data?.result);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('order again catch Error', error);
        setIsLoading(false);
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

  const toggleBottomNavigationView = item => {
    setVisible(!visible);
    setPrductByiDetails(item);
  };
  const toggleExpandedOne = () => {
    setCollapsed(!collapsed);
  };

  const wishlist = useSelector(state => state.WishlistReducerSlice.wishlist);
  const cartdata = useSelector(state => state.CartReducerSlice.cart);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {isLoading ? (
        <HomeShimmerPlaceHolder />
      ) : (
        <SafeAreaView style={Styles.container}>
          <StatusBar
            barStyle={COLORS.WHITE}
            hidden={false}
            backgroundColor={COLORS.GREEN}
            translucent={true}
          />
          <Animated.View style={[Styles.header, {transform: [{translateY}]}]}>
            <Header
              onPressserch={() => navigation.navigate(Routes.SEARCH_BAR)}
              titleonPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
              onPress={() => navigation.navigate(Routes.PROFILE_SCREEN)}
              {...{headerHeight}}
            />
          </Animated.View>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            // onMomentumScrollEnd={handleSnap}
            ref={ref}
            contentContainerStyle={Styles.AnimatedContainer}
            onScroll={handleScroll}>
            <View style={Styles.CONTAINERBOX2}>
              <View style={Styles.SubTitleheader}>
                <Text style={Styles.titlemain}>All Categories</Text>
                <TouchableOpacity
                  onPress={toggleExpanded}
                  activeOpacity={0.6}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={Styles.titleview}>View all</Text>
                  <MaterialIconsIcon
                    title={
                      collapsed ? 'keyboard-arrow-right' : 'keyboard-arrow-down'
                    }
                    size={22}
                    IconColor={COLORS.GRAYDARK}
                  />
                </TouchableOpacity>
              </View>

              <Collapsible collapsed={collapsed}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                  data={all_Category.slice(0, 2)}
                  renderItem={({item, index}) => (
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                          navigation.navigate(Routes.SUB_CATEGRIES_MODAL, item)
                        }
                        style={Styles.fruitItemSTY}>
                        <View style={[Styles.COTVS]}>
                          <Image
                            source={{uri: item?.categoryIcon}}
                            style={Styles.fruitImageSTY}
                          />
                        </View>
                      </TouchableOpacity>

                      <View style={Styles.fruitnameSTY}>
                        <Text style={Styles.fruitnametext}>
                          {item?.categoryName}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </Collapsible>
              <View style={{}}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{paddingBottom: 5}}
                  numColumns={4}
                  // data={showModal?all_Category:}
                  data={all_Category.slice(2, 6)}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate(Routes.SUB_CATEGRIES_MODAL, item)
                      }
                      key={index}
                      style={Styles.CATALLMAINSTYLS}>
                      <View style={Styles.CATBOXMAINSTYLS}>
                        <Image
                          source={{uri: item.categoryIcon}}
                          style={Styles.IMAGEALLCATLOGO}
                        />
                      </View>
                      <Text numberOfLines={2} style={Styles.CATTITLESTYLS}>
                        {item.categoryName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              <View style={Styles.EXPLOREMAINCONTAINER}>
                {all_Category
                  .slice(6, all_Category.length)
                  .map((item, index) => (
                    <Collapsible collapsed={collapsed} key={index}>
                      <View style={Styles.EXPLOREBOX}>
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() =>
                            navigation.navigate(
                              Routes.SUB_CATEGRIES_MODAL,
                              item,
                            )
                          }
                          style={Styles.EXPLOREICON}>
                          <Image
                            source={{uri: item.categoryIcon}}
                            style={Styles.IMAGEALLCATLOGO}
                          />
                        </TouchableOpacity>
                        <Text numberOfLines={2} style={Styles.CATTITLESTYLS}>
                          {item.categoryName}
                        </Text>
                      </View>
                    </Collapsible>
                  ))}
              </View>
            </View>
            <TouchableOpacity
              onPress={toggleExpanded}
              activeOpacity={0.6}
              style={[Styles.TOGGLEEXPOSTYLS]}>
              {/* <SimpleLineIconsIcon
                title={collapsed ? 'arrow-down' : 'arrow-up'}
                size={26}
                IconColor={COLORS.GRAYDARK}
              /> */}

              <Image
                source={collapsed ? Down_Arrow : Up_Arrow}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
            <View style={{marginHorizontal: 15}}>
              <Text style={Styles.EXPLORENEWTITLE}>Explore New Categories</Text>
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 5}}
              horizontal
              data={ex_Category_Two}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Routes.SUB_CATEGRIES_2, item)
                  }
                  activeOpacity={0.7}
                  key={index}
                  style={[
                    Styles.CONTAINERBOX,
                    {backgroundColor: item.catColor},
                  ]}>
                  <Image
                    source={{uri: item.categoryIcon}}
                    style={Styles.EXPLOREIMAGESTYL}
                  />
                  <Text style={Styles.EXPLORESUBTITLE}>
                    {item.categoryName}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={Styles.SWIPERCONTANINER}>
              <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={10}
                showsPagination={false}
                style={{}}>
                {firstBanner.map((item, index) => (
                  <View key={index}>
                    <Image
                      source={{uri: item.bannerImageUrl}}
                      style={Styles.BANNERSTYLES}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
            <View style={{marginHorizontal: 10}}>
              {order_Again?.length !== 0 ? (
                <View style={Styles.SubTitleheader}>
                  <Text style={Styles.titlemain}>Tranding Product</Text>
                  {order_Again.some(item => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate(Routes.PRODUCT_ITEM)}
                      // onPress={toggleExpanded}
                      activeOpacity={0.6}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={Styles.titleview}>View all</Text>
                      <MaterialIconsIcon
                        title={'keyboard-arrow-right'}
                        size={22}
                        IconColor={COLORS.GRAYDARK}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 5}}
              horizontal
              data={order_Again}
              renderItem={({item, index}) => (
                <View key={index}>
                  <Productinfo
                    key={index}
                    onPress={() => {
                      toggleBottomNavigationView(item);
                    }}
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
                    Stocktitle={
                      item?.productStock === 'yes' ? null : 'Out of stock'
                    }
                    ProductName={item?.productName}
                    ProductSubName={item?.productUnit}
                    discountPrice={item?.discountPrice}
                    ProductPrice={item?.productPrice}
                    UIBotton={
                      <View>
                        <View>
                          {cartdata.map((value, index) => (
                            <View key={value?._id}>
                              {value?._id == item?._id ? (
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
                              style={Styles.ADDBOTTONSTYL}>
                              <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    }
                  />
                </View>
              )}
            />
            <Pressable style={Styles.SWIPERCONTANINER}>
              <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={10}
                showsPagination={false}
                style={{}}>
                {second_Banner.map((item, index) => (
                  <View key={index}>
                    <Image
                      source={{uri: item.bannerImageUrl}}
                      style={Styles.BANNERSTYLES}
                    />
                  </View>
                ))}
              </Swiper>
            </Pressable>
            <View style={{marginHorizontal: 10}}>
              <View style={Styles.SubTitleheader}>
                <Text style={Styles.titlemain}>Buy 'Em Now</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Routes.FRUITS_VEGETABLES, {})
                  }
                  activeOpacity={0.6}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={Styles.titleview}>View all</Text>
                  <MaterialIconsIcon
                    title={'keyboard-arrow-right'}
                    size={22}
                    IconColor={COLORS.GRAYDARK}
                  />
                </TouchableOpacity>
                {/* })} */}
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <LinearGradient
                start={{x: 0, y: 3}}
                end={{x: 1, y: 0}}
                colors={['#38EF7D', '#38EF7D', '#11998E']}
                style={Styles.linearGradient}>
                <View style={{position: 'absolute'}}>
                  <Animated.Text
                    style={[
                      Styles.buttonText,
                      {
                        // top: 0,
                        // left: 0,
                        opacity: imageOpacity,
                      },
                    ]}>
                    Freshness{`\n`}Guranteed
                  </Animated.Text>
                  <Animated.Image
                    source={generousvegetablicon}
                    style={[
                      Styles.IMAGESTYLESBANNER,
                      {
                        opacity: imageOpacity,
                      },
                    ]}
                    resizeMode="cover"
                  />
                </View>
                <FlatList
                  onScroll={handleScrollTow}
                  scrollEventThrottle={16}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingLeft: '35%'}}
                  horizontal
                  data={freshness_Cat}
                  renderItem={({item, index}) => {
                    return (
                      <Productinfo
                        Styles={{top: -5}}
                        key={index}
                        onPress={() =>
                          navigation.navigate(Routes.FRUITS_VEGETABLES, {
                            fruitItem: item,
                          })
                        }
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
                        discountPrice={`Rs.${item?.discountPrice}`}
                        StylesPrices={{top: heightPixel(5)}}
                        ProductPrice={`Rs.${item?.productPrice}`}
                      />
                    );
                  }}
                />
              </LinearGradient>
            </View>
            <View style={{marginHorizontal: 10}}>
              <View style={Styles.SubTitleheader}>
                <Text style={Styles.titlemain}>Nuts & Dry Fruits For You</Text>
                <TouchableOpacity
                  // onPress={toggleExpanded}
                  onPress={() => navigation.navigate(Routes.NUTS_DREY_FRUITS)}
                  activeOpacity={0.6}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={Styles.titleview}>View all</Text>
                  <MaterialIconsIcon
                    title={'keyboard-arrow-right'}
                    size={22}
                    IconColor={COLORS.GRAYDARK}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <LinearGradient
                start={{x: 0, y: 3}}
                end={{x: 1, y: 0}}
                colors={['#AD5389', '#AD5389', '#3C1053']}
                style={Styles.linearGradient}>
                <View style={{position: 'absolute'}}>
                  <Animated.Text
                    style={[Styles.buttonText, {opacity: imageOpacityOne}]}>
                    Nuts & Dry Fruits{`\n`}For You
                  </Animated.Text>
                  <Animated.Image
                    source={generousvegetablicon}
                    style={[
                      Styles.IMAGESTYLESBANNER,
                      {opacity: imageOpacityOne},
                    ]}
                  />
                </View>
                <FlatList
                  onScroll={handleScrollOne}
                  scrollEventThrottle={16}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{paddingLeft: '35%'}}
                  horizontal
                  data={nuts_and_Dry_Cat}
                  renderItem={({item, index}) => (
                    <Productinfo
                      Styles={{margin: 5}}
                      key={index}
                      onPress={() =>
                        navigation.navigate(Routes.NUTS_DREY_FRUITS, {
                          fruitItem: item,
                        })
                      }
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
                      Productimage={{uri: item.productImage}}
                      ProductName={item.productName}
                      ProductSubName={item.productUnit}
                      discountPrice={`Rs.${item.discountPrice}`}
                      StylesPrices={{top: heightPixel(4)}}
                      ProductPrice={`Rs.${item.productPrice}`}
                    />
                  )}
                />
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Lottie
                source={deliveryBoyjson}
                autoPlay
                loop={true}
                style={{height: heightPixel(200)}}
              />

              <Text
                style={{
                  fontSize: fontPixel(30),
                  color: COLORS.GRAYDARK,
                  letterSpacing: 0.4,
                  textAlign: 'center',
                }}>
                Today Only 70%{`\n`}off ❤
              </Text>
            </View>
          </Animated.ScrollView>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={clickHandler}
            style={Styles.touchableOpacityStyle}>
            <Image source={Floatingicon} style={Styles.floatingButtonStyle} />
          </TouchableOpacity>

          <MyModalinfo
            type={'floating-Button'}
            _SubonPress={() => navigation.navigate(Routes.SUB_CATEGRIES_MODAL)}
            isModal={modalVisible}
            _Visible={() => setModalVisible(!modalVisible)}
            _TOP_UI={
              <View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                  }}>
                  <View
                    style={{
                      height: heightPixel(60),
                      width: widthPixel(165),
                      borderRadius: 10,
                      backgroundColor: COLORS.LIGHTGREEN,
                    }}></View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: fontPixel(17),
                      fontWeight: '500',
                      color: COLORS.GRAYDARK,
                    }}>
                    Atta, Rice, Oil & Dals
                  </Text>
                </View> */}
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                  data={all_Category.slice(0, 2)}
                  renderItem={({item, index}) => (
                    // <Collapsible collapsed={collapsed} key={index}>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                          navigation.navigate(Routes.SUB_CATEGRIES_MODAL, item)
                        }
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginHorizontal: 5,
                        }}>
                        <View style={[Styles.COTVS]}>
                          <Image
                            source={{uri: item?.categoryIcon}}
                            style={{
                              height: heightPixel(75),
                              width: widthPixel(180),
                              // resizeMode: 'contain',
                            }}
                          />
                        </View>
                      </TouchableOpacity>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginHorizontal: 10,
                          alignSelf: 'center',
                          marginTop: 3,
                        }}>
                        <Text
                          style={{
                            color: COLORS.BLACK,
                            fontWeight: '500',
                            fontSize: fontPixel(16),
                          }}>
                          {item?.categoryName}
                        </Text>
                      </View>
                    </View>
                    // </Collapsible>
                  )}
                />
              </View>
            }
            _Ui={
              <View style={Styles.MODALPRODUCTBOXMAIN}>
                {all_Category
                  .slice(2, all_Category.length)
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.6}
                      onPress={() =>
                        navigation.navigate(Routes.SUB_CATEGRIES_MODAL, item)
                      }
                      style={Styles.GREENMAINBOXMODAL}>
                      <View style={Styles.MODALBOX}>
                        <Image
                          source={{uri: item.categoryIcon}}
                          style={Styles.IMAGEALLCATLOGO}
                        />
                      </View>
                      <Text numberOfLines={2} style={Styles.MODALTEXT}>
                        {item.categoryName}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            }
          />
          <BottomSheet
            visible={visible}
            onBackButtonPress={() => {}}
            onBackdropPress={() => {}}>
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
                        onPress={toggleExpandedOne}
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
                        data={order_Again}
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
                              Stocktitle={
                                item?.productStock === 'yes'
                                  ? null
                                  : 'Out of stock'
                              }
                              ProductName={item?.productName}
                              ProductSubName={item?.productUnit}
                              discountPrice={item?.discountPrice}
                              ProductPrice={item?.productPrice}
                              UIBotton={
                                <View>
                                  {cartdata.map((value, index) => (
                                    <View key={value?._id}>
                                      {item?._id == value?._id ? (
                                        <View
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
                                  {cartdata.some(
                                    value => value._id == item._id,
                                  ) ? null : (
                                    <TouchableOpacity
                                      onPress={() =>
                                        addItemToCart(PrductByiDetails)
                                      }
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
        </SafeAreaView>
      )}
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  AnimatedContainer: {
    paddingTop: headerHeight,
    backgroundColor: COLORS.WHITE,
    marginVertical: '13%',
    paddingBottom: '15%',
  },

  headercontainerStyles: {
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    width: widthPixel(150),
  },
  headertext: {
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  CONTAINERBOX: {
    backgroundColor: COLORS.GREEN,
    // height: heightPixel(155),
    width: widthPixel(110),
    marginTop: 10,
    elevation: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    paddingVertical: 5,
    // elevation: 10,
  },
  CONTAINERBOX2: {
    // height: heightPixel(190),
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  SubTitleheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    // backgroundColor: 'red',
  },
  titlemain: {
    fontWeight: '500',
    fontSize: fontPixel(18),
    color: COLORS.BLACK,
  },
  titleview: {
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.4,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: widthPixel(50),
    height: heightPixel(50),
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: widthPixel(70),
    height: heightPixel(70),
  },
  CATALLMAINSTYLS: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    width: widthPixel(95),
    alignItems: 'center',
    marginTop: 7,
    alignItems: 'center',
  },
  CATBOXMAINSTYLS: {
    height: heightPixel(60),
    width: widthPixel(60),
    backgroundColor: COLORS.LIGHTGREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightPixel(screenWidth),
  },
  IMAGEALLCATLOGO: {
    height: heightPixel(35),
    width: widthPixel(35),
    resizeMode: 'contain',
  },
  CATTITLESTYLS: {
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.5,
    marginTop: 5,
    textAlign: 'center',
    // alignSelf: 'center',
    fontSize: fontPixel(15),
  },
  EXPLOREMAINCONTAINER: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    // elevation: 8,
    // position: 'relative',
    // alignSelf: 'center',
    // borderBottomRightRadius: 25,
    // borderBottomLeftRadius: 25,
    // paddingVertical: '5%',
    // height: heightPixel(290),
    // zIndex: -1,
  },
  EXPLOREBOX: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.WHITE,
    width: widthPixel(70),
    marginHorizontal: 5,
    alignItems: 'center',
    marginTop: 7,
    alignItems: 'center',
  },
  EXPLOREICON: {
    height: heightPixel(60),
    width: widthPixel(60),
    backgroundColor: COLORS.LIGHTGREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightPixel(screenWidth),
    resizeMode: 'contain',
  },

  TOGGLEEXPOSTYLS: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    width: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  EXPLORENEWTITLE: {
    fontWeight: '500',
    fontSize: fontPixel(18),
    color: COLORS.BLACK,
    marginTop: 5,
  },
  EXPLOREIMAGESTYL: {
    height: heightPixel(90),
    width: widthPixel(90),
    resizeMode: 'contain',
    marginTop: 5,
  },
  EXPLORESUBTITLE: {
    fontSize: fontPixel(16),
    fontWeight: '900',
    textAlign: 'center',
    color: COLORS.WHITE,
    width: widthPixel(100),
  },
  BANNERSTYLES: {
    height: heightPixel(130),
    width: widthPixel(400),
    borderRadius: 10,
    alignSelf: 'center',
  },

  BACKGROUNDINDEXMAIN: {
    height: heightPixel(150),
    width: widthPixel(110),
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  linearGradient: {
    height: heightPixel(200),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: fontPixel(18),
    fontWeight: '500',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  IMAGESTYLESBANNER: {
    height: heightPixel(100),
    width: widthPixel(130),
    top: heightPixel(20),
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

  INCREAMENTBOTTONMAIN: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPixel(70),
    backgroundColor: COLORS.PURPLE,
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 4,
    top: -5,
    paddingVertical: 2,
  },
  DCREAMENTTITLE: {
    color: COLORS.WHITE,
    fontSize: 15,
    // paddingVertical: 4,
    paddingHorizontal: 5,
  },
  ITEMTITEL: {
    color: COLORS.WHITE,
    fontSize: 13,
    paddingVertical: 4,
    fontWeight: '500',
  },
  INCREAMENTTITLE: {
    color: COLORS.WHITE,
    fontSize: 15,
    paddingHorizontal: 5,
  },
  ADDBOTTONSTYL: {
    borderWidth: 1,
    borderColor: COLORS.PURPLE,
    paddingVertical: 4,
    width: widthPixel(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    top: -5,
  },
  BOTTONTEXTSTYL: {
    color: COLORS.PURPLE,
    fontWeight: '500',
    fontSize: fontPixel(15),
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  SWIPERCONTANINER: {
    alignItems: 'center',
    marginTop: 15,
    height: heightPixel(140),
    paddingTop: '1%',
    justifyContent: 'center',
  },
  modalize: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: '97%',
    alignSelf: 'center',
    zIndex: 9998,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 45,
  },
  MODALPRODUCTBOXMAIN: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // justifyContent: 'space-between',
    // justifyContent: 'space-around',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  GREENMAINBOXMODAL: {
    marginTop: 30,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  MODALBOX: {
    height: heightPixel(60),
    width: widthPixel(60),
    backgroundColor: COLORS.LIGHTGREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightPixel(screenHeight),
  },
  MODALTEXT: {
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.5,
    marginTop: 5,
    fontSize: fontPixel(15),
    width: 70,
  },
  CONTAINERHEART: {alignItems: 'flex-end', margin: 5},
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
  COTVS: {
    height: heightPixel(70),
    width: widthPixel(175),
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: COLORS.LIGHTGREEN,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  fruitItemSTY: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  fruitImageSTY: {
    height: heightPixel(75),
    width: widthPixel(180),
    resizeMode: 'contain',
    alignSelf: 'center',
    top: 3,
  },
  fruitnameSTY: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  fruitnametext: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(16),
  },
});
