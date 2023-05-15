import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel} from '../Components/Dimensions';
import Button from '../Components/Button';

function SignUpscreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const [fullNmaeError, setFullNmaeError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [addressError, setaddressError] = useState('');

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

  // const validatePassword = password => {
  //   if (password.length < 6) {
  //     setPasswordError('Password must be at least 6 characters long');
  //     return false;
  //   } else {
  //     setPasswordError('');
  //     return true;
  //   }
  // };

  const validateFullName = () => {
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(fullName)) {
      setFullNmaeError('Please enter a valid name');
      return false;
    } else {
      setFullNmaeError('');
      return true;
    }
  };

  const validatePhoneNumber = () => {
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid 10 digit phone number');
      return false;
    } else {
      setPhoneNumberError(null);
      return true;
    }
  };

  const validateAddress = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(address)) {
      setaddressError('Please enter a valid address');
      return false;
    } else {
      setaddressError('');
      return true;
    }
  };

  const passwordConfirmpassword = () => {
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else if (newPassword !== confirmPassword) {
      setPasswordConfirmError('Passwords do not match');
    } else if (!/\d/.test(newPassword)) {
      setPasswordError('Password must contain at least one digit');
    } else if (!/[a-z]/.test(newPassword)) {
      setaddressError('Password must contain at least one lowercase letter');
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError('Password must contain at least one uppercase letter');
    } else if (!/[^a-zA-Z0-9]/.test(newPassword)) {
      setPasswordError('Password must contain at least one special character');
    } else {
      // Alert.alert('Success', 'Password changed successfully');
      setPasswordError('');
      setPasswordConfirmError('');
      return true;
    }
  };

  const handleSubmit = () => {
    const isValidEmail = validateEmail(email);
    // const isValidPassword = validatePassword(password);
    const isValidFullNmae = validateFullName(fullName);
    const isValidPhone = validatePhoneNumber(phoneNumber);
    const isValidAddress = validateAddress(address);
    const ispasswordConfirmpassword = passwordConfirmpassword(
      newPassword && confirmPassword,
    );

    if (
      isValidEmail &&
      isValidFullNmae &&
      isValidPhone &&
      isValidAddress &&
      ispasswordConfirmpassword
    ) {
      // Submit login credentials
      Alert.alert('Success', 'Sign Up successfully');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <View style={{alignItems: 'center'}}>
            <Text style={Styles.TITLESTYL}>Sign Up</Text>
            <Text style={Styles.SUBTITLE}>Add your details to sign up</Text>
          </View>
          <View style={Styles.CONTAINERMAINTEXTINPU}>
            <View style={{paddingTop: 10}}>
              <TextInput
                style={[Styles.TEXTINPUT]}
                placeholder="Name"
                placeholderTextColor={COLORS.GRAYDARK}
                value={fullName}
                onChangeText={text => setFullName(text)}
              />
              {fullNmaeError ? (
                <Text style={Styles.ERRORTEXT}>{fullNmaeError}</Text>
              ) : null}
            </View>
            <View>
              <TextInput
                style={[Styles.TEXTINPUT]}
                placeholder="Email"
                placeholderTextColor={COLORS.GRAYDARK}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              {emailError ? (
                <Text style={Styles.ERRORTEXT}>{emailError}</Text>
              ) : null}
            </View>
            <View>
              <TextInput
                style={[Styles.TEXTINPUT]}
                placeholder="Mobile No"
                keyboardType="number-pad"
                placeholderTextColor={COLORS.GRAYDARK}
                value={phoneNumber}
                maxLength={10}
                onBlur={validatePhoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
              {phoneNumberError ? (
                <Text style={Styles.ERRORTEXT}>{phoneNumberError}</Text>
              ) : null}
            </View>
            <View>
              <TextInput
                style={[Styles.TEXTINPUT]}
                placeholder="Address"
                placeholderTextColor={COLORS.GRAYDARK}
                value={address}
                onChangeText={text => setAddress(text)}
              />
              {addressError ? (
                <Text style={Styles.ERRORTEXT}>{addressError}</Text>
              ) : null}
            </View>
            <View style={{}}>
              <TextInput
                style={[Styles.TEXTINPUT]}
                placeholder="Password"
                placeholderTextColor={COLORS.GRAYDARK}
                secureTextEntry={true}
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
              {passwordError ? (
                <Text style={Styles.ERRORTEXT}>{passwordError}</Text>
              ) : null}
            </View>
            <View style={{}}>
              <TextInput
                style={[Styles.TEXTINPUT]}
                placeholder="Confirm Password"
                secureTextEntry={true}
                placeholderTextColor={COLORS.GRAYDARK}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />
              {passwordConfirmError ? (
                <Text style={Styles.ERRORTEXT}>{passwordConfirmError}</Text>
              ) : null}
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 30}}>
            <Button title={'Sign Up'} onPress={handleSubmit} />
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 15,
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  color: COLORS.GRAYDARK,
                  fontWeight: '500',
                  fontSize: fontPixel(16),
                }}>
                Already have an Account?
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    color: COLORS.GREEN,
                    fontWeight: '500',
                    textAlign: 'center',
                    left: 3,
                    fontSize: fontPixel(16),
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SignUpscreen;

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  TITLESTYL: {
    color: COLORS.BLACK,
    fontSize: fontPixel(25),
    marginTop: heightPixel(100),
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
  CONTAINERMAINTEXTINPU: {},
  TEXTINPUT: {
    backgroundColor: COLORS.GRAYLIGHT,
    marginHorizontal: 25,
    borderRadius: 50,
    paddingHorizontal: 20,
    marginTop: 25,
    color: COLORS.BLACK,
    paddingVertical: 14,
  },
  ERRORTEXT: {color: 'red', paddingHorizontal: 40, marginTop: 5},
});
