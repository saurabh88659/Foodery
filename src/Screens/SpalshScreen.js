import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel} from '../Components/Dimensions';

export default function SpalshScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('CreateAccount');
    }, 5000);
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
