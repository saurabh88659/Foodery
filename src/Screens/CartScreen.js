import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MyHeader from '../Components/MyHeader';
import {
  IonIcon,
  MaterialCommunityIconsTwo,
  MaterialIconsIcon,
  bannerIcon,
} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Productinfo from '../Components/Productinfo';
import GlobelStyles from '../utils/GlobelStyles';
import Button from '../Components/Button';
import Routes from '../Navigation/Routes';

export default function CartScreen({navigation}) {
  const [heart, setHeart] = useState(true);

  const SRTDATANOW = [
    {
      nname: 'name',
    },
    {
      nname: 'name',
    },
    {
      nname: 'name',
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

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader title={'Shopping Cart'} onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingBottom: 15}}>
        <View style={Styles.LOCATIONMAINBOX}>
          <View style={Styles.SUBTITLELOCATIONS}>
            <IonIcon
              title="ios-location-sharp"
              size={23}
              IconColor={COLORS.BLACK}
            />
            <Text numberOfLines={1} style={Styles.SUBTITLELOCATIONS2}>
              Current Locations Current
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
            activeOpacity={0.6}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIconsIcon
              title="keyboard-arrow-down"
              size={25}
              IconColor={COLORS.BLACK}
              IconStyle={{right: widthPixel(7)}}
            />
            <Text style={Styles.SUBTITLELOCATIONS3}>Change Address</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 5}}
          data={SRTDATANOW}
          renderItem={({item, index}) => (
            <View style={Styles.MAINCARD}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image source={bannerIcon} style={Styles.IMAGESTYLES} />
                <View style={{paddingLeft: widthPixel(20)}}>
                  <Text style={Styles.MAINTITEL}>Lady Fingr</Text>
                  <Text style={Styles.DISPRICE}>Rs.230</Text>
                  <Text style={Styles.PRICES}>Rs.120</Text>
                </View>
              </View>
              <View>
                <View style={Styles.CONBOXRIGHT}>
                  <Text style={Styles.SAVEPRICES}>Rs. 100 saved</Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <MaterialCommunityIconsTwo
                      title="delete"
                      size={25}
                      IconColor={COLORS.BLACK}
                      IconStyle={{right: widthPixel(7)}}
                    />
                  </TouchableOpacity>
                </View>
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
            </View>
          )}
        />
        <View
          style={{
            marginVertical: 8,
          }}>
          <Text style={Styles.MIGHTSTYLESTITLE}>You Might Have Missed</Text>
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
                  IconColor={heart !== item.id ? COLORS.GRAYDARK : COLORS.BROWN}
                  FontAwesomeIcontitle={heart !== item.id ? 'heart-o' : 'heart'}
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
                        style={GlobelStyles.ADDBOTTONSTYL}>
                        <Text style={GlobelStyles.BOTTONTEXTSTYL}>ADD</Text>
                      </TouchableOpacity>
                      {/* )} */}
                    </View>
                  }
                />
              </View>
            )}
          />
        </View>
        <View style={Styles.TOTALBOXSTY}>
          <View style={Styles.SUBBOX}>
            <Text style={Styles.TOTALTITLES}>Item Total</Text>
            <Text style={[Styles.TOTALTITLES, {fontSize: fontPixel(20)}]}>
              Rs. 1117
            </Text>
          </View>

          <View style={[Styles.SUBBOX, {marginTop: 5}]}>
            <Text style={Styles.HANDLINGTITLE}>
              Handling Charges
              <Text style={{color: COLORS.GREEN}}> (Rs.10 Saved)</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={Styles.DELIVERYTITLE}>Rs.15</Text>
              <Text style={Styles.FREEPRICES}>Rs.5</Text>
            </View>
          </View>

          <View
            style={[
              Styles.SUBBOX,
              {
                borderBottomWidth: 0.2,
                color: COLORS.LIGHTGREEN,
                paddingVertical: 5,
              },
            ]}>
            <Text style={Styles.HANDLINGTITLE}>
              Delivery Free{' '}
              <Text style={{color: COLORS.GREEN}}>(Rs.36 Saved)</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={Styles.DELIVERYTITLE}>Rs.18</Text>
              <Text style={Styles.FREEPRICES}>Rs.8</Text>
            </View>
          </View>

          <View
            style={[
              Styles.SUBBOX,
              {alignItems: 'center', marginTop: 5, paddingVertical: 7},
            ]}>
            <Text style={Styles.TOTALTITLES}>To pay</Text>
            <Text style={[Styles.TOTALTITLES, {fontSize: fontPixel(20)}]}>
              Rs.1122
            </Text>
          </View>
          <View style={Styles.SAVETHISORDERTITLE}>
            <IonIcon
              title="ios-checkmark-circle"
              size={20}
              IconColor={COLORS.GREEN}
              IconStyle={{}}
            />
            <Text style={{color: COLORS.GREEN}}>
              {' '}
              <Text style={{fontSize: fontPixel(16), fontWeight: '500'}}>
                Rs 91
              </Text>{' '}
              saved on this order
            </Text>
          </View>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 5, marginHorizontal: 10}}
          horizontal
          data={[1, 2, 3, 4]}
          renderItem={({item, index}) => (
            <View key={index} style={[Styles.DELIVERYBOX_FOOTER]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIconsTwo
                  title="bell-ring"
                  size={30}
                  IconColor={COLORS.BLACK}
                  IconStyle={{}}
                />
                <View>
                  <Text style={Styles.DELTITLE}>No Contact Delivery</Text>
                  <Text numberOfLines={3} style={Styles.DELSUBTITLE}>
                    Delivery Partner will leave your order at your door
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        <View
          style={[
            Styles.DELIVERYBOX_FOOTER,
            {
              backgroundColor: COLORS.WHITE,
              marginTop: 5,
              borderColor: COLORS.GRAYDARK,
              elevation: 4,
              marginHorizontal: 15,
              borderWidth: 0,
            },
          ]}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={Styles.DELTITLE}>Order For Someone else</Text>
              <Text style={[Styles.DELTITLE, {color: COLORS.GREEN}]}>ADD</Text>
            </View>
            <Text numberOfLines={3} style={Styles.FOOTERTITLE2}>
              Add a message to be sent as an SMS with your Gift
            </Text>
          </View>
        </View>
        <View
          style={[
            Styles.DELIVERYBOX_FOOTER,
            {
              backgroundColor: COLORS.WHITE,
              marginTop: 5,
              borderColor: COLORS.GRAYDARK,
              elevation: 4,
              marginHorizontal: 15,
              borderWidth: 0,
            },
          ]}>
          <View>
            <Text style={Styles.DELTITLE}>Cancellation Policy</Text>
            <Text numberOfLines={3} style={Styles.FOOTERTITLE2}>
              Order Cannot be Cancelled once packed for delivery. in case of
              unexpected delays, a refund will be provider.if applicable
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 15}}>
          <Button
            title={'Choose address at next step    ▶'}
            onPress={() => navigation.navigate(Routes.ADDRESS_SCREEN)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  LOCATIONMAINBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    alignItems: 'center',
    marginVertical: 10,
  },
  SUBTITLELOCATIONS: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SUBTITLELOCATIONS2: {
    color: COLORS.BLACK,
    fontSize: fontPixel(17),
    fontWeight: '500',
    width: widthPixel(220),
    paddingLeft: 8,
    letterSpacing: 0.2,
  },
  SUBTITLELOCATIONS3: {
    color: COLORS.BLUE,
    fontSize: fontPixel(17),
    fontWeight: '500',
  },
  MAINCARD: {
    height: heightPixel(140),
    backgroundColor: COLORS.LIGHT_WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: COLORS.GRAYDARK,
  },
  IMAGESTYLES: {
    height: heightPixel(100),
    width: widthPixel(90),
    borderRadius: 10,
  },
  CONTAINERMAINBOXPLUS: {
    flexDirection: 'row',
    width: widthPixel(100),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPixel(40),
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
  MAINTITEL: {
    fontSize: fontPixel(18),
    color: COLORS.BLACK,
    fontWeight: '500',
    paddingBottom: 20,
  },
  DISPRICE: {
    color: COLORS.GRAYDARK,
    top: heightPixel(-10),
    textDecorationLine: 'line-through',
    fontSize: fontPixel(17),
  },
  PRICES: {
    fontSize: fontPixel(20),
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  CONBOXRIGHT: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SAVEPRICES: {
    fontSize: fontPixel(13),
    color: COLORS.GREEN,
    fontWeight: '500',
    paddingRight: 10,
  },
  MIGHTSTYLESTITLE: {
    fontSize: fontPixel(18),
    fontWeight: '500',
    color: COLORS.BLACK,
    marginHorizontal: 10,
    //   paddingVertical: 7,
    letterSpacing: 0.5,
  },
  TOTALBOXSTY: {height: heightPixel(200), backgroundColor: COLORS.LIGHT_WHITE},
  SUBBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    top: heightPixel(17),
  },
  TOTALTITLES: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(18),
  },
  HANDLINGTITLE: {color: COLORS.GRAYDARK, fontSize: fontPixel(17)},
  DELIVERYTITLE: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(17),
    paddingRight: 10,
    textDecorationLine: 'line-through',
  },
  FREEPRICES: {
    color: COLORS.GREEN,
    fontSize: fontPixel(17),
  },
  SAVETHISORDERTITLE: {
    paddingVertical: 3,
    backgroundColor: '#cbede1',
    alignItems: 'center',
    marginVertical: heightPixel(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  DELIVERYBOX_FOOTER: {
    // height: heightPixel(70),
    paddingVertical: 8,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    borderColor: COLORS.PURPLE,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 10,
    // backgroundColor: COLORS.LIGHT_WHITE,
  },
  DELTITLE: {
    paddingLeft: widthPixel(10),
    fontSize: fontPixel(16),
    color: COLORS.BLACK,
    fontWeight: '900',
  },
  DELSUBTITLE: {
    paddingLeft: widthPixel(10),
    fontSize: fontPixel(15),
    width: widthPixel(220),
    color: COLORS.GRAYDARK,
  },
  FOOTERTITLE2: {
    fontSize: fontPixel(15),
    color: COLORS.GRAYDARK,
    width: widthPixel(350),
    paddingLeft: widthPixel(10),
  },
});
