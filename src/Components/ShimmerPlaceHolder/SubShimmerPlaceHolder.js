import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {heightPixel, widthPixel} from '../Dimensions';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function SubShimmerPlaceHolder() {
  return (
    <View>
      <View>
        <ShimmerPlaceHolder
          shimmerColors={['#38EF7D', '#38EF7D', '#B6B7B7']}
          style={Styles.bannerImage}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {[1, 2, 3, 4].map((item, index) => (
            <View key={index} style={{alignItems: 'center'}}>
              <ShimmerPlaceHolder
                style={{
                  height: 100,
                  width: 100,
                  marginTop: 10,
                  marginHorizontal: 7,
                  borderRadius: 10,
                }}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 20,
                  width: 100,
                  marginTop: 8,
                  borderRadius: 4,
                }}
              />
            </View>
          ))}
        </View>

        <View style={Styles.CONTAINERBOXMAIN}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <ShimmerPlaceHolder
              key={index}
              style={{
                height: heightPixel(195),
                width: widthPixel(130),
                marginHorizontal: 3,
                marginTop: 10,
                borderRadius: 4,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  CONTAINERBOXMAIN: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 5,
    alignItems: 'center',
  },
  bannerImage: {
    height: heightPixel(180),
    alignSelf: 'center',
    width: widthPixel(410),
  },
});
