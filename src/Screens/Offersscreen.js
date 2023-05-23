import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import Lottie from 'lottie-react-native';
import {heightPixel} from '../Components/Dimensions';

export default function Offersscreen({navigation}) {
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader title={'Offers'} onPress={() => navigation.goBack()} />
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Lottie
          source={require('../Assets/Lottiejson/113096-coming-soon.json')}
          autoPlay
          loop={true}
          style={{height: heightPixel(200)}}
        />
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_WHITE,
  },
});
