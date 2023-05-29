import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {COLORS} from '../../utils/Colors';
import {
  heightPixel,
  screenHeight,
  screenWidth,
  widthPixel,
} from '../Dimensions';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function ProfileshimmerPlaceHolder() {
  return (
    <View>
      <ShimmerPlaceHolder
        shimmerColors={[COLORS.LightGreen2, COLORS.LightGreen2, COLORS.GREEN]}
        style={Styles.CONTAINERProfile}
      />

      <ShimmerPlaceHolder
        shimmerColors={[COLORS.LightGreen2, COLORS.LightGreen2, COLORS.GREEN]}
        style={Styles.EDITTITLE}
      />
      <ShimmerPlaceHolder
        shimmerColors={[COLORS.LightGreen2, COLORS.LightGreen2, COLORS.GREEN]}
        style={[Styles.EDITTITLE, {marginVertical: 15}]}
      />
      <ShimmerPlaceHolder
        shimmerColors={[COLORS.LightGreen2, COLORS.LightGreen2, COLORS.GREEN]}
        style={[Styles.EDITTITLE, {}]}
      />

      {[1, 2, 3, 4, 5].map((item, index) => (
        <ShimmerPlaceHolder
          key={index}
          shimmerColors={[COLORS.LightGreen2, COLORS.LightGreen2, COLORS.GREEN]}
          style={[Styles.MAINBOX, {marginVertical: 10}]}
        />
      ))}
    </View>
  );
}

const Styles = StyleSheet.create({
  CONTAINERProfile: {
    height: 115,
    width: 115,
    borderRadius: heightPixel(screenHeight),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DarkGreen2,
    alignSelf: 'center',
    // marginTop: heightPixel(40),
    marginVertical: 20,
  },
  EDITTITLE: {
    alignItems: 'center',
    color: COLORS.GREEN,
    fontWeight: '500',
    alignSelf: 'center',
    height: 20,
    width: '30%',
  },
  MAINBOX: {
    height: heightPixel(65),
    borderRadius: 30,
    marginHorizontal: 15,
    elevation: 10,
    width: widthPixel(screenWidth),
    alignSelf: 'center',
    top: '5%',
  },
});
