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
import {COLORS} from '../utils/Colors';
import MyHeader from '../Components/MyHeader';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {bannerIcon} from '../utils/Const';
import Routes from '../Navigation/Routes';
import {useSelector} from 'react-redux';

export default function WishlistScreen({navigation}) {
  const SRTDATA = [
    {name: 'Ravi rai'},
    {name: 'Ravi rai'},
    {name: 'Ravi rai'},
    {name: 'Ravi rai'},
    {name: 'Ravi rai'},
    {name: 'Ravi rai'},
  ];

  const {item, favorites} = useSelector(state => state.wishlistReducer);
  console.log('movies----------->>>>>>', item, favorites);

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
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 5}}
        data={SRTDATA}
        renderItem={({item, index}) => (
          <View key={index}>
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
                <TouchableOpacity style={Styles.ADDTOCARTBOTTON}>
                  <Text style={{color: COLORS.WHITE}}>ADD</Text>
                </TouchableOpacity>
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
