import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from './Dimensions';
import {MaterialIconsIcon, bannerIcon} from '../utils/Const';

export default function AddTocart(props) {
  const imagedata = props.data;
  // console.log('imagedata-----------', imagedata);

  return (
    <View
      style={{
        height: heightPixel(60),
        backgroundColor: COLORS.PURPLE,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: '1%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={props.Image}
          style={{
            height: heightPixel(50),
            width: widthPixel(50),
            borderRadius: 10,
          }}
        />
        <View style={{paddingLeft: 10}}>
          <Text
            style={{
              color: COLORS.WHITE,
              fontSize: fontPixel(15),
              fontWeight: '500',
            }}>
            {props.ItemTotalofnum}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.WHITE,
                fontSize: fontPixel(17),
                fontWeight: '500',
              }}>
              {props.PriceTotalofnum}
            </Text>
            <Text
              style={{
                color: COLORS.GRAYDARK,
                fontSize: fontPixel(12),
                fontWeight: '500',
                paddingLeft: widthPixel(5),
                textDecorationLine: 'line-through',
              }}>
              {props.PriceTotalDis}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={props.onPress}
        style={{
          flexDirection: 'row',
          marginLeft: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: COLORS.WHITE,
            fontSize: fontPixel(15),
            fontWeight: '500',
          }}>
          View Cart
        </Text>
        <MaterialIconsIcon
          title={'arrow-right'}
          size={25}
          IconColor={COLORS.WHITE}
        />
      </TouchableOpacity>
    </View>
  );
}
