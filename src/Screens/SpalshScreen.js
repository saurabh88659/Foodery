import {Text, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel} from '../Components/Dimensions';

export default function SpalshScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnboardingScreen');
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={Styles.Container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={COLORS.ORANGE}
        translucent={true}
      />
      <Text style={Styles.Text}>FOODERY</Text>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: fontPixel(30),
    letterSpacing: 4,
    fontWeight: '900',
    color: COLORS.WHITE,
  },
});
