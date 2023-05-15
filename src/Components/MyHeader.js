import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel} from './Dimensions';
import {IonIcon} from '../utils/Const';

const MyHeader = props => {
  return (
    <View
      style={{
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: heightPixel(105),
        paddingTop: heightPixel(35),
        flexDirection: 'row',
        elevation: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.BLACK}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.BLACK,
            textAlign: 'center',
            fontWeight: '500',
            paddingLeft: 5,
            fontSize: fontPixel(18),
          }}>
          {props.title}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.6}>
        <IonIcon
          title="ios-search-sharp"
          size={28}
          IconColor={COLORS.GRAYDARK}
        />
      </TouchableOpacity>
    </View>
  );
};
export default MyHeader;
