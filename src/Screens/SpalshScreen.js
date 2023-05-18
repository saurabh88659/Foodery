import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel} from '../Components/Dimensions';
import Geolocation from '@react-native-community/geolocation';
import {updateGeolocation} from '../Redux/Action/locationAction';
import {useDispatch, useSelector} from 'react-redux';

export default function SpalshScreen({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('CreateAccount');
    }, 5000);
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        dispatch(updateGeolocation(latitude, longitude));
      },
      error => console.log('error locations', error), // handle error if needed
    );
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return (
    <SafeAreaView style={Styles.Container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={COLORS.WHITE}
        translucent={true}
      />

      <ImageBackground
        source={require('../Assets/Logo/splashbackgoundimage.png')}
        style={Styles.CONAINERBACKGROUND}>
        <Text style={Styles.TEXTSTYL}>
          Welcome to {`\n`} <Text style={{fontWeight: '800'}}>Grocery</Text>{' '}
          shopping
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  TEXTSTYL: {
    fontSize: fontPixel(33),
    letterSpacing: 1,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  CONAINERBACKGROUND: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
