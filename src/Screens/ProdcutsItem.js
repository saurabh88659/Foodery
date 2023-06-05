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
import {
  BASE_URL,
  FontAwesomeIcon,
  SimpleToast,
  bannerIcon,
} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
import AddTocart from '../Components/AddTocart';
// import {addToCart} from '../Redux/action';
import {useDispatch, useSelector} from 'react-redux';
import SubShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/SubShimmerPlaceHolder';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import Routes from '../Navigation/Routes';
import {
  addToWishlist,
  removeFromWishlist,
} from '../Redux/ReducerSlice/WishlistReducerSlice';

export default function ProdcutsItem({navigation, route}) {
  const SubCatitem = route.params;
  const [heart, setHeart] = useState(true);
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  const [cartitem, setCartitem] = useState(0);
  const [productiItem, setProductItem] = useState([]);
  const [notFound, setNoFound] = useState('');

  const cartData = useSelector(state => state.reducer);

  // const _Handle_AddToCart = item => {
  //   dispatch(addToCart(item));
  // };

  useEffect(() => {
    _ProductItem();
  }, []);

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
        setProductItem(res.data.getAll);
        setIsloading(false);
      })
      .catch(error => {
        console.log('Product Item catch error------->>>>', error.response.data);
        setIsloading(false);
        if (error.response.data.message == 'Data Not Founded') {
          setNoFound(error.response.data.message);
        }
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
    dispatch(addToWishlist(value));
  };
  const removeItemFromWishlist = value => {
    dispatch(removeFromWishlist(value));
  };
  const wishlist = useSelector(state => state.WishlistReducerSlice.wishlist);

  const cartdata = useSelector(state => state.CartReducerSlice.cart);

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
      />
      {notFound ? (
        <Text
          style={{
            color: COLORS.GRAYDARK,
            alignSelf: 'center',
            justifyContent: 'center',
            fontSize: fontPixel(15),
          }}>
          {notFound}
        </Text>
      ) : isloading ? (
        <SubShimmerPlaceHolder />
      ) : (
        <SafeAreaView style={Styles.CONTAINERMAIN}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.CONTAINERBOXMAIN}>
              {productiItem.map((value, index) => (
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
                  //   onPress={() => toggleBottomNavigationView(value.id)}
                  Productimage={{uri: value?.productImage}}
                  ProductName={value?.productName}
                  ProductSubName={value?.productUnit}
                  discountPrice={'Rs.80'}
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
              ItemTotalofnum={`item ${cartdata?.length}`}
              PriceTotalofnum={'Rs.10'}
            />
          )}
        </SafeAreaView>
      )}
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
  CONTAINERHEART: {alignItems: 'flex-end', margin: 5},
});
