import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';

function ForgotEmailOtp({navigation}) {
  const [forget_Otp, setForget_Otp] = useState();

  const [timer, setTimer] = useState(60); // set initial timer to 60 seconds
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = () => {
    console.log('Hey');
    navigation.navigate('ForgetNewPassword');
  };

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <View style={{alignItems: 'center'}}>
          <Text style={Styles.TITLESTYL}>
            We have sent an OTP to {`\n`} your Email
          </Text>
          <Text style={Styles.SUBTITLE}>
            Please check your email Suo*****@gmail.com continue to reset your
            password
          </Text>
        </View>
        <View style={Styles.CONTAINERMAINTEXTINPU}>
          <OTPInputView
            style={{
              height: heightPixel(100),
              marginHorizontal: widthPixel(45),
            }}
            pinCount={4}
            autoFocusOnLoad={false}
            codeInputFieldStyle={Styles.underlineStyleBase}
            codeInputHighlightStyle={Styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              setForget_Otp(code);
            }}
          />
        </View>
        <View style={{marginTop: 30}}>
          <Button title={'Next'} onPress={handleSubmit} />
        </View>
        {/* <TouchableOpacity onPress={_resendOTP} disabled={disabled}>
        <Text
          style={{
            color: disabled ? COLORS.GRAY : COLORS.BLACK,
            alignSelf: 'center',
            top: 10,
          }}>
          Didn't Receive?{timer > 0 ? ` in ${timer} seconds` : ''}
        </Text>
      </TouchableOpacity> */}

        <View style={Styles.RESENDOTPSTYL}>
          <Text
            style={{
              color: COLORS.GRAYDARK,
              fontSize: fontPixel(18),
              fontWeight: '500',
            }}>
            Didn't Receive?{' '}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.GREEN,
                fontSize: fontPixel(17),
                fontWeight: '500',
              }}>
              Click Here
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default ForgotEmailOtp;

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  TITLESTYL: {
    color: COLORS.BLACK,
    fontSize: fontPixel(25),
    marginTop: heightPixel(90),
    fontWeight: '900',
    textAlign: 'center',
  },
  SUBTITLE: {
    color: COLORS.GRAY,
    marginTop: 10,
    fontSize: fontPixel(17),
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  CONTAINERMAINTEXTINPU: {marginTop: 30},
  TEXTINPUT: {
    backgroundColor: COLORS.GRAYLIGHT,
    marginHorizontal: 25,
    borderRadius: 50,
    paddingHorizontal: 20,
    marginTop: 30,
    color: COLORS.BLACK,
    paddingVertical: 13,
  },
  ERRORTEXT: {color: 'red', paddingHorizontal: 40, marginTop: 5},
  FORGETTITLE: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(18),
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
  underlineStyleBase: {
    height: 54,
    width: 60,
    borderRadius: 4,
    color: COLORS.BLACK,
    fontSize: 17,
    backgroundColor: COLORS.GRAYLIGHT,
    borderColor: COLORS.GRAY,
    borderWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.ORANGE,
  },
  RESENDOTPSTYL: {
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
