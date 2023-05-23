import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {BottonBackGroundimage} from '../utils/Const';
import {heightPixel, widthPixel} from './Dimensions';

const Button = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{
        marginHorizontal: 20,
        borderRadius: 50,
        paddingVertical: 17,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={BottonBackGroundimage}
        style={{
          alignItems: 'center',
          height: heightPixel(60),
          width: widthPixel(365),
          borderRadius: 100,
          position: 'absolute',
          resizeMode: 'cover',
        }}
      />
      <Text
        style={{
          color: COLORS.WHITE,
          fontWeight: '500',
          letterSpacing: 0.5,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
