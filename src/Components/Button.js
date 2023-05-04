import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';

const Button = props => {
  return (
    <View>
      <View style={{marginVertical: 20}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={props.onPress}
          style={{
            paddingVertical: 13,
            backgroundColor: COLORS.ORANGE,
            alignItems: 'center',
            marginHorizontal: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: COLORS.WHITE,
              fontWeight: '500',
              letterSpacing: 0.5,
            }}>
            {props.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Button;
