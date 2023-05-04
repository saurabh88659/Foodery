import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
// import MyHeader from '../Components/MyHeader';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from '../Components/Button';

export default function OtpScreen({props, navigation}) {
  const [pin, setPin] = useState('');
  const [timer, setTimer] = useState(60); // set initial timer to 60 seconds
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(previousTime => previousTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setDisabled(false);
    }
  }, [timer]);

  const _resendOTP = () => {
    setTimer(60); // reset timer
    setDisabled(true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <MyHeader
        title={'OTP verification'}
        onPress={() => navigation.goBack()}
      /> */}
      <View
        style={{
          backgroundColor: COLORS.WHITE,
          // paddingVertical: '10%',
          height: heightPixel(100),
          alignItems: 'flex-start',
          justifyContent: 'center',
          top: 15,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: COLORS.BLACK,
            fontWeight: '500',
            fontSize: fontPixel(18),
          }}>
          OTP verification
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Image
          source={require('../Assets/Logo/Otplogo.png')}
          style={Styles.imageStyleTop}
        />
        <KeyboardAvoidingView style={Styles.Container}>
          <Text
            style={{
              color: COLORS.BLACK,
              textAlign: 'center',
              fontSize: fontPixel(19),
              fontWeight: '400',
              // top: -10,
            }}>
            We've sent a verification code to {`\n`} +91***********
          </Text>
          <View style={{marginHorizontal: 25}}>
            <OTPInputView
              style={{height: heightPixel(100)}}
              pinCount={6}
              autoFocusOnLoad={false}
              codeInputFieldStyle={Styles.underlineStyleBase}
              codeInputHighlightStyle={Styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                setPin(code);
              }}
            />
          </View>
          <TouchableOpacity onPress={_resendOTP} disabled={disabled}>
            <Text
              style={{
                color: disabled ? COLORS.GRAY : COLORS.BLACK,
                alignSelf: 'center',
                top: 10,
              }}>
              Resend OTP{timer > 0 ? ` in ${timer} seconds` : ''}
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: 20}}>
            <Button
              title={'verify OTP'}
              onPress={() => navigation.navigate('HomeScreenTwo')}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    color: COLORS.WHITE,
  },
  imageStyleTop: {
    height: heightPixel(450),
    width: widthPixel(450),
    alignSelf: 'center',
    flex: 1,
  },
  titlestyle: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: fontPixel(22),
    fontWeight: '400',
    marginTop: 20,
  },
  borderStyleHighLighted: {
    borderColor: COLORS.ORANGE,
  },

  underlineStyleBase: {
    height: 45,
    width: 45,
    borderRadius: 4,
    color: COLORS.BLACK,
    fontSize: 17,
    backgroundColor: '#F7F6F4',
    borderColor: COLORS.GRAY,
    elevation: 5,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.ORANGE,
  },
});
