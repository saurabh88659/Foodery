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
import {addToCart} from '../Redux/action';
import {useDispatch, useSelector} from 'react-redux';
import SubShimmerPlaceHolder from '../Components/ShimmerPlaceHolder/SubShimmerPlaceHolder';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';

export default function ProdcutsItem({navigation, route}) {
  const SubCatitem = route.params;
  const [heart, setHeart] = useState(true);
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
  const [cartitem, setCartitem] = useState(0);
  const [productiItem, setProductItem] = useState([]);
  const [notFound, setNoFound] = useState('');

  const cartData = useSelector(state => state.reducer);

  const _Handle_AddToCart = item => {
    dispatch(addToCart(item));
  };

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

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader
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
                  // addtocartonPress={}
                  key={index}
                  heartonPress={() => handleAddToWishlist(value)}
                  // heartonPress={() => handleWishlistToggle(value)}
                  IconColor={
                    heart !== value.id ? COLORS.GRAYDARK : COLORS.BROWN
                  }
                  FontAwesomeIcontitle={
                    heart !== value.id ? 'heart-o' : 'heart'
                  }
                  //   onPress={() => toggleBottomNavigationView(value.id)}
                  Productimage={require('../Assets/Logo/mangoicon.png')}
                  ProductName={value.productName}
                  ProductSubName={'1 Piece'}
                  discountPrice={'Rs.80'}
                  ProductPrice={'Rs.190'}
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
                        onPress={() => _Handle_AddToCart(value)}
                        activeOpacity={0.5}
                        style={Styles.ADDBOTTONSTYL}>
                        <Text style={Styles.BOTTONTEXTSTYL}>ADD</Text>
                      </TouchableOpacity>
                      {/* )} */}
                    </View>
                  }
                />
              ))}
            </View>
          </ScrollView>

          {cartData?.length !== 0 && (
            <AddTocart
              onPress={() => navigation.navigate('Cart')}
              Image={bannerIcon}
              ItemTotalofnum={`item ${cartitem}`}
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
});
