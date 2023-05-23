import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {BASE_URL, FontAwesome5Icon} from '../utils/Const';
import Button from '../Components/Button';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import actionProfile from '../Redux/Action/actionProfile';

export default function ProfileScreen({navigation}) {
  // const [text, setText] = useState('');
  const IsFocused = useIsFocused();
  const [isProfile, setIsProfile] = useState('');
  // const dispatch = useDispatch();

  // const profiledata = useSelector(state => state.Profilereducer);

  useEffect(() => {
    if (IsFocused) {
      _Handle_Profile();
    }
  }, [IsFocused]);

  const _Handle_Profile = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/User/getProfile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('Profile Response', response.data.result);
        setIsProfile(response.data.result);
        // dispatch(actionProfile(response.data));
      })
      .catch(error => {
        console.log('Profile Catch Error', error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <MyHeaderNo2 title={'Profile'} onPress={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          // scrollEventThrottle={16}
        >
          <View style={Styles.CONTAINERProfile}>
            <TouchableOpacity style={Styles.CAMERAICON}>
              <FontAwesome5Icon
                title={'camera'}
                size={18}
                IconColor={COLORS.GRAYDARK}
              />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={Styles.EDITTITLE}>Edit Profile</Text>
            <Text style={Styles.NAMETITLE}>Hi there {isProfile.name}!</Text>
            <Text style={{color: COLORS.GRAYDARK, fontWeight: '500'}}>
              Sign out
            </Text>
          </View>

          <View style={{marginVertical: '5%'}}>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Name
              </Text>
              <Text style={{color: COLORS.BLACK}}>{isProfile.name}</Text>
            </View>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Email
              </Text>
              <Text style={{color: COLORS.BLACK}}>{isProfile.email}</Text>
            </View>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Mobile No.
              </Text>
              <Text style={{color: COLORS.BLACK}}>{isProfile.phone}</Text>
            </View>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Address
              </Text>
              <Text style={{color: COLORS.BLACK}}>{isProfile.address}</Text>
            </View>
          </View>

          <Button title={'Save'} onPress={_Handle_Profile} />
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  CONTAINERProfile: {
    height: heightPixel(130),
    width: widthPixel(130),
    backgroundColor: COLORS.DarkGreen2,
    marginVertical: 13,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: '8%',
  },
  CAMERAICON: {
    alignItems: 'center',
    top: -8,
  },
  EDITTITLE: {
    alignItems: 'center',
    color: COLORS.GREEN,
    fontWeight: '500',
  },
  NAMETITLE: {
    color: COLORS.BLACK,
    fontSize: fontPixel(20),
    fontWeight: '500',
    paddingVertical: 5,
  },
  MAINBOX: {
    marginVertical: 13,
    height: heightPixel(65),
    backgroundColor: COLORS.GRAYLIGHT,
    borderRadius: 30,
    marginHorizontal: 15,
    paddingHorizontal: 25,
    paddingTop: 10,
    elevation: 1,
  },
});
