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
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BASE_URL,
  EntypoIcon,
  FontAwesomeIcon,
  IonIcon,
  SimpleToast,
  bannerIcon,
} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import axios from 'axios';
import {_getStorage} from '../utils/Storage';
import Productinfo from '../Components/Productinfo';
import {useDispatch, useSelector} from 'react-redux';
import {BottomSheet} from 'react-native-btr';
import Collapsible from 'react-native-collapsible';

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
  const [visible, setVisible] = React.useState(false);
  const [PrductByiDetails, setPrductByiDetails] = useState('');
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const toggleBottomNavigationView = value => {
    setVisible(!visible);
    setPrductByiDetails(value);
  };

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
          placeholder="Search for you fovourites"
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
              onPress={() => {
                toggleBottomNavigationView(item);
              }}
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

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
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
                    onPress={toggleExpanded}
                    style={GlobelStyles.MAINQTEXTVIEWDETAILS}>
                    <Text numberOfLines={3} style={GlobelStyles.MAINQVIEWMORE}>
                      View More Details
                    </Text>
                    <IonIcon
                      title={
                        collapsed ? 'chevron-down-sharp' : 'chevron-up-sharp'
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
                    data={[1, 2, 3, 4]}
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
                                        <Text style={Styles.DCREAMENTTITLE}>
                                          -
                                        </Text>
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
          </View>
        </View>
      </BottomSheet>
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
    width: widthPixel(65),
    backgroundColor: COLORS.PURPLE,
    alignItems: 'center',
    paddingHorizontal: 7,
    borderRadius: 4,
    top: -5,
    paddingVertical: 2,
  },
  DCREAMENTTITLE: {
    color: COLORS.WHITE,
    fontSize: 14,
    paddingVertical: 4,
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
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  CONTAINERHEART: {alignItems: 'flex-end', margin: 5},
});
