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
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, screenHeight} from '../Components/Dimensions';
import Button from '../Components/Button';
import axios from 'axios';
import {BASE_URL, FontAwesome5Icon, SimpleToast} from '../utils/Const';
import Routes from '../Navigation/Routes';
import {_getStorage} from '../utils/Storage';
import ImagePicker from 'react-native-image-crop-picker';

function SignUpscreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullNmaeError, setFullNmaeError] = useState('');
  const [addressError, setaddressError] = useState('');
  const [state, setState] = useState({
    isLoading: false,
    profileImg: null,
  });
  const PNumber = route.params;

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

  const handleSubmit = () => {
    const isValidEmail = validateEmail(email);
    const isValidFullNmae = validateFullName(fullName);
    const isValidAddress = validateAddress(address);
    if (isValidEmail && isValidFullNmae && isValidAddress) {
      _SignUp();
      _UP_LoadProfile_Img();
    }
  };

  const onGallary = () => {
    ImagePicker.openPicker({
      cropping: true,
      quality: 1,
      mediaType: 'any',
    })
      .then(image => {
        if (image) {
          setState({...state, profileImg: image});
        } else {
          console.log('Please selected Image');
        }
      })
      .catch(err => {
        console.log('Img picker Error--->>>', err);
        SimpleToast({title: 'User cancelled image selection', isLong: true});
      });
  };

  const _SignUp = async () => {
    const token = await _getStorage('token');
    setState({
      ...state,
      isLoading: true,
    });

    let datasignup = {
      name: fullName,
      email: email,
      phone: PNumber,
      address: address,
    };
    axios
      .post(BASE_URL + `/User/addUser`, datasignup, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        if (response?.data?.message == 'User SignUp Successfully...') {
          setState({
            ...state,
            isLoading: false,
          });
          navigation.navigate(Routes.BOTTOM_TAB_BAR);
        } else {
          console.log('else condition');
        }
      })
      .catch(error => {
        console.log('Sign Up Catch error', error);
        setState({
          ...state,
          isLoading: false,
        });
      });
  };

  const _UP_LoadProfile_Img = async () => {
    const token = await _getStorage('token');

    let formData = new FormData();
    if (state.profileImg) {
      var imgName = state.profileImg?.path?.replace(/^.*[\\\/]/, '');
      formData.append('image', {
        name: imgName,
        type: state.profileImg?.mime,
        uri:
          Platform.OS === 'android'
            ? state.profileImg?.path
            : state.profileImg?.path?.replace('file://', ''),
      });

      axios
        .post(BASE_URL + `/User/userAddPic`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          SimpleToast({title: res.data.message, isLong: true});
          setState({...state, profileImg: null});

          SimpleToast({title: res?.data?.message, isLong: true});
        })
        .catch(error => {
          console.log(
            'error in catch Profile image',
            error?.response?.data?.message,
          );
          SimpleToast({title: error?.response?.data?.message, isLong: true});
          setState({...state, profileImg: null});
        });
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
          <View style={Styles.circle}>
            <TouchableOpacity activeOpacity={0.8} onPress={onGallary}>
              {state.profileImg ? (
                <Image
                  source={{uri: state.profileImg.path}}
                  style={[Styles.circle, {top: 0, resizeMode: 'cover'}]}
                />
              ) : (
                <FontAwesome5Icon
                  title={'camera'}
                  size={50}
                  IconColor={COLORS.GRAYLIGHT}
                />
              )}
            </TouchableOpacity>
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
            <View style={[Styles.TEXTINPUT, {height: heightPixel(55)}]}>
              <Text
                style={{
                  color: COLORS.BLACK,
                  // fontWeight: '500',
                  fontSize: fontPixel(16),
                }}>
                {PNumber}
              </Text>
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
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginTop: heightPixel(100),
            }}>
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
                  'Sign Up'
                )
              }
              onPress={handleSubmit}
              // onPress={() => navigation.navigate(Routes.BOTTOM_TAB_BAR)}
            />
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
  circle: {
    height: 115,
    width: 115,
    borderRadius: heightPixel(screenHeight),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DarkGreen2,
    alignSelf: 'center',
    top: 10,
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
