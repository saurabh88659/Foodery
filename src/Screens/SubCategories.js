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
import React, {useState, useEffect} from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import {bannerIcon} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
import AddTocart from '../Components/AddTocart';
import {addToCart} from '../Redux/action';
import {useDispatch, useSelector} from 'react-redux';
import SubShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/SubShimmerPlaceHolder';

export default function SubCategories({navigation, route}) {
  const SubName = route.params;
  const [heart, setHeart] = useState(true);
  const IsuseDispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);

  const [cartitem, setCartitem] = useState(0);
  const cartData = useSelector(state => state.reducer);

  // console.log('hey', cartData);
  // console.log('cartitem+++++++++++++DG', cartData[0]);

  useEffect(() => {
    setCartitem(cartData.length);
    if (cartData && cartData.length) {
      cartData.forEach(element => {
        console.log('hey', element);
        // if(element.itemname===)
      });
    }
  }, [cartData]);

  const SRTDATA = [
    {
      name: 'kitchen Tools',
    },
    {
      name: 'kitchen Tools',
    },
    {
      name: 'kitchen Tools',
    },
    {
      name: 'kitchen Tools',
    },
    {
      name: 'kitchen Tools',
    },
    {
      name: 'kitchen Tools',
    },
  ];

  const SRTDATAItem = [
    {
      id: 1,
      itemname: 'Lemon Squeezer',
    },
    {
      id: 2,
      itemname: 'Hand Blender',
    },
    {
      id: 3,

      itemname: 'Pizza Cutter',
    },
    {
      id: 4,

      itemname: 'Stainless Steel',
    },
    {
      id: 5,

      itemname: 'Stainless Steel',
    },
    {
      id: 6,

      itemname: 'kitchen Tools',
    },
    {
      id: 7,
      itemname: 'kitchen Tools',
    },
    {
      id: 8,
      itemname: 'kitchen Tools',
    },
    {
      id: 9,
      itemname: 'kitchen Tools',
    },
  ];

  const _Handle_AddToCart = item => {
    IsuseDispatch(addToCart(item));
  };

  const handleAddToWishlist = item => {
    IsuseDispatch(addWishlistItem(item));
  };

  const handleRemoveFromWishlist = itemId => {
    IsuseDispatch(removeItem(itemId));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsloading(true);
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        barStyle={COLORS.BLACK}
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader title={SubName} onPress={() => navigation.goBack()} />
      {isloading ? (
        <SafeAreaView style={Styles.CONTAINERMAIN}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={bannerIcon} style={Styles.bannerImage} />
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              horizontal
              data={SRTDATA}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    alignItems: 'center',
                    marginVertical: 5,
                    alignItems: 'center',
                  }}>
                  <View style={Styles.BOXCONTAINE}>
                    <Image
                      source={require('../Assets/Logo/mangoicon.png')}
                      style={Styles.IMAGETOOLS}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: '500',
                      color: COLORS.GRAYDARK,
                      textAlign: 'center',
                    }}>
                    Kitchen{`\n`} Tools
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={Styles.CONTAINERBOXMAIN}>
              {SRTDATAItem.map((value, index) => (
                <Productinfo
                  // addtocartonPress={}
                  key={index}
                  heartonPress={() => handleAddToWishlist(value.id)}
                  IconColor={
                    heart !== value.id ? COLORS.GRAYDARK : COLORS.BROWN
                  }
                  FontAwesomeIcontitle={
                    heart !== value.id ? 'heart-o' : 'heart'
                  }
                  //   onPress={() => toggleBottomNavigationView(value.id)}
                  Productimage={require('../Assets/Logo/mangoicon.png')}
                  ProductName={value.itemname}
                  ProductSubName={'1 Piece'}
                  discountPrice={'Rs.80'}
                  ProductPrice={'Rs.190'}
                  UIBotton={
                    <View>
                      {cartData?.length !== 0 ? (
                        <View style={Styles.INCREAMENTBOTTONMAIN}>
                          <TouchableOpacity>
                            <Text style={Styles.DCREAMENTTITLE}>-</Text>
                          </TouchableOpacity>
                          <Text style={Styles.ITEMTITEL}>0</Text>
                          <TouchableOpacity>
                            <Text style={Styles.INCREAMENTTITLE}>+</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => _Handle_AddToCart(value)}
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

          {cartData?.length !== 0 && (
            <AddTocart
              onPress={() => navigation.navigate('CartStack')}
              Image={bannerIcon}
              ItemTotalofnum={`item ${cartitem}`}
              PriceTotalofnum={'Rs.10'}
            />
          )}
        </SafeAreaView>
      ) : (
        <SubShimmerPlaceHolder />
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
  BOXCONTAINE: {
    height: heightPixel(90),
    width: widthPixel(80),
    backgroundColor: COLORS.WHITE,
    elevation: 4,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  IMAGETOOLS: {
    height: heightPixel(60),
    width: widthPixel(80),
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
});
