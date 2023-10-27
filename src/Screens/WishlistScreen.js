import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/Colors';
import MyHeader from '../Components/MyHeader';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Routes from '../Navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {MaterialCommunityIconsTwo, wishlistempty} from '../utils/Const';
import {removeFromWishlist} from '../Redux/ReducerSlice/WishlistReducerSlice';
import {BottomSheet} from 'react-native-btr';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../Redux/ReducerSlice/CartReducerSlice';
import Lottie from 'lottie-react-native';

export default function WishlistScreen({navigation}) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.WishlistReducerSlice?.wishlist);
  const cartdata = useSelector(state => state.CartReducerSlice.cart);

  console.log('wishlist=======', wishlist);

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
  const removeItemFromWishlist = item => {
    setVisible(!visible);
    dispatch(removeFromWishlist(item));
  };
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <StatusBar
        // barStyle="dark-content"
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      <MyHeader
        title={'Wishlist'}
        onPress={() => navigation.goBack()}
        onPressserchbar={() => navigation.navigate(Routes.SEARCH_BAR)}
      />
      {wishlist?.length ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 5}}
          data={wishlist}
          renderItem={({item, index}) => (
            <View key={index}>
              <View style={Styles.CONTAINERMAINBOX}>
                <View>
                  <Image
                    source={{uri: item?.productImage}}
                    style={Styles.IMAGESTYLES}
                  />
                </View>

                <View style={{width: widthPixel(170)}}>
                  <Text numberOfLines={1} style={Styles.TITLESTYLES}>
                    {item?.productName}
                  </Text>
                  <Text numberOfLines={1} style={Styles.SUBTITLESTYLES}>
                    {item?.productDescription}
                  </Text>
                  {/* <Text style={{fontSize: 16}}>⭐⭐⭐⭐⭐</Text> */}
                  {cartdata.map((value, index) => (
                    <View key={index}>
                      {value?._id == item?._id ? (
                        <View style={Styles.CONTAINERMAINBOXPLUS}>
                          <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => decreaseQuantity(value)}
                            style={Styles.DCREAMENTBOTTONINCREAMENT}>
                            <Text style={Styles.TOTALITEMTITLE}>-</Text>
                          </TouchableOpacity>

                          <Text style={Styles.TOTALITEMTITLE}>
                            {value.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => increaseQuantity(value)}
                            activeOpacity={0.6}
                            style={Styles.DCREAMENTBOTTONINCREAMENT}>
                            <Text style={Styles.TOTALITEMTITLE}>+</Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
                <View style={{marginTop: 3}}>
                  <Pressable
                    // onPress={() => removeItemFromWishlist(item)}
                    onPress={toggleBottomNavigationView}
                    style={{alignSelf: 'flex-end'}}>
                    <MaterialCommunityIconsTwo
                      title={'dots-vertical'}
                      size={22}
                      IconColor={COLORS.GRAYDARK}
                    />
                  </Pressable>
                  <Text style={Styles.STYLESPCS}>₹ {item?.discountPrice}</Text>
                  <Text
                    // numberOfLines={1}
                    style={Styles.KGSTYLES}>
                    {item?.productUnit}
                  </Text>

                  <TouchableOpacity
                    onPress={() => addItemToCart(item)}
                    style={Styles.ADDTOCARTBOTTON}>
                    <Text style={{color: COLORS.WHITE}}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}>
                <View
                  style={{
                    backgroundColor: COLORS.WHITE,
                    height: heightPixel(80),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => removeItemFromWishlist(item)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      justifyContent: 'flex-start',
                      marginHorizontal: 20,
                      paddingVertical: 20,
                    }}>
                    <MaterialCommunityIconsTwo
                      title="delete"
                      size={25}
                      IconColor={COLORS.BLACK}
                      IconStyle={{right: widthPixel(7)}}
                    />
                    <Text style={{color: COLORS.BLACK}}>
                      Remove From collection
                    </Text>
                  </TouchableOpacity>
                </View>
              </BottomSheet>
            </View>
          )}
        />
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Lottie
            source={wishlistempty}
            autoPlay
            loop={true}
            style={{height: heightPixel(200)}}
          />
          <Text
            style={{
              color: COLORS.GRAY,
              fontSize: fontPixel(20),
              fontWeight: '500',
              letterSpacing: 0.5,
            }}>
            Your wishlist is <Text style={{color: COLORS.GREEN}}>Empty</Text>
          </Text>
          <Text
            style={{
              color: COLORS.GRAY,
              fontSize: fontPixel(14),
              fontWeight: '500',
              letterSpacing: 0.5,
            }}>
            Explore more and shortlist some items
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.TAB_HOME)}
            style={Styles.shopbutton}>
            <Text style={Styles.ShopText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  CONTAINERMAINBOX: {
    height: heightPixel(150),
    marginHorizontal: 10,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.GRAYDARK,
  },
  IMAGESTYLES: {
    height: heightPixel(100),
    width: widthPixel(83),
    borderRadius: 10,
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  TITLESTYLES: {
    color: COLORS.BLACK,
    fontSize: fontPixel(19),
    fontWeight: '500',
  },
  SUBTITLESTYLES: {
    fontSize: fontPixel(12),
    fontWeight: '500',
    //   width: widthPixel(100),
  },
  CONTAINERMAINBOXPLUS: {
    flexDirection: 'row',
    width: widthPixel(100),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    top: heightPixel(13),
  },
  DCREAMENTBOTTONINCREAMENT: {
    paddingVertical: 3,
    width: widthPixel(33),
    backgroundColor: COLORS.WHITE,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.BLACK,
  },
  TOTALITEMTITLE: {color: COLORS.BLACK, fontSize: fontPixel(18)},
  STYLESPCS: {
    color: COLORS.BLACK,
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  KGSTYLES: {
    color: COLORS.BLACK,
    fontSize: fontPixel(12),
    fontWeight: '500',
    width: widthPixel(90),
    top: 4,
  },
  ADDTOCARTBOTTON: {
    backgroundColor: COLORS.PURPLE,
    width: widthPixel(65),
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  shopbutton: {
    backgroundColor: COLORS.DarkGreen2,
    marginVertical: 20,
    paddingVertical: 12,
    width: widthPixel(150),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  ShopText: {
    color: COLORS.WHITE,
    fontWeight: '500',
    fontSize: fontPixel(16),
  },
});
