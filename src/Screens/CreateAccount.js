import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {createaccountTOPImage} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';

export default function CreateAccount({navigation}) {
  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <View style={Styles.CONTAINERIMAGEMAIN}>
        <Image source={createaccountTOPImage} style={Styles.IMAGESTYL} />
      </View>
      <View style={{marginVertical: '35%'}}>
        <View style={{marginVertical: '5%'}}>
          <Button
            title={'Login'}
            onPress={() => navigation.navigate('Login')}
          />
          <View style={{marginVertical: '5%'}}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('SignUpscreen');
                navigation.navigate('BottomTabBar');
              }}
              activeOpacity={0.6}
              style={Styles.CONTAINERBUTTON}>
              <Text style={Styles.BUTTONTEXT}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  CONTAINERIMAGEMAIN: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  IMAGESTYL: {height: heightPixel(500), width: widthPixel(500)},
  CONTAINERBUTTON: {
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
  },
  BUTTONTEXT: {
    color: COLORS.GREEN,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
