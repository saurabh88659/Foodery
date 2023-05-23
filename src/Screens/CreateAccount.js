import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {createaccountTOPImage} from '../utils/Const';
import {COLORS} from '../utils/Colors';
import {heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';
import {requestUserPermission} from '../utils/Handler/FirebaseMessagingNoti';
import Routes from '../Navigation/Routes';

export default function CreateAccount({navigation}) {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <View style={Styles.CONTAINERIMAGEMAIN}>
        <Image source={createaccountTOPImage} style={Styles.IMAGESTYL} />
      </View>
      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <View style={{marginVertical: '5%'}}>
          <Button
            title={'Login'}
            onPress={() => navigation.navigate(Routes.LOG_IN)}
          />
          <View style={{marginVertical: '5%'}}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate(Routes.SIGN_UP_SCREEN);
                navigation.navigate('BottomTabBar');
              }}
              activeOpacity={0.6}
              style={Styles.CONTAINERBUTTON}>
              <Text style={Styles.BUTTONTEXT}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  },
  IMAGESTYL: {height: heightPixel(500), width: widthPixel(500)},
  CONTAINERBUTTON: {
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
  },
  BUTTONTEXT: {
    color: COLORS.GREEN,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
