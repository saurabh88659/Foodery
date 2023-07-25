import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL, SimpleToast, createaccountTOPImage} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
import {_setStorage} from '../utils/Storage';
import Routes from '../Navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestUserPermission} from '../utils/Handler/FirebaseMessagingNoti';

export default function Otp({navigation, route}) {
  const [isOTP, setIsOTP] = useState('');
  const phoneNumber = route.params;
  const fNumber = phoneNumber.split('', 6);
  const [counter, setCounter] = React.useState(60);
  const [state, setState] = useState({
    isLoading: false,
  });

  useEffect(() => {
    requestUserPermission();
  }, []);

  const _HandleOTP = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCM TOKEN--------->>>>>', fcmToken);
    setState({
      ...state,
      isLoading: true,
    });
    let otpdata = {
      phone: phoneNumber,
      otp: isOTP,
      deviceToken: fcmToken,
    };

    axios
      .post(BASE_URL + `/User/userPhoneVerifyOTP`, otpdata, {})
      .then(async response => {
        await AsyncStorage.setItem('token', response?.data?.token);

        await AsyncStorage.setItem(
          'refreshToken',
          response?.data?.refreshToken,
        );
        await AsyncStorage.setItem('user_id', response?.data?.user_id);

        // console.log('refresh token ----------->>>', response.data.refreshToken);
        // console.log('user id  ----------->>>', response.data.user_id);

        SimpleToast({title: response?.data?.message, isLong: true});
        setState({
          ...state,
          isLoading: false,
        });
        axios
          .get(BASE_URL + `/User/getProfile`, {
            headers: {
              Authorization: `Bearer ${response?.data?.token}`,
            },
          })
          .then(resp => {
            if (resp?.data?.result?.name && resp?.data?.result?.address) {
              navigation.navigate(Routes.BOTTOM_TAB_BAR);
            } else {
              navigation.navigate(Routes.SIGN_UP_SCREEN, phoneNumber);
            }
          })
          .catch(err => {
            if (err?.response?.data?.message == 'You are not  user.!') {
              navigation.navigate(Routes.LOG_IN_SCREEN);
            }
          });
      })
      .catch(e => {
        if (e.response?.data?.message) {
          SimpleToast({title: e?.response?.data?.message, isLong: true});
        }
        setState({
          ...state,
          isLoading: false,
        });
      });
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const resendsend = () => {
    const dataPhone = {
      phone: phoneNumber,
    };
    axios
      .post(BASE_URL + `/User/userLoginPhone`, dataPhone)
      .then(response => {
        if (response?.data?.message == 'OTP sent successfully') {
          SimpleToast({title: ' resend OTP sent successfully', isLong: true});
          setCounter(60);
        } else {
          console.log('else condtion');
        }
        console.log('Login response', response?.data);
      })
      .catch(error => {
        console.log('Login Catch error', error?.response?.data);
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
            marginTop: heightPixel(150),
          }}>
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={Styles.headerTitle}>Enter OTP</Text>
              <Text style={Styles.subTitle}>
                We have sent you a 6-digit verifications code on +91 {fNumber}
                ****
              </Text>
            </View>

            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <OTPInputView
                style={{height: heightPixel(80)}}
                pinCount={6}
                autoFocusOnLoad={false}
                codeInputFieldStyle={Styles.underlineStyleBase}
                codeInputHighlightStyle={Styles.underlineStyleHighLighted}
                onCodeFilled={tex => {
                  setIsOTP(tex);
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Text style={{color: 'grey'}}>Time remaining</Text>
              <View>
                {counter !== 0 ? (
                  <Text style={{color: 'black'}}>{counter}s</Text>
                ) : (
                  <TouchableOpacity onPress={resendsend} style={{}}>
                    <Text style={{color: 'grey'}}>Resend code</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={{top: 20}}>
              <Button
                title={
                  state.isLoading ? (
                    <View style={Styles.activStylesIndicator}>
                      <ActivityIndicator color={COLORS.LIGHTGREEN} />
                      <Text style={Styles.activeStylesTitleIndicator}>
                        Please wait....
                      </Text>
                    </View>
                  ) : (
                    'Verify & Proceed'
                  )
                }
                onPress={_HandleOTP}
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
    justifyContent: 'center',
    flex: 1,
  },
  IMAGESTYL: {
    width: widthPixel(420),
    height: heightPixel(450),
    alignSelf: 'flex-end',
    resizeMode: 'cover',
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPixel(65),
    marginHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: COLORS.GRAYLIGHT,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1,
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
    fontSize: fontPixel(18),
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.2,
    top: 2,
    textAlign: 'center',
    paddingHorizontal: '7%',
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
  borderStyleHighLighted: {
    borderColor: COLORS.ORANGE,
  },

  underlineStyleBase: {
    height: 48,
    width: 50,
    borderRadius: 4,
    color: COLORS.BLACK,
    fontSize: 17,
    backgroundColor: '#F7F6F4',
    borderColor: COLORS.GRAY,
    elevation: 2,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.ORANGE,
  },
  activStylesIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStylesTitleIndicator: {
    color: COLORS.WHITE,
    fontSize: fontPixel(15),
    paddingLeft: 5,
  },
});
