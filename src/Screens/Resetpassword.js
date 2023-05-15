import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';

export default function Resetpassword({navigation}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleSubmit = () => {
    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
      navigation.navigate('ForgotEmailOtp');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <View style={{alignItems: 'center'}}>
          <Text style={Styles.TITLESTYL}>Reset Password</Text>
          <Text style={Styles.SUBTITLE}>
            Please enter your email a link to create a new passowrd email
          </Text>
        </View>
        <View style={Styles.CONTAINERMAINTEXTINPU}>
          <TextInput
            style={[Styles.TEXTINPUT]}
            placeholder="Your Email"
            placeholderTextColor={COLORS.GRAYDARK}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          {emailError ? (
            <Text style={Styles.ERRORTEXT}>{emailError}</Text>
          ) : null}
        </View>
        <View style={{marginTop: 30}}>
          <Button title={'Send'} onPress={handleSubmit} />
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
  TITLESTYL: {
    color: COLORS.BLACK,
    fontSize: fontPixel(25),
    marginTop: heightPixel(90),
    fontWeight: '900',
  },
  SUBTITLE: {
    color: COLORS.GRAY,
    marginTop: 10,
    fontSize: fontPixel(18),
    fontWeight: '500',
    textAlign: 'center',
    width: widthPixel(300),
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
});
