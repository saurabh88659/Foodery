import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {COLORS, fontFamily} from '../utils/Colors';

export default function OnboardingScreen({navigation}) {
  const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? COLORS.ORANGE : COLORS.GRAY;

    return (
      <View
        style={{
          width: selected ? 22 : 8,
          height: selected ? 7 : 7,
          borderRadius: 10,
          marginHorizontal: 4,
          backgroundColor,
          marginBottom: 100,
          right: 130,
        }}
      />
    );
  };

  const Skip = ({...props}) => (
    <TouchableOpacity {...props} style={{left: 35, top: -25}}>
      <Text style={{color: COLORS.BLACK, fontSize: fontPixel(18)}}>Skip</Text>
    </TouchableOpacity>
  );

  const Done = ({...props}) => (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: COLORS.ORANGE,
        paddingVertical: 12,
        marginHorizontal: 20,
        top: -30,
        width: widthPixel(140),
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: COLORS.WHITE, fontWeight: '500'}}>Get Started</Text>
    </TouchableOpacity>
  );
  const Next = ({...props}) => (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor: COLORS.ORANGE,
        paddingVertical: 12,
        marginHorizontal: 20,
        top: -30,
        width: widthPixel(140),
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: COLORS.WHITE, fontWeight: '500'}}>Get Started</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={Styles.Container}>
      <Onboarding
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        NextButtonComponent={Next}
        DotComponent={Dots}
        bottomBarHighlight={false}
        showNext={true}
        showDone={true}
        onSkip={() => navigation.replace('Login')}
        onDone={() => navigation.navigate('Login')}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../Assets/Logo/illustrationIcone.png')}
                style={Styles.ImgeStyle}
              />
            ),
            title: '',
            subtitle: (
              <Text style={Styles.pragraphstyle}>
                Browser & Order All Products{`\n`} at Any Time
              </Text>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../Assets/Logo/illustration.png')}
                style={Styles.ImgeStyle}
              />
            ),
            title: '',
            subtitle: (
              <Text style={Styles.pragraphstyle}>
                You Package in Our Safe Hands
              </Text>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../Assets/Logo/illustration2.png')}
                style={Styles.ImgeStyle}
              />
            ),
            title: '',
            subtitle: (
              <Text style={Styles.pragraphstyle}>
                Committed Delivery on Time
              </Text>
            ),
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('../Assets/Logo/illustration1.png')}
                style={Styles.ImgeStyle}
              />
            ),
            title: '',
            subtitle: (
              <Text style={Styles.pragraphstyle}>
                24x7 Fastest & Safest Delivery
              </Text>
            ),
          },
        ]}
      />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  pragraphstyle: {
    color: COLORS.GRAY,
    fontSize: fontPixel(20),
    fontWeight: '500',
    letterSpacing: 0,
    top: '-2%',
    textAlign: 'center',
    fontFamily: fontFamily.RubikMedium,
  },
  ImgeStyle: {
    height: heightPixel(400),
    width: widthPixel(400),
    resizeMode: 'contain',
  },
});
