import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BASE_URL,
  FontAwesomeIcon,
  IonIcon,
  SimpleToast,
  bannerIcon,
} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {heightPixel} from '../Components/Dimensions';
import axios from 'axios';
import {_getStorage} from '../utils/Storage';
import Productinfo from '../Components/Productinfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementQuantity,
  getCartTotal,
  incrementQuantity,
  removeFromCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../Redux/ReducerSlice/WishlistReducerSlice';
import GlobelStyles from '../utils/GlobelStyles';
import Routes from '../Navigation/Routes';
import AddTocart from '../Components/AddTocart';

export default function SearchBar({navigation}) {
  const [searchBarList, setSearchBarList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    _SearchBarList();
  }, []);

  const _SearchBarList = async () => {
    const token = await _getStorage('token');

    axios
      .get(BASE_URL + `/getAllProductlist`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('Search bar Response', response.data.getAll);
        setSearchBarList(response.data.getAll);
      })
      .catch(error => {
        console.log('Search bar error====>>>', error);
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

  const handleSearch = text => {
    setSearchText(text);
    const filteredItems = searchBarList.filter(item =>
      item.productName.toLowerCase().includes(text.toLowerCase()),
    );
    if (text === '') {
      return true; // Show all data if search text is empty
    }
    setFilteredData(filteredItems);
  };

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, marginTop: heightPixel(80)}}>
      <View style={Styles.sectionStyle}>
        <Pressable onPress={() => navigation.goBack()}>
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.BLACK}
          />
        </Pressable>
        <TextInput
          placeholderTextColor={COLORS.GRAY}
          placeholder="Serch for you fovourites"
          style={Styles.inputStyles}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}>
          {filteredData.map((item, index) => (
            <Productinfo
              Styles={{}}
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
              Productimage={{uri: item.productImage}}
              ProductName={item.productName}
              ProductSubName={item.productUnit}
              discountPrice={`Rs.${item.discountPrice}`}
              StylesPrices={{top: heightPixel(5)}}
              ProductPrice={`Rs.${item.productPrice}`}
              UIBotton={
                <View>
                  {cartdata.map((value, index) => (
                    <View key={value?._id}>
                      {item?._id == value?._id ? (
                        <View style={GlobelStyles.INCREAMENTBOTTONMAIN}>
                          <TouchableOpacity
                            onPress={() => decreaseQuantity(value)}>
                            <Text style={GlobelStyles.DCREAMENTTITLE}>-</Text>
                          </TouchableOpacity>
                          <Text style={GlobelStyles.ITEMTITEL}>
                            {value?.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => increaseQuantity(value)}>
                            <Text style={GlobelStyles.INCREAMENTTITLE}>+</Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  ))}
                  {cartdata.some(value => value?._id == item?._id) ? null : (
                    <TouchableOpacity
                      onPress={() => addItemToCart(item)}
                      activeOpacity={0.5}
                      style={GlobelStyles.ADDBOTTONSTYL}>
                      <Text style={GlobelStyles.BOTTONTEXTSTYL}>ADD</Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
            />
          ))}
        </View>
      </ScrollView>
      {!isKeyboardOpen && cartdata?.length !== 0 && (
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
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: COLORS.GRAY,
    height: heightPixel(60),
    marginHorizontal: 10,
    borderRadius: 7,
    elevation: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    top: -15,
    // marginTop: 10,
  },
  inputStyles: {
    flex: 1,
    height: 45,
    color: COLORS.BLACK,
    fontSize: 15,
    paddingHorizontal: 10,
    letterSpacing: 0.3,
    fontWeight: '500',
  },
  CONTAINERHEART: {alignItems: 'flex-end', margin: 5},
});
