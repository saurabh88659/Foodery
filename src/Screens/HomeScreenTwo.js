import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../utils/Colors';
import {heightPixel, widthPixel, fontPixel} from '../Components/Dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {userIconHome} from '../utils/Const';

function HomeScreenTwo({navigation}) {
  const data = [
    {
      title: 'Brown eggs Sweet fresh stawberry Sweet fresh stawberry',
      type: 'dairy',
      price: 28.1,
      Weight: 2,
    },
    {
      title: 'Sweet fresh stawberry',
      type: 'fruit',
      price: 29.45,
      Weight: 4,
    },
    {
      title: 'Asparagus',
      type: 'vegetable',
      price: 18.95,
      Weight: 7,
    },
    {
      title: 'Green smoothie',
      type: 'dairy',
      price: 17.68,
      Weight: 2,
    },
    {
      title: 'Raw legums',
      type: 'vegetable',
      price: 17.11,
      Weight: 2,
    },
    {
      title: 'Baking cake',
      type: 'dairy',
      price: 11.14,
      Weight: 2,
    },
    {
      title: 'Pesto with basil',
      type: 'vegetable',
      price: 18.19,
      Weight: 2,
    },
    {
      title: 'Hazelnut in black ceramic bowl',
      type: 'vegetable',
      price: 27.35,
      Weight: 2,
    },
    {
      title: 'Fresh stawberry',
      type: 'fruit',
      price: 28.59,
      Weight: 2,
    },
    {
      title: 'Lemon and salt',
      type: 'fruit',
      price: 15.79,
      Weight: 2,
    },
    {
      title: 'Homemade bread',
      type: 'bakery',
      price: 17.48,
      Weight: 2,
    },
    {
      title: 'Legums',
      type: 'vegetable',
      price: 14.77,
      Weight: 2,
    },
    {
      title: 'Fresh tomato',
      type: 'vegetable',
      price: 16.3,
      Weight: 2,
    },
    {
      title: 'Healthy breakfast',
      type: 'fruit',
      price: 13.02,
      Weight: 2,
    },
  ];

  const dataSRT = [
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
    {
      name: 'dablu',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <View style={Styles.HeadersSty}>
        <TouchableOpacity style={{paddingTop: 15}}>
          <Text style={Styles.ADDRESSTEXTSTYLES}>Delivery in 3 minutes</Text>
          <View style={Styles.SUBADDRESSTEXTSTYL}>
            <Text numberOfLines={2} style={Styles.ADDRESSTITLESTYL}>
              Home-Kickr Tech Home-Kickr Tech
            </Text>
            <Icon name="arrow-drop-down" color={COLORS.BLACK} size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.USERICONSTYLCON}>
          <Image source={userIconHome} style={Styles.USERICON} />
        </TouchableOpacity>
      </View>
      <View style={Styles.sectionStyle}>
        <EvilIcons name="search" color={COLORS.BLACK} size={25} />
        <TextInput
          placeholderTextColor={COLORS.GRAY}
          placeholder="Serch for you fovourites"
          style={Styles.inputStyles}
        />
      </View>

      <ScrollView>
        <View style={Styles.BESTSELLCONTAINER}>
          <Text style={Styles.TITLEBESTSELL}>Bestsellers</Text>
          <TouchableOpacity>
            <Text style={Styles.ALLTITLESTYL}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}>
          {data.map((value, index) => (
            <View key={index}>
              <View style={Styles.headercontainerstyles}>
                <View style={Styles.BESTSELLIMAGESTYLSCONTAINER}>
                  <Image
                    source={require('../Assets/Logo/laysicone.png')}
                    style={{height: 80, width: 80}}
                  />
                </View>

                <View style={{paddingHorizontal: 10}}>
                  <Text numberOfLines={2} style={Styles.BESTTITLESTYL}>
                    {value.title}
                  </Text>
                  <Text style={{color: COLORS.BLACK}}>{value.Weight}kg</Text>
                  <View style={Styles.BESTSELLPRICE}>
                    <Text style={{color: COLORS.BLACK}}>₹ {value.price}</Text>
                    <TouchableOpacity style={Styles.BESTSELLSTYL_ADD_BOTTON}>
                      <Text style={{color: COLORS.GREEN}}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={[Styles.BESTSELLCONTAINER, {marginTop: 15}]}>
          <Text style={Styles.TITLEBESTSELL}> Shop By category</Text>
          <TouchableOpacity>
            <Text style={Styles.ALLTITLESTYL}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.SHOP_BY_MAIN_CONTAINER}>
          {dataSRT.map((value, index) => (
            <TouchableOpacity key={index} style={Styles.SHOP_BY_CONTAINER}>
              <View style={Styles.SHOP_BY_IMAGE_STYLES_CONTAINER}>
                <Image
                  source={require('../Assets/Logo/laysicone.png')}
                  style={{height: 60, width: 60}}
                />
              </View>
              <Text style={Styles.SHOP_BY_TITLE}>Lay's Logo</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversation: {color: COLORS.BLACK, fontSize: 16, fontWeight: 'bold'},
  searchText: {
    color: COLORS.BLACK,
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
  },
  searchBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#0F0F0F',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  HeadersSty: {
    height: heightPixel(120),
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GRAY,
    height: 45,
    marginHorizontal: 15,
    borderRadius: 7,
    elevation: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    top: -15,
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
  headercontainerstyles: {
    marginHorizontal: 10,
    marginTop: 20,
    width: widthPixel(150),
  },
  ADDRESSTEXTSTYLES: {
    color: COLORS.BLACK,
    fontSize: fontPixel(21),
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  SUBADDRESSTEXTSTYL: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 3,
    width: widthPixel(300),
  },
  ADDRESSTITLESTYL: {
    color: COLORS.BLACK,
    fontSize: fontPixel(16),
    fontWeight: '500',
    letterSpacing: 0.5,
    // width: widthPixel(300),
  },
  USERICONSTYLCON: {
    height: heightPixel(50),
    width: widthPixel(50),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  USERICON: {height: heightPixel(45), width: widthPixel(40)},
  BESTSELLCONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  TITLEBESTSELL: {
    color: COLORS.BLACK,
    fontSize: fontPixel(20),
    fontWeight: '500',
  },
  ALLTITLESTYL: {
    color: COLORS.GRAY,
    fontSize: fontPixel(18),
    fontWeight: '500',
  },
  BESTSELLIMAGESTYLSCONTAINER: {
    backgroundColor: COLORS.WHITE,
    height: 130,
    width: 135,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },

  BESTTITLESTYL: {
    color: COLORS.BLACK,
    marginTop: 5,
    height: heightPixel(50),
  },
  BESTSELLPRICE: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BESTSELLSTYL_ADD_BOTTON: {
    paddingVertical: 5,
    width: widthPixel(75),
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  SHOP_BY_MAIN_CONTAINER: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  SHOP_BY_CONTAINER: {
    width: widthPixel(80),
    marginTop: 10,
    elevation: 10,
  },
  SHOP_BY_IMAGE_STYLES_CONTAINER: {
    backgroundColor: COLORS.WHITE,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  SHOP_BY_TITLE: {
    color: COLORS.BLACK,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: fontPixel(15),
  },
});
export default HomeScreenTwo;
