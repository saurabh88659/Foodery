import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, screenHeight} from './Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const MyHeader = props => {
  return (
    <View
      style={{
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: '4%',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        height: heightPixel(105),
        paddingTop: heightPixel(35),
        flexDirection: 'row',
        elevation: 10,
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <Icon name="arrow-back-outline" color={COLORS.BLACK} size={30} />
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
  );
};
export default MyHeader;
