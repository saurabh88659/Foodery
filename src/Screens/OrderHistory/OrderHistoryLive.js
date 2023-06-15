import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyHeader from '../../Components/MyHeader';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../Redux/ReducerSlice/WishlistReducerSlice';
import {COLORS} from '../../utils/Colors';
import {FontAwesomeIcon, bannerIcon} from '../../utils/Const';
import {heightPixel, fontPixel, widthPixel} from '../../Components/Dimensions';

export default function OrderHistoryLive({navigation}) {
  const dispatch = useDispatch();

  const wishlist = useSelector(state => state.WishlistReducerSlice.wishlist);
  console.log('wishlist', wishlist);

  const SRTDATA = [
    {
      id: '0',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqg_OBzcVDnKHv1d3hyVk_WlCo43pzit4CJQ&usqp=CAU',
      name: 'icecream',
    },
    {
      id: '1',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85O96gPiso_j2gaS0cePTBY4mCR3pumV6tw&usqp=CAU',
      name: 'biscuit',
    },
    {
      id: '2',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicQWeRoxxLEr1RLIp8dJtw-NQvSE4xtlhwA&usqp=CAU',
      name: 'chocolate',
    },
  ];

  const addtoWishlist = item => {
    // console.log('hey', item);
    dispatch(addToWishlist(item));
  };
  const removeItemFromWishlist = item => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 5}}
        data={SRTDATA}
        renderItem={({item, index}) => (
          <View>
            <View style={Styles.CONTAINERMAINBOX}>
              <View>
                <Image source={bannerIcon} style={Styles.IMAGESTYLES} />
              </View>
              <View style={{}}>
                <Text numberOfLines={1} style={Styles.TITLESTYLES}>
                  Mango Alphonso
                </Text>
                <Text numberOfLines={1} style={Styles.SUBTITLESTYLES}>
                  Pick up from organic farms
                </Text>
                <Text style={{fontSize: 16, marginTop: 3}}>⭐⭐⭐⭐⭐</Text>
                <View style={Styles.CONTAINERMAINBOXPLUS}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={Styles.DCREAMENTBOTTONINCREAMENT}>
                    <Text style={Styles.TOTALITEMTITLE}>-</Text>
                  </TouchableOpacity>
                  <Text style={Styles.TOTALITEMTITLE}>0</Text>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={Styles.DCREAMENTBOTTONINCREAMENT}>
                    <Text style={Styles.TOTALITEMTITLE}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 3}}>
                <Text style={Styles.STYLESPCS}>6 Pcs</Text>
                <Text
                  // numberOfLines={1}
                  style={Styles.KGSTYLES}>
                  (Approx. 1.2Kg - 1.4kg)
                </Text>

                {wishlist.some(value => value?.id == item?.id) ? (
                  <TouchableOpacity
                    onPress={() => removeItemFromWishlist(item)}
                    style={Styles.ADDTOCARTBOTTON}>
                    <FontAwesomeIcon
                      title={'heart-o'}
                      size={20}
                      IconColor={COLORS.GRAYDARK}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => addtoWishlist(item)}
                    style={Styles.ADDTOCARTBOTTON}>
                    <FontAwesomeIcon
                      title={'heart'}
                      size={20}
                      IconColor={COLORS.BROWN}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      />
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
    height: heightPixel(115),
    width: widthPixel(100),
    borderRadius: 10,
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
    marginTop: 13,
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
});
