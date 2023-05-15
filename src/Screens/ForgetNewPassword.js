import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';
import {IonIcon} from '../utils/Const';
import MyModalinfo from '../Components/MyModalinfo';
import {useIsFocused} from '@react-navigation/native';

export default function ForgetNewPassword({navigation}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const IsFocused = useIsFocused();

  const handleSubmit = () => {
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
    } else if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
    } else if (!/\d/.test(newPassword)) {
      Alert.alert('Error', 'Password must contain at least one digit');
    } else if (!/[a-z]/.test(newPassword)) {
      Alert.alert(
        'Error',
        'Password must contain at least one lowercase letter',
      );
    } else if (!/[A-Z]/.test(newPassword)) {
      Alert.alert(
        'Error',
        'Password must contain at least one uppercase letter',
      );
    } else if (!/[^a-zA-Z0-9]/.test(newPassword)) {
      Alert.alert(
        'Error',
        'Password must contain at least one special character',
      );
    } else {
      // Alert.alert('Success', 'Password changed successfully');
      setModalVisible(!modalVisible);
      // setTimeout(() => {
      //   setModalVisible(true);
      // }, 5000);
    }
  };

  // useEffect(() => {
  //   if (IsFocused) {
  //     setTimeout(() => {
  //       setModalVisible(false);
  // navigation.navigate('Login');

  //     }, 5000);
  //   }
  // }, [IsFocused]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        {/* <Toast /> */}
        <View style={{alignItems: 'center'}}>
          <Text style={Styles.TITLESTYL}>New Password</Text>
          <Text style={Styles.SUBTITLE}>
            Please enter your email to receive a link to create a new password
            via email
          </Text>
        </View>
        <View style={Styles.sectionStyle}>
          <TextInput
            style={Styles.TEXTINPUT}
            placeholder="New Password"
            secureTextEntry={hidePassword}
            placeholderTextColor={COLORS.GRAYDARK}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHidePassword(!hidePassword)}
            style={Styles.toggle}>
            <IonIcon
              title={hidePassword ? 'eye-off' : 'eye'}
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>

        <View style={Styles.sectionStyle}>
          <TextInput
            style={Styles.TEXTINPUT}
            placeholder="Confirm Password"
            secureTextEntry={hidePasswordConfirm}
            placeholderTextColor={COLORS.GRAYDARK}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHidePasswordConfirm(!hidePasswordConfirm)}
            style={Styles.toggle}>
            <IonIcon
              title={hidePasswordConfirm ? 'eye-off' : 'eye'}
              size={22}
              IconColor={COLORS.GRAYDARK}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: '20%'}}>
          <Button title={'Submit'} onPress={handleSubmit} />
        </View>
        <MyModalinfo
          type={'password-reset'}
          _GoBack={() => navigation.navigate('Login')}
          isModal={modalVisible}
          _Visible={() => setModalVisible(!modalVisible)}
          // backPress={() => toggleModal('imagePicker')}
          // camera={() => setModalVisible(!modalVisible)}
          // gallery={() => _pickImage('gallery')}
        />
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
    marginHorizontal: 30,
  },
  TEXTINPUT: {
    backgroundColor: COLORS.GRAYLIGHT,
    marginHorizontal: 25,
    paddingHorizontal: 20,
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
    top: 20,
    borderRadius: 50,
  },

  ERRORTEXT: {color: 'red', paddingHorizontal: 40, marginTop: 5},
  FORGETTITLE: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(18),
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '500',
  },
  toggle: {
    right: 20,
  },
});
