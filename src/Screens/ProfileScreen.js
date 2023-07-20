import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {
  fontPixel,
  heightPixel,
  screenHeight,
  widthPixel,
} from '../Components/Dimensions';
import {
  BASE_URL,
  FontAwesome5Icon,
  MaterialCommunityIconsTwo,
  SimpleToast,
} from '../utils/Const';
import Button from '../Components/Button';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
// import actionProfile from '../Redux/Action/actionProfile';
import ImagePicker from 'react-native-image-crop-picker';
import ProfileshimmerPlaceHolder from '../Components/ShimmerPlaceHolder/ProfileshimmerPlaceHolder';
import {setProfileData} from '../Redux/ReducerSlice/ProfileSlice';

export default function ProfileScreen({navigation}) {
  const IsFocused = useIsFocused();
  const [isProfile, setIsProfile] = useState('');
  const dispatch = useDispatch();

  const profiledata = useSelector(state => state.ProfileSlice.profiledata);
  // console.log('profiledata---DF------', profiledata);

  const [state, setState] = useState({
    profileImg: null,
    isLoading: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (IsFocused) {
      _Handle_Profile();
    }
  }, [IsFocused]);

  const _Handle_Profile = async () => {
    setIsLoading(true);
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/User/getProfile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // console.log('Profile Response', response.data.result);
        setIsProfile(response?.data?.result);
        dispatch(setProfileData(response?.data?.result));

        setIsLoading(false);
      })
      .catch(error => {
        console.log('Profile Catch Error', error);
        setIsLoading(false);
      });
  };

  const onGallary = () => {
    ImagePicker.openPicker({
      cropping: true,
      quality: 1,
      mediaType: 'any',
    })
      .then(image => {
        if (image) {
          setState({
            ...state,
            profileImg: image,
          });
        } else {
          console.log('Please selected Image');
        }
      })
      .catch(err => {
        console.log('Img picker Error--->>>', err);
        SimpleToast({title: 'User cancelled image selection', isLong: true});
      });
  };

  const _UP_LoadProfile_Img = async () => {
    const token = await _getStorage('token');
    setState({
      ...state,
      isLoading: true,
    });
    console.log(token);
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
          // console.log('Profile image--------->>', res.data);
          // console.log('Profile only response data--------->>', res);
          SimpleToast({title: res?.data?.message, isLong: true});
          setState({...state, profileImg: null});
          setState({
            ...state,
            isLoading: false,
          });
        })
        .catch(error => {
          console.log('error in catch Profile image ', error?.response?.data);
          SimpleToast({title: error?.response?.data?.message, isLong: true});
          setState({...state, profileImg: null});
          setState({
            ...state,
            isLoading: false,
          });
        });
    }
  };

  const addressCurrent = useSelector(
    state => state.AddressLSlice.currentAddress,
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <MyHeaderNo2 title={'Profile'} onPress={() => navigation.goBack()} />
        {isLoading ? (
          <ProfileshimmerPlaceHolder />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}>
            <View style={Styles.CONTAINERProfile}>
              <TouchableOpacity
                onPress={onGallary}
                activeOpacity={0.6}
                style={Styles.CAMERAICON}>
                {state.profileImg || isProfile?.profilePic ? (
                  <Image
                    source={
                      state.profileImg
                        ? {uri: state.profileImg?.path}
                        : {uri: isProfile?.profilePic}
                    }
                    style={[Styles.CONTAINERProfile]}
                  />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onGallary}
                activeOpacity={0.6}
                style={Styles.BALCKBOX_ICON}>
                <FontAwesome5Icon
                  title={'camera'}
                  size={15}
                  IconColor={COLORS.GRAYDARK}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'center',
                marginTop: -10,
              }}>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIconsTwo
                  title={'pencil'}
                  size={16}
                  IconColor={COLORS.GREEN}
                  IconStyle={{right: 5}}
                />
                <Text style={Styles.EDITTITLE}>Edit Profile</Text>
              </View> */}

              <Text style={Styles.NAMETITLE}>Hi {isProfile?.name}!</Text>
              {/* <Text style={{color: COLORS.GRAYDARK, fontWeight: '500'}}>
                Sign out
              </Text> */}
            </View>

            <View style={{marginVertical: '5%'}}>
              <View style={Styles.MAINBOX}>
                <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                  Name
                </Text>
                <Text style={{color: COLORS.BLACK}}>{isProfile?.name}</Text>
              </View>
              <View style={Styles.MAINBOX}>
                <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                  Email
                </Text>
                <Text style={{color: COLORS.BLACK}}>{isProfile?.email}</Text>
              </View>
              <View style={Styles.MAINBOX}>
                <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                  Mobile No.
                </Text>
                <Text style={{color: COLORS.BLACK}}>{isProfile?.phone}</Text>
              </View>
              <View style={Styles.MAINBOX}>
                <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                  Address
                </Text>
                <Text style={{color: COLORS.BLACK}}>{isProfile?.address}</Text>
              </View>
            </View>

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
                  'Save'
                )
              }
              onPress={_UP_LoadProfile_Img}
            />
          </ScrollView>
        )}
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
    height: 115,
    width: 115,
    borderRadius: heightPixel(screenHeight),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DarkGreen2,
    alignSelf: 'center',
    marginVertical: 20,
  },

  CAMERAICON: {
    alignItems: 'center',
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
  BALCKBOX_ICON: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.black08,
    width: widthPixel(100),
    height: heightPixel(25),
    justifyContent: 'center',
    alignItems: 'center',
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
