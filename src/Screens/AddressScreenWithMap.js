import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';

export default function AddressScreenWithMap() {
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      <Text>AddressScreenWithMap</Text>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
