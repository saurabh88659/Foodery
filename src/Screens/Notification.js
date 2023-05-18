import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {EntypoIcon} from '../utils/Const';

export default function Notification({navigation}) {
  const SRTNOW = [
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },

    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
  ];
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader title={'Notification'} onPress={() => navigation.goBack()} />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        data={SRTNOW}
        renderItem={({item, index}) => (
          <TouchableOpacity activeOpacity={0.7} style={Styles.MAINBOX}>
            <EntypoIcon
              title="dot-single"
              size={35}
              IconColor={COLORS.PURPLE}
            />
            <View>
              <Text numberOfLines={3} style={Styles.TITLE}>
                Your orders has been picked up Your orders has been picked up
                Your orders has been picked
              </Text>
              <Text style={Styles.SUBTITLE}>Now</Text>
            </View>
          </TouchableOpacity>
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
  MAINBOX: {
    height: heightPixel(100),
    backgroundColor: COLORS.LIGHT_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
    top: 10,
  },
  TITLE: {
    fontSize: fontPixel(16),
    fontWeight: '400',
    color: COLORS.BLACK,
    letterSpacing: 0.4,
    width: widthPixel(360),
  },
  SUBTITLE: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.5,
  },
});
