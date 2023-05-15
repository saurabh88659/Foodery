import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../utils/Colors';
import {
  fontPixel,
  heightPixel,
  screenHeight,
  widthPixel,
} from '../Components/Dimensions';
import Button from '../Components/Button';
import {facebooklogo, googlelog} from '../utils/Const';
import {IonIcon} from '../utils/Const';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

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

  const validatePassword = password => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = () => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    if (isValidEmail && isValidPassword) {
      // Submit login credentials
      navigation.navigate('BottomTabBar');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <View style={{alignItems: 'center'}}>
          <Text style={Styles.TITLESTYL}>Login</Text>
          <Text style={Styles.SUBTITLE}>Add your details to login</Text>
        </View>
        <View style={Styles.CONTAINERMAINTEXTINPU}>
          <View style={Styles.sectionStyle}>
            <TextInput
              style={[Styles.TEXTINPUT]}
              placeholder="Your Email"
              placeholderTextColor={COLORS.GRAYDARK}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          {emailError ? (
            <Text style={Styles.ERRORTEXT}>{emailError}</Text>
          ) : null}
          <View style={Styles.sectionStyle}>
            <TextInput
              style={Styles.TEXTINPUT}
              placeholder="Confirm Password"
              secureTextEntry={hidePassword}
              placeholderTextColor={COLORS.GRAYDARK}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidePassword(!hidePassword)}
              style={{right: 20}}>
              <IonIcon
                title={hidePassword ? 'eye-off' : 'eye'}
                size={22}
                IconColor={COLORS.GRAYDARK}
              />
            </TouchableOpacity>
          </View>

          {passwordError ? (
            <Text style={Styles.ERRORTEXT}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={{marginTop: 30}}>
          <Button title={'Login'} onPress={handleSubmit} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Resetpassword')}>
          <Text style={Styles.FORGETTITLE}>Forgot your password?</Text>
        </TouchableOpacity>
        <Text style={[Styles.FORGETTITLE, {top: 40}]}>or Login with</Text>
        <View style={{marginTop: '20%'}}>
          <TouchableOpacity style={Styles.CONTAINERFBGOOGle}>
            <Image
              source={facebooklogo}
              style={{height: heightPixel(20), width: widthPixel(8)}}
            />
            <Text style={Styles.TEXTFBGOOGLE}>Login with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Styles.CONTAINERFBGOOGle,
              {marginTop: 30, backgroundColor: COLORS.BROWN},
            ]}>
            <Image
              source={googlelog}
              style={{height: heightPixel(20), width: widthPixel(30)}}
            />
            <Text style={Styles.TEXTFBGOOGLE}>Login with Google</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: heightPixel(60),
          }}>
          <Text
            style={{
              color: COLORS.GRAYDARK,
              fontWeight: '500',
              fontSize: fontPixel(18),
            }}>
            Don't have Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpscreen')}>
            <Text
              style={{
                color: COLORS.GREEN,
                fontWeight: '500',
                paddingLeft: 3,
                letterSpacing: 0.5,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
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
    fontSize: fontPixel(20),
    fontWeight: '500',
  },
  TEXTINPUT: {
    backgroundColor: COLORS.GRAYLIGHT,
    marginHorizontal: 25,
    // paddingHorizontal: 10,
    color: COLORS.BLACK,
    paddingVertical: 8,
    width: widthPixel(300),
  },

  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPixel(60),
    marginHorizontal: 20,
    backgroundColor: COLORS.GRAYLIGHT,
    marginTop: 25,
    borderRadius: 50,
  },

  ERRORTEXT: {color: 'red', paddingHorizontal: 40, marginTop: 5},
  FORGETTITLE: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(18),
    textAlign: 'center',
    // marginTop: 20,
    marginVertical: 10,
    fontWeight: '500',
    top: heightPixel(10),
  },
  CONTAINERFBGOOGle: {
    paddingVertical: 15,
    backgroundColor: COLORS.BLUE,
    flexDirection: 'row',
    alignItemsL: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    borderRadius: 25,
  },
  TEXTFBGOOGLE: {
    color: COLORS.WHITE,
    marginLeft: 10,
    fontWeight: '500',
  },
});
