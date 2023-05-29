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
  Alert,
  BackHandler,
  Pressable,
  Dimensions,
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
} from '../utils/Const';
import Collapsible from 'react-native-collapsible';
import MyModalinfo from '../Components/MyModalinfo';
import HomeShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/HomeShimmerPlaceHolder';
import Routes from '../Navigation/Routes';
import {useDoubleBackPressExit} from '../utils/Handler/BackHandler';
import Swiper from 'react-native-swiper';
import {_getStorage} from '../utils/Storage';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

const {diffClamp} = Animated;
const headerHeight = 58 * 2;

export default function HomeScreen({navigation}) {
  const ref = useRef(null);
  const translateYNumber = useRef();
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const [heart, setHeart] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const IsFocused = useIsFocused();
  const [firstBanner, setFirstBanner] = useState([]);
  const [second_Banner, setSecond_Banner] = useState([]);
  const [all_Category, setAll_Category] = useState([]);
  const [ex_Category_Two, setEx_category_Two] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  }, []);

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

  // const handleSnap = ({nativeEvent}) => {
  //   const offsetY = nativeEvent.contentOffset.y;
  //   if (
  //     !(
  //       translateYNumber.current === 0 ||
  //       translateYNumber.current === -headerHeight / 2
  //     )
  //   ) {
  //     if (ref.current) {
  //       ref.current.scrollToOffset({
  //         offset:
  //           getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
  //           -headerHeight / 2
  //             ? offsetY + headerHeight / 2
  //             : offsetY - headerHeight / 2,
  //       });
  //     }
  //   }
  // };

  const Orderagain = [
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
    {
      id: 4,
      Nmae: 'ravi rai',
    },
    {
      id: 5,
      Nmae: 'ravi rai',
    },
  ];

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
    }
  }, [IsFocused]);

  const _First_Banner = async () => {
    const token = await _getStorage('token');
    // console.log('token=========', token);
    axios
      .get(BASE_URL + `/User/getAllBanner`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log('Banner Response=======', response.data);
        setFirstBanner(response.data.advertisement);
        setSecond_Banner(response.data.offer);
      })
      .catch(error => {
        console.log('Banner Catch error', error);
      });
  };

  const _all_Category = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/User/getAllcategorylist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log('All Category Response', response.data.getAll);
        setAll_Category(response.data.getAll);
      })
      .catch(error => {
        console.log('All Category Catch error', error);
      });
  };

  const _ExSubCategory = async () => {
    const token = await _getStorage('token');
    console.log('hey');
    axios
      .get(BASE_URL + `/User/getCategory2`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('All Category Two Response----->>>', response.data.getAll);
        setEx_category_Two(response.data.getAll);
      })
      .catch(error => {
        console.log('All Category Two Catch error', error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {isLoading ? (
        <SafeAreaView style={Styles.container}>
          <StatusBar
            barStyle={COLORS.WHITE}
            hidden={false}
            backgroundColor={COLORS.GREEN}
            translucent={true}
          />

          <Animated.View style={[Styles.header, {transform: [{translateY}]}]}>
            <Header
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

              <View style={{}}>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{paddingBottom: 5}}
                  // horizontal
                  numColumns={4}
                  // data={showModal?all_Category:}
                  data={all_Category.slice(0, 4)}
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
                  .slice(4, all_Category.length)
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
              style={Styles.TOGGLEEXPOSTYLS}>
              <SimpleLineIconsIcon
                title={collapsed ? 'arrow-down' : 'arrow-up'}
                size={22}
                IconColor={COLORS.GRAYDARK}
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
                    source={{uri: item.image}}
                    style={Styles.EXPLOREIMAGESTYL}
                  />
                  <Text style={Styles.EXPLORESUBTITLE}>{item.name}</Text>
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
              <View style={Styles.SubTitleheader}>
                <Text style={Styles.titlemain}>Order Again</Text>
                <TouchableOpacity
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
              </View>
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 5}}
              horizontal
              data={Orderagain}
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
                        {/* <View style={Styles.INCREAMENTBOTTONMAIN}>
                        <TouchableOpacity>
                          <Text style={Styles.DCREAMENTTITLE}>-</Text>
                        </TouchableOpacity>
                        <Text style={Styles.ITEMTITEL}>0</Text>
                        <TouchableOpacity>
                          <Text style={Styles.INCREAMENTTITLE}>+</Text>
                        </TouchableOpacity>
                      </View> */}
                        {/* ) : ( */}
                        <TouchableOpacity
                          // onPress={() => _Handle_AddToCart(value)}
                          activeOpacity={0.5}
                          style={Styles.ADDBOTTONSTYL}>
                          <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                        </TouchableOpacity>
                        {/* )} */}
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
                  // onPress={toggleExpanded}
                  onPress={() => navigation.navigate('FruitsVegetables')}
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
                        // top: 0,
                        // left: 0,
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
                  data={Orderagain}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('FruitsVegetables')}
                      activeOpacity={0.8}
                      key={index}
                      style={Styles.BACKGROUNDINDEXMAIN}></TouchableOpacity>
                  )}
                />
              </LinearGradient>
            </View>
            <View style={{marginHorizontal: 10}}>
              <View style={Styles.SubTitleheader}>
                <Text style={Styles.titlemain}>Nuts & Dry Fruits For You</Text>
                <TouchableOpacity
                  // onPress={toggleExpanded}
                  onPress={() => navigation.navigate('FruitsVegetables')}
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
                  data={Orderagain}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('FruitsVegetables')}
                      activeOpacity={0.8}
                      key={index}
                      style={Styles.BACKGROUNDINDEXMAIN}></TouchableOpacity>
                  )}
                />
              </LinearGradient>
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
            _Ui={
              <View style={Styles.MODALPRODUCTBOXMAIN}>
                {all_Category.map((item, index) => (
                  <TouchableOpacity
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
        </SafeAreaView>
      ) : (
        <HomeShimmerPlaceHolder />
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
    height: heightPixel(80),
    width: widthPixel(80),
    backgroundColor: COLORS.LIGHTGREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightPixel(screenWidth),
  },
  IMAGEALLCATLOGO: {
    height: heightPixel(50),
    width: widthPixel(50),
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
    height: heightPixel(80),
    width: widthPixel(80),
    backgroundColor: COLORS.LIGHTGREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightPixel(screenWidth),
  },

  TOGGLEEXPOSTYLS: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
    height: heightPixel(170),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: fontPixel(18),
    fontWeight: '500',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  IMAGESTYLESBANNER: {
    height: heightPixel(90),
    width: widthPixel(130),
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
  SWIPERCONTANINER: {
    alignItems: 'center',
    marginTop: 15,
    height: heightPixel(140),
    paddingTop: '1%',
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  GREENMAINBOXMODAL: {
    marginTop: 30,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  MODALBOX: {
    height: heightPixel(70),
    width: widthPixel(70),
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
});
