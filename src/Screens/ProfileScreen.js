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
import React, {useState} from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {FontAwesome5Icon} from '../utils/Const';
import Button from '../Components/Button';

export default function ProfileScreen({navigation}) {
  // const [text, setText] = useState('');

  const handler_Profile = () => {
    console.log('hey Profile');
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <MyHeader title={'Profile'} onPress={() => navigation.goBack()} />
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
            <Text style={Styles.NAMETITLE}>Hi there Akila!</Text>
            <Text style={{color: COLORS.GRAYDARK, fontWeight: '500'}}>
              Sign out
            </Text>
          </View>

          <View style={{marginVertical: '5%'}}>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Name
              </Text>
              <Text style={{color: COLORS.BLACK}}>Kickr Technology</Text>
            </View>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Email
              </Text>
              <Text style={{color: COLORS.BLACK}}>KickrTech2232@gmail.com</Text>
            </View>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Mobile No.
              </Text>
              <Text style={{color: COLORS.BLACK}}>9499834567</Text>
            </View>
            <View style={Styles.MAINBOX}>
              <Text style={{color: COLORS.GRAYDARK, fontSize: fontPixel(16)}}>
                Address
              </Text>
              <Text style={{color: COLORS.BLACK}}>
                No 23, 6th Lane, Colombo 03 Ithum
              </Text>
            </View>
          </View>

          <Button title={'Save'} onPress={handler_Profile} />
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
