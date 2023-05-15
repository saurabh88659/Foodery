import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {heightPixel, widthPixel} from '../Dimensions';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function HomeShimmerPlaceHolder() {
  return (
    <View>
      <ShimmerPlaceHolder
        style={{height: heightPixel(150), width: widthPixel(450)}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 15,
          marginTop: 10,
        }}>
        <ShimmerPlaceHolder
          style={{height: heightPixel(20), width: widthPixel(120)}}
        />
        <ShimmerPlaceHolder
          style={{height: heightPixel(20), width: widthPixel(120)}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        {[1, 2, 3, 4].map((item, index) => (
          <ShimmerPlaceHolder
            key={index}
            style={{
              height: heightPixel(80),
              width: widthPixel(80),
              borderRadius: 50,
            }}
          />
        ))}
      </View>
      <ShimmerPlaceHolder
        style={{
          height: heightPixel(25),
          width: widthPixel(120),
          marginTop: 20,
          marginHorizontal: 20,
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {[1, 2, 3, 4].map((item, index) => (
          <ShimmerPlaceHolder
            style={{
              height: heightPixel(160),
              width: widthPixel(120),
              marginTop: 20,
              marginHorizontal: 8,
              borderRadius: 7,
            }}
          />
        ))}
      </View>
      <ShimmerPlaceHolder
        style={{
          height: heightPixel(130),
          width: widthPixel(400),
          marginTop: 20,
          marginHorizontal: 8,
          borderRadius: 7,
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {[1, 2, 3, 4].map((item, index) => (
          <ShimmerPlaceHolder
            style={{
              height: heightPixel(160),
              width: widthPixel(120),
              marginTop: 20,
              marginHorizontal: 8,
              borderRadius: 4,
            }}
          />
        ))}
      </View>
    </View>
  );
}
