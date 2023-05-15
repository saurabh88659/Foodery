import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import {heightPixel, widthPixel} from '../Components/Dimensions';
import {FontAwesome5Icon} from '../utils/Const';
import {TextInput} from 'react-native-paper';

export default function ProfileScreen({navigation}) {
  // const [text, setText] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <MyHeader title={'Profile'} onPress={() => navigation.goBack()} />
        <View
          style={{
            height: heightPixel(130),
            width: widthPixel(130),
            backgroundColor: COLORS.DarkGreen2,
            marginVertical: 30,
            justifyContent: 'flex-end',
            alignSelf: 'center',
            borderRadius: 100,
          }}>
          <View
            style={{
              alignItems: 'center',
              top: -8,
            }}>
            <FontAwesome5Icon
              title={'camera'}
              size={18}
              IconColor={COLORS.GRAYDARK}
            />
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <TextInput
            label="Name"
            mode="outlined"
            outlineStyle={{
              borderRadius: 50,
              height: heightPixel(60),
              borderWidth: 0,
            }}
            style={{
              marginHorizontal: 20,
              backgroundColor: COLORS.GRAYLIGHT,
              marginVertical: 10,
              borderRadius: 50,
            }}
          />
          <TextInput
            label="Email"
            mode="outlined"
            outlineStyle={{
              borderRadius: 50,
              height: heightPixel(60),
              borderWidth: 0,
            }}
            style={{
              marginHorizontal: 20,
              backgroundColor: COLORS.GRAYLIGHT,
              marginVertical: 10,
            }}
          />

          <TextInput
            label="Mobile No."
            mode="outlined"
            outlineStyle={{
              borderRadius: 50,
              height: heightPixel(60),
              borderWidth: 0,
            }}
            style={{
              marginHorizontal: 20,
              backgroundColor: COLORS.GRAYLIGHT,
              marginVertical: 10,
            }}
          />

          <TextInput
            label="Address"
            mode="outlined"
            outlineStyle={{
              borderRadius: 50,
              height: heightPixel(60),
              borderWidth: 0,
            }}
            style={{
              marginHorizontal: 20,
              backgroundColor: COLORS.GRAYLIGHT,
              marginVertical: 10,
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
