import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {heightPixel, widthPixel} from '../Dimensions';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function OrderhistoryShimmerPlaceHolder() {
  return (
    <View>
      <ShimmerPlaceHolder
        shimmerColors={['#38EF7D', '#38EF7D', '#B6B7B7']}
        style={{height: 30, marginTop: 10, marginHorizontal: 15}}
      />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
        <View key={index} style={{marginVertical: 5}}>
          <ShimmerPlaceHolder
            shimmerColors={['#38EF7D', '#38EF7D', '#B6B7B7']}
            style={Styles.box}
          />
        </View>
      ))}
    </View>
  );
}

const Styles = StyleSheet.create({
  CONTAINERBOXMAIN: {
    flex: 1,
  },
  box: {
    height: heightPixel(150),
    width: widthPixel(380),
    alignSelf: 'center',
  },
});
