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
import {BASE_URL, SimpleToast, bannerIcon} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
import AddTocart from '../Components/AddTocart';
// import {addToCart} from '../Redux/action';

import {useDispatch, useSelector} from 'react-redux';
import SubShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/SubShimmerPlaceHolder';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';

import {addItem} from '../Redux/Action/actionCart';
import {useIsFocused} from '@react-navigation/native';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  addToCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import Routes from '../Navigation/Routes';

export default function SubCategories({navigation, route}) {
  const CatItem = route.params;
  const [heart, setHeart] = useState(true);
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  const [cartitem, setCartitem] = useState(0);
  const [subCatProduct, setSubCatProduct] = useState([]);
  const [productById, setProductById] = useState([]);
  const IsFocused = useIsFocused();

  const cartData = useSelector(state => state.reducer);
  // console.log('productById---------------->>>>', productById);

  const wishlistData = useSelector(
    state => state.wishlistReducer.wishlistItems,
  );

  useEffect(() => {
    setCartitem(cartData.length);
    if (cartData && cartData.length) {
      cartData.forEach(element => {
        // if(element.itemname===item)
      });
    }
  }, [cartData]);

  // const [addwishlist, setAddwishlist] = useState(false);
  // useEffect(() => {
  //   if (wishlistData && wishlistData.length) {
  //     wishlistData.forEach(element => {
  //       // console.log('element', element);
  //       if (element.itemname === wishlistData.itemname) {
  //         // console.log('hey');
  //         setAddwishlist(true);
  //       }
  //     });
  //   }
  // }, [wishlistData]);

  const SRTDATAItem = [
    {
      id: 1,
      itemname: 'Lemon Squeezer',
      quantity: 1,
    },
    {
      id: 2,
      itemname: 'Hand Blender',
      quantity: 1,
    },
    {
      id: 3,

      itemname: 'Pizza Cutter',
      quantity: 1,
    },
    {
      id: 4,

      itemname: 'Stainless Steel',
      quantity: 1,
    },
    {
      id: 5,

      itemname: 'Stainless Steel',
      quantity: 1,
    },
    {
      id: 6,

      itemname: 'kitchen Tools',
      quantity: 1,
    },
    {
      id: 7,
      itemname: 'kitchen Tools',
      quantity: 1,
    },
    {
      id: 8,
      itemname: 'kitchen Tools',
      quantity: 1,
    },
    {
      id: 9,
      itemname: 'kitchen Tools',
      quantity: 1,
    },
  ];
  const _Handle_AddToCart = item => {
    dispatch(addToCart(item));
  };

  useEffect(() => {
    if (IsFocused) {
      _ProductItem();
      _ProductItemById();
      // setStatusFilter();
    }
    setTimeout(() => {
      setIsloading(true);
    }, 1000);
  }, [IsFocused]);

  const _ProductItem = async () => {
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/User/getsubCategory2/${CatItem._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        // console.log('Product Item response------->>>>', res.data.result);
        setSubCatProduct(res?.data?.result);
      })
      .catch(error => {
        console.log(
          'Product Item catch error------->>>>',
          error?.response?.data,
        );
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
        // console.log(
        //   'Product Item _ProductItemById response------->>>>',
        //   res.data,
        // );
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

  const listTab = [
    {
      Type: 'All',
      name: 'Epic data',
      id: 1,
    },
    {
      Type: 'Purple',
      name: 'Epic number',
      id: 2,
    },
    {
      Type: 'Green',
      name: 'Epic of To',
      id: 3,
    },
  ];

  const data = [
    {
      itemname: 'Lemon Squeezer',
      Type: 'All',
      id: 1,
      quantity: 1,
    },
    {
      itemname: 'Hand Blender',
      Type: 'Purple',
      id: 2,
      quantity: 1,
    },
    {
      itemname: 'Pizza Cutter',
      Type: 'Green',
      id: 3,
      quantity: 1,
    },
    {
      itemname: 'Stainless Steel',
      Type: 'All',
      id: 4,
    },
    {
      itemname: 'kitchen Tools',
      Type: 'Purple',
      id: 5,
      quantity: 1,
    },
    {
      itemname: 'kitchen Tools',
      Type: 'Green',
      id: 6,
      quantity: 1,
    },
    {
      itemname: 'kitchen Tools',
      Type: 'Green',
      id: 7,
      quantity: 1,
    },
    {
      itemname: 'kitchen Tools',
      Type: 'Green',
      id: 8,
      quantity: 1,
    },
  ];

  const [status, setStatus] = useState('tab1');
  const [detalist, setDetalist] = useState(productById);
  const setStatusFilter = type => {
    if (type !== 'tab1') {
      setDetalist([...productById.filter(item => item.type === type)]);
    } else {
      setDetalist(productById);
    }
    setStatus(type);
  };

  // const handleAddToWishlist = item => {
  //   dispatch(addToWishlist(item));
  //   SimpleToast({title: 'Item Save To Wishlist', isLong: true});
  // };

  // const handleRemoveFromWishlist = itemId => {
  //   dispatch(removeFromWishlist(itemId));
  //   SimpleToast({title: 'Item Remove To Wishlist', isLong: true});
  // };

  // const addToFavorites = item => dispatch(addToWishlist(item));
  // const removeFromFavorites = item => dispatch(removeFromWishlist(item));

  const handleAddToWishlist = item => {
    // addToFavorites(item);
  };
  const handleRemoveFromWishlist = item => {
    // removeFromFavorites(item);
  };

  const exists = item => {
    // if (SRTDATAItem.filter(item => item.id === item.id).length > 0) {
    //   return true;
    // }
    // return false;
  };

  // const handleRemoveFromCart = () => {
  //   removeItem(item.id);
  // };

  const handleAddToCart = item => {
    // console.log(item._id)
    dispatch(addItem());
  };

  const addItemToCart = item => {
    console.log('hey------------>>', item);
    dispatch(addToCart(item));
  };
  // const removeItemFromCart = item => {
  //   dispatch(removeFromCart(item));
  // };
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

  const cartdata = useSelector(state => state.CartReducerSlice.cart);
  console.log('cart------->>>', cartdata);

  console.log('detalist', detalist);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader title={CatItem.name} onPress={() => navigation.goBack()} />
      {isloading ? (
        <SafeAreaView style={Styles.CONTAINERMAIN}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={{uri: CatItem.categoryBanner}}
              style={Styles.bannerImage}
            />
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}
              horizontal
              data={subCatProduct}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setStatusFilter(item.type)}
                  activeOpacity={0.7}
                  style={{
                    alignItems: 'center',
                    marginVertical: 5,
                    alignItems: 'center',
                  }}>
                  <View style={Styles.BOXCONTAINE}>
                    <Image
                      source={{uri: item.subCategoryPic}}
                      style={Styles.IMAGETOOLS}
                    />
                  </View>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontWeight: '500',
                      color: COLORS.GRAYDARK,
                      textAlign: 'center',
                      // backgroundColor: 'red',
                      width: 100,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View style={Styles.CONTAINERBOXMAIN}>
              {detalist.map((value, index) => (
                <Productinfo
                  // addtocartonPress={}
                  key={index}
                  // heartonPress={() => handleAddToWishlist(value)}
                  heartonPress={() =>
                    exists(value)
                      ? handleRemoveFromWishlist(value)
                      : handleAddToWishlist(value)
                  }
                  // heartonPress={() => handleWishlistToggle(value)}
                  IconColor={
                    heart !== value.id ? COLORS.GRAYDARK : COLORS.BROWN
                  }
                  // FontAwesomeIcontitle={
                  //   heart !== value.id ? 'heart-o' : 'heart'
                  // }
                  FontAwesomeIcontitle={exists(value) ? 'heart-o' : 'heart'}
                  //   onPress={() => toggleBottomNavigationView(value.id)}
                  Productimage={require('../Assets/Logo/mangoicon.png')}
                  ProductName={value.productName}
                  ProductSubName={'1 Piece'}
                  discountPrice={'Rs.80'}
                  ProductPrice={value.productPrice}
                  UIBotton={
                    <View>
                      <TouchableOpacity
                        // onPress={() => _Handle_AddToCart(value)}
                        onPress={() => addItemToCart(value)}
                        activeOpacity={0.5}
                        style={Styles.ADDBOTTONSTYL}>
                        <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                      </TouchableOpacity>
                    </View>
                  }
                />
              ))}
            </View>
            {cartdata.map((item, index) => (
              <View>
                <View style={Styles.INCREAMENTBOTTONMAIN}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item)}>
                    <Text style={Styles.DCREAMENTTITLE}>-</Text>
                  </TouchableOpacity>
                  <Text style={Styles.ITEMTITEL}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item)}>
                    <Text style={Styles.INCREAMENTTITLE}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {cartdata?.length !== 0 && (
            <AddTocart
              onPress={() => navigation.navigate(Routes.TAB_CART)}
              Image={bannerIcon}
              // ItemTotalofnum={`item ${cartitem}`}
              ItemTotalofnum={`item ${cartdata.length}`}
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
    height: heightPixel(90),
    width: widthPixel(80),
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
