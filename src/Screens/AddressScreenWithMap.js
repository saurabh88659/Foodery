import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {useSelector} from 'react-redux';
import {fontPixel, heightPixel} from '../Components/Dimensions';

export default function AddressScreenWithMap() {
  const Locations = useSelector(state => state.locationReducer);
  console.log(Locations, 'Locations');

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      <View style={Styles.MAPBOX}></View>
      <View
        style={{
          marginHorizontal: 10,
          height: heightPixel(200),
          borderWidth: 1,
          // elevation: 10,
        }}>
        <Text
          style={{
            color: COLORS.BLACK,
            marginTop: 20,
            fontWeight: '500',
            fontSize: fontPixel(18),
          }}>
          Your Locations
        </Text>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  MAPBOX: {
    marginTop: 10,
    height: heightPixel(500),
    backgroundColor: COLORS.GREEN,
    elevation: 9,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
});
