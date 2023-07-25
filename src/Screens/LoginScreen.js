import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL, SimpleToast, createaccountTOPImage} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {
  fontPixel,
  heightPixel,
  screenHeight,
  widthPixel,
} from '../Components/Dimensions';
import Button from '../Components/Button';
import axios from 'axios';
import Routes from '../Navigation/Routes';

export default function LoginScreen({navigation}) {
  const [phoneNo, setPhoneNo] = useState('');
  const [errorMobileNumber, setErrorMobileNumber] = useState(null);
  const [state, setState] = useState({
    isLoading: false,
  });

  const _validateMobileNumber = mobileNo => {
    var mobileNoRegex = /^[6-9]{1}[0-9]{9}$/;
    if (mobileNo == '' || mobileNo == undefined || mobileNo == null) {
      setErrorMobileNumber('Please enter mobile number.');
    } else if (!mobileNoRegex.test(mobileNo)) {
      setErrorMobileNumber('Please Enter valid mobile number..');
    } else {
      setErrorMobileNumber(null);
    }
  };

  const _HandleSend = () => {
    setState({
      ...state,
      isLoading: true,
    });
    const dataPhone = {
      phone: phoneNo,
    };

    axios
      .post(BASE_URL + `/User/userLoginPhone`, dataPhone, {})
      .then(response => {
        if (response?.data?.message == 'OTP sent successfully') {
          SimpleToast({title: response?.data?.message, isLong: true});
          navigation.navigate(Routes.OTP_SCREEN, phoneNo);
          setState({
            ...state,
            isLoading: false,
          });
        } else {
          console.log('else condtion');
        }
        console.log('Login response', response?.data);
      })
      .catch(error => {
        console.log('Login Catch error', error);
        SimpleToast({title: error?.response?.data?.message, isLong: true});
        setState({
          ...state,
          isLoading: false,
        });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <View style={Styles.CONTAINERIMAGEMAIN}>
          <Image source={createaccountTOPImage} style={Styles.IMAGESTYL} />
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            // alignItems: 'center',
            alignSelf: 'center',
            // top: heightPixel(-50),
            marginTop: heightPixel(300),
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={Styles.headerTitle}>Login</Text>
            <Text style={Styles.subTitle}>with Mobile Number</Text>
          </View>
          <View style={[Styles.sectionStyle]}>
            <Text style={Styles.noTitle}>+91</Text>
            <TextInput
              placeholder="Enter Mobile Number"
              placeholderTextColor={COLORS.GRAYDARK}
              value={phoneNo}
              maxLength={10}
              onChangeText={text => {
                setPhoneNo(text);
                _validateMobileNumber(text);
              }}
              keyboardType="number-pad"
              style={Styles.INPUT}
            />
          </View>

          {errorMobileNumber != null ? (
            <Text style={Styles.Errortext}>{errorMobileNumber}</Text>
          ) : null}
          <View style={{marginTop: 20}}>
            <View
              style={{
                marginTop: 10,
              }}>
              <Button
                title={
                  state.isLoading ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <ActivityIndicator color={COLORS.LIGHTGREEN} />
                      <Text
                        style={{
                          color: COLORS.WHITE,
                          fontSize: fontPixel(15),
                          paddingLeft: 5,
                        }}>
                        Please wait....
                      </Text>
                    </View>
                  ) : (
                    'Login'
                  )
                }
                onPress={_HandleSend}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
          <Text style={Styles.footerTitle}>
            By continuing, you agree to our Terms of service & Privacy policy
          </Text>
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
  CONTAINERIMAGEMAIN: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flex: 1,
  },

  IMAGESTYL: {
    width: widthPixel(420),
    height: heightPixel(450),
    alignSelf: 'flex-end',
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPixel(65),
    marginHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: COLORS.GRAYLIGHT,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  INPUT: {
    paddingHorizontal: 15,
    color: COLORS.BLACK,
    width: '90%',
  },

  headerTitle: {
    fontSize: fontPixel(30),
    fontWeight: '900',
    color: COLORS.BLACK,
    letterSpacing: 0.4,
  },
  subTitle: {
    fontSize: fontPixel(20),
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.2,
    top: 2,
  },
  noTitle: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    fontWeight: '500',
  },
  Errortext: {
    color: 'red',
    fontSize: 13,
    paddingHorizontal: 40,
  },
  footerTitle: {
    fontSize: fontPixel(12),
    fontWeight: '500',
    color: COLORS.GRAYDARK,
  },
});
