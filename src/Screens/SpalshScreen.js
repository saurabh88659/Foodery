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
import {MAP_API_KEY} from '../utils/Const';
import Geocoder from 'react-native-geocoding';
import {useIsFocused} from '@react-navigation/native';
import Routes from '../Navigation/Routes';

export default function SpalshScreen({navigation}) {
  const IsFocused = useIsFocused();
  const dispatch = useDispatch();
  const Locations = useSelector(state => state.locationReducer);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(Routes.LOG_IN_SCREEN);
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
    if (IsFocused) {
      getCurrentPosition();
      // geoCoding();
    }
  }, [IsFocused]);

  // const _GetCurrentAddress = useSelector(state => state.geolocationReducer);

  // console.log('_GetCurrentAddress', _GetCurrentAddress);

  // const geoCoding = async () => {
  //   Geocoder.init(MAP_API_KEY);

  //   Geocoder.from(Locations.latitude, Locations.longitude).then(json => {
  //     // console.log('chack data=====', json.results.coords);
  //     json.results[0].address_components.forEach((value, index) => {
  //       console.log(
  //         'hey++++++++++++++++++++++++++DG',
  //         json.results[0].formatted_address,
  //       );

  //       // setAddress(
  //       //   json.results[0].formatted_address,
  //       //   // tempAddress: json.results[0].formatted_address,
  //       // );
  //     });
  //   });
  // };

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
