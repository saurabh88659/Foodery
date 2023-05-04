import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {COLORS} from '../utils/Colors';
import Button from '../Components/Button';

export default function Login({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [phoneNumberBorderColor, setPhoneNumberBorderColor] = useState('#fff');

  const validatePhoneNumber = () => {
    const phoneRegex = /^[0-9]{10}$/; // regex to match 10 digit phone number
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid 10 digit phone number.');
      setPhoneNumberBorderColor('red');
    } else {
      setPhoneNumberError('');
      setPhoneNumberBorderColor('#FFF');
    }
  };

  const onSubmit = () => {
    validatePhoneNumber();
    navigation.navigate('OtpScreen');
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.Container}>
        <View style={{flex: 1}}>
          <Image
            source={require('../Assets/Logo/illustrationlogin.png')}
            style={Styles.logoStyles}
          />
        </View>
        <View style={Styles.titlecon}>
          <Text style={Styles.titleStyle}>India's last minute app</Text>
          <Text style={Styles.titleStyle2}>Log in or sign up</Text>
        </View>
        <View
          style={[Styles.sectionStyle, {borderColor: phoneNumberBorderColor}]}>
          <Text
            style={{
              color: COLORS.BLACK,
              fontWeight: '700',
              fontSize: fontPixel(18),
            }}>
            +91
          </Text>
          <TextInput
            placeholderTextColor={COLORS.GRAY}
            placeholder="Enter mobile number"
            style={Styles.inputStyles}
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text), validatePhoneNumber;
            }}
            // onBlur={validatePhoneNumber}
          />
        </View>
        {phoneNumberError ? (
          <Text style={Styles.error}>{phoneNumberError}</Text>
        ) : null}
        <View>
          <View style={{top: -50}}>
            <Button title={'Continue'} onPress={onSubmit} />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              color: COLORS.BLACK,
              top: -60,
              fontWeight: '500',
              fontSize: 13,
            }}>
            OR
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              top: -55,
            }}>
            <TouchableOpacity activeOpacity={0.6} style={Styles.footerStyles}>
              <Image
                source={require('../Assets/Logo/google.png')}
                style={Styles.footerlogosty}
              />
              <Text
                style={{color: COLORS.BLACK, fontWeight: '500', fontSize: 13}}>
                Log in with
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={Styles.footerStyles}>
              <Image
                source={require('../Assets/Logo/facebook.png')}
                style={Styles.footerlogosty}
              />
              <Text
                style={{color: COLORS.BLACK, fontWeight: '500', fontSize: 13}}>
                Log in with
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.GRAY,
            // paddingVertical: 2,
            opacity: 0.4,
          }}>
          <Text style={{color: COLORS.BLACK, fontSize: fontPixel(12)}}>
            By continue you agree to our{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
                fontWeight: '900',
                color: COLORS.BLACK,
              }}>
              Term of service & {''}
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontWeight: '900',
                  color: COLORS.BLACK,
                }}>
                Privacy policy
              </Text>
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  logoStyles: {
    height: heightPixel(600),
    width: widthPixel(500),
    // resizeMode: 'center',
    alignSelf: 'center',
    marginTop: -120,
    // top: -10,
    paddingVertical: -30,
    flex: 1,
  },
  titlecon: {
    alignItems: 'center',
    top: -55,
  },
  titleStyle: {
    color: COLORS.BLACK,
    fontSize: fontPixel(22),
    letterSpacing: 0.5,
    fontWeight: '900',
    marginTop: 55,
  },
  titleStyle2: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(20),
    marginTop: 7,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GRAY,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 5,
    // marginVertical: 5,
    top: -45,
    elevation: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
  },
  inputStyles: {
    flex: 1,
    height: 50,
    color: COLORS.BLACK,
    fontSize: 15,
    paddingHorizontal: 15,
    letterSpacing: 0.3,
  },
  error: {
    color: 'red',
    top: -40,
    marginHorizontal: 20,
  },

  footerStyles: {
    paddingVertical: 5,
    width: widthPixel(150),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerlogosty: {
    height: 30,
    width: 30,
  },
});
