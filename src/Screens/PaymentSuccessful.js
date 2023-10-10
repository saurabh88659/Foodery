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
import {fontPixel, heightPixel} from '../Components/Dimensions';
import Lottie from 'lottie-react-native';
import Routes from '../Navigation/Routes';

export default function PaymentSuccessful({navigation, route}) {
  const predata = route.params;
  console.log('payment details---------------', predata);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <View style={Styles.head}>
        <Text style={Styles.headtext}>Payment Status</Text>
      </View>
      <ScrollView contentContainerStyle>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Lottie
            source={require('../Assets/Lottiejson/animation_lnk0e30m.json')}
            autoPlay={true}
            loop={false}
            style={{height: heightPixel(200)}}
          />
        </View>
        <Text style={Styles.susstext}>PAYMENT SUCCESSFUL</Text>
        <View style={Styles.subbox}>
          <Text style={Styles.subtext2}>
            Your payment has been processed!{'\n'} Details of transaction are
            included below
          </Text>
        </View>
        <Text style={Styles.subtextnumber}>
          Transaction Number : {predata?.orderKeyId}
        </Text>
        <Text style={Styles.subtextnumber}>
          Transaction Ref No : {predata?.TransactionRefNo}
        </Text>
        <View style={Styles.newbox}>
          <Text style={Styles.textone}>Total Amount Paid</Text>
          <Text style={[Styles.textone, {color: COLORS.BLACK}]}>
            ₹ {predata?.OrderAmount}
          </Text>
        </View>
        <View style={[Styles.newbox]}>
          <Text style={Styles.textone}>Paid By</Text>
          <Text style={[Styles.textone, {color: COLORS.BLACK}]}>
            {predata?.PaymentMethod}
          </Text>
        </View>
        <View style={[Styles.newbox, {borderBottomWidth: 0}]}>
          <Text style={Styles.textone}>Transaction Date</Text>
          <Text style={[Styles.textone, {color: COLORS.BLACK}]}>
            {predata?.PaymentDateTime}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(Routes.ORDER_HISTORY)}
          style={Styles.btnbox}>
          <Text style={{color: COLORS.WHITE, fontSize: 17, fontWeight: '500'}}>
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  head: {
    backgroundColor: COLORS.GREEN,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38,
  },
  headtext: {
    color: COLORS.WHITE,
    fontSize: fontPixel(17),
    fontWeight: '500',
  },
  susstext: {
    color: COLORS.GREEN,
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 25,
  },
  subbox: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderColor: COLORS.GRAY,
    paddingVertical: 30,
  },
  subtext2: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    color: COLORS.GRAY,
  },
  subtextnumber: {
    color: COLORS.BLUE,
    marginTop: 10,
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 25,
  },
  newbox: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY,
    marginHorizontal: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: 'red',
    top: heightPixel(40),
    alignItems: 'center',
  },
  textone: {color: COLORS.GRAY, fontSize: 17, fontWeight: '500'},
  btnbox: {
    paddingVertical: 15,
    backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: heightPixel(80),
    borderRadius: 5,
  },
});
