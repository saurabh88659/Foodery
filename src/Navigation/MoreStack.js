import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {EntypoIcon} from '../utils/Const';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';

export default function MoreStack({navigation}) {
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <View style={Styles.MainBOx}>
        <View style={Styles.HEADERBOX}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EntypoIcon title="cross" size={35} IconColor={COLORS.GRAYDARK} />
          </TouchableOpacity>
          <Text style={Styles.HEADERTITLE}>Good Morning Akila!</Text>
        </View>
        <ScrollView>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Order History</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Favourite</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Setting</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>My Cart</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Upcoming Product</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Rate us</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Refer a Friend</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Got a Question?</Text>
          </View>
          <View style={Styles.GreenBoxMain}>
            <View style={Styles.Greenbox}></View>
            <Text style={Styles.boxTitle}>Logout</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  MainBOx: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    elevation: 10,
    marginVertical: '5%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  HEADERBOX: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },
  HEADERTITLE: {
    fontSize: fontPixel(20),
    fontWeight: '500',
    color: COLORS.BLACK,
    paddingLeft: '5%',
    letterSpacing: 0.3,
  },
  GreenBoxMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 5,
  },
  Greenbox: {
    height: heightPixel(55),
    width: widthPixel(55),
    backgroundColor: COLORS.LIGHTGREEN,
    borderRadius: 25,
  },
  boxTitle: {
    paddingLeft: '3%',
    color: COLORS.BLACK,
    fontSize: fontPixel(19),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
