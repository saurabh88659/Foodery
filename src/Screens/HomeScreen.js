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
} from 'react-native';
import Header from '../Components/Header';
// import {getCloser} from '../Components/utils';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
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
} from '../utils/Const';
import Collapsible from 'react-native-collapsible';
import MyModalinfo from '../Components/MyModalinfo';
import HomeShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/HomeShimmerPlaceHolder';
import Routes from '../Navigation/Routes';

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

  const SRTDATANEW = [
    {
      id: 1,
      Name: 'Masala & Dry Fruits',
      FontAwesomeIcon: FontAwesomeIcon,
    },
    {
      id: 2,
      Name: 'Sweet Cravings',
    },
    {
      id: 3,
      Name: 'Frozen Food and Icoe Cream',
    },
    {
      id: 4,
      Name: `Packed ${`\n`}Food`,
    },
  ];
  const SRTDATANEWOKAY = [
    {
      id: 1,
      Name: 'Kitchen Needs',
    },
    {
      id: 2,
      Name: 'Sweet Cravings',
    },
    {
      id: 3,
      Name: 'Frozen Food and Icoe Cream',
    },
    {
      id: 4,
      Name: `Packed ${`\n`}Food`,
    },
    {
      id: 5,
      Name: `Packed ${`\n`}Food`,
    },
    {
      id: 6,
      Name: `Packed ${`\n`}Food`,
    },
    {
      id: 7,
      Name: `Packed ${`\n`}Food`,
    },
    {
      id: 8,
      Name: `Packed ${`\n`}Food`,
    },
  ];

  const SRTDATANEWOKAYEXPOl = [
    {
      id: 1,
      color: '#2DCAD6',
      Name: `Kitchen Needs`,
    },
    {
      id: 2,
      color: '#A005A0',
      Name: 'Sweet Cravings',
    },
    {
      id: 3,
      color: '#F19C06',
      Name: `Bady Care`,
    },
    {
      id: 4,
      color: '#EC0C5E',
      Name: `Makeup & Beauty`,
    },
  ];

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

  let backButtonPressedOnce = false;

  // useEffect(() => {
  //   const handleBackButton = () => {
  //     SimpleToast({title: 'Press back again to exit'});
  //     // Exit the app only if the back button is pressed twice in quick succession
  //     if (backButtonPressedOnce) {
  //       BackHandler.exitApp();
  //     } else {
  //       backButtonPressedOnce = true;
  //       setTimeout(() => {
  //         backButtonPressedOnce = false;
  //       }, 2000); // Timeout duration to allow pressing back twice within 2 seconds
  //     }
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackButton,
  //   );

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, []);

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
              onPress={() => navigation.navigate('ProfileScreen')}
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

              <View>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{paddingBottom: 5}}
                  horizontal
                  data={SRTDATANEW}
                  renderItem={({item, index}) => (
                    <View style={Styles.CATALLMAINSTYLS}>
                      <View style={Styles.CATBOXMAINSTYLS}>
                        <IonIcon
                          title="ios-home-sharp"
                          size={25}
                          IconColor={COLORS.GREEN}
                        />
                      </View>
                      <Text numberOfLines={2} style={Styles.CATTITLESTYLS}>
                        {item.Name}
                      </Text>
                    </View>
                  )}
                />
              </View>
              <View style={Styles.EXPLOREMAINCONTAINER}>
                {SRTDATANEWOKAY.map((value, index) => (
                  <Collapsible collapsed={collapsed} key={index}>
                    <View style={Styles.EXPLOREBOX}>
                      <View style={Styles.EXPLOREICON}>
                        <IonIcon
                          title="ios-home-sharp"
                          size={25}
                          IconColor={COLORS.GREEN}
                        />
                      </View>
                      <Text numberOfLines={2} style={Styles.EXPLORETITLESUB}>
                        {value.Name}
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
              data={SRTDATANEWOKAYEXPOl}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubCategories', item.Name)
                  }
                  activeOpacity={0.7}
                  key={index}
                  style={[Styles.CONTAINERBOX, {backgroundColor: item.color}]}>
                  <Image
                    source={require('../Assets/Logo/expoloricon.png')}
                    style={Styles.EXPLOREIMAGESTYL}
                  />
                  <Text style={Styles.EXPLORESUBTITLE}>{item.Name}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Image
                source={require('../Assets/Logo/baneer22.png')}
                style={Styles.BANNERSTYLES}
              />
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
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Image
                source={require('../Assets/Logo/baneer22.png')}
                style={Styles.BANNERSTYLES}
              />
            </View>

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
    borderRadius: 50,
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
    borderRadius: 50,
  },
  EXPLORETITLESUB: {
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.5,
    marginTop: 5,
    textAlign: 'center',
    fontSize: fontPixel(15),
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
});
