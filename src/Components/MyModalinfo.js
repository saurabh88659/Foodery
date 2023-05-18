import React from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from './Dimensions';
import {EntypoIcon, IonIcon} from '../utils/Const';
import Lottie from 'lottie-react-native';

export default function MyModalinfo({
  isModal,
  backPress,
  _GoBack,
  type,
  _Visible,
  _SubonPress,
  _YES,
  _NO,
}) {
  const UI = data => {
    switch (data) {
      case 'internet':
        return (
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: COLORS.WHITE,
              paddingHorizontal: 40,
              paddingBottom: 20,
              paddingTop: 10,
              borderRadius: 6,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.RED,
                fontSize: 15,
                textAlign: 'center',
              }}>
              Unable to detect internet connection!
            </Text>
            <Text
              style={{
                color: COLORS.BLACK,
                textAlign: 'center',
                marginTop: 5,
              }}>
              Please enable internet connection {'\n'} and try again
            </Text>
            <Pressable
              style={{
                backgroundColor: COLORS.LIGHT_BLUE,
                paddingVertical: 5,
                paddingHorizontal: 25,
                borderRadius: 2,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => RNExitApp.exitApp()}>
              <Text
                style={{color: COLORS.WHITE, fontWeight: '500', fontSize: 15}}>
                OK
              </Text>
            </Pressable>
          </View>
        );

      case 'password-reset':
        return (
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              paddingVertical: '8%',
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <Lottie
              source={require('../Assets/Lottiejson/94109-confirmation.json')}
              autoPlay
              loop={false}
              style={{height: heightPixel(300), marginVertical: -30}}
            />
            <View style={{top: heightPixel(-30)}}>
              <Text
                style={{
                  color: COLORS.BLACK,
                  fontWeight: '500',
                  fontSize: fontPixel(20),
                  textAlign: 'center',
                }}>
                Password Changed!!
              </Text>
              <Text style={{color: COLORS.BLACK, fontSize: fontPixel(18)}}>
                Your password has been reset
              </Text>
            </View>
            <TouchableOpacity
              onPress={_GoBack}
              style={{
                paddingVertical: 10,
                width: widthPixel(80),
                backgroundColor: COLORS.GREEN,
                borderRadius: 7,
                alignItems: 'center',
              }}>
              <Text style={{color: COLORS.WHITE, fontWeight: '500'}}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        );

      case 'floating-Button':
        return (
          <View>
            <View
              style={{
                height: heightPixel(700),
                backgroundColor: COLORS.WHITE,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  marginVertical: 20,
                  marginHorizontal: 15,
                  color: COLORS.BLACK,
                  fontSize: fontPixel(21),
                  fontWeight: '500',
                }}>
                All Categories
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 15,
                  // backgroundColor: 'red',
                  // paddingVertical: 30,
                }}>
                <View
                  style={{
                    height: heightPixel(60),
                    width: widthPixel(165),
                    borderRadius: 10,
                    backgroundColor: COLORS.LIGHTGREEN,
                  }}></View>
                <View
                  style={{
                    height: heightPixel(60),
                    width: widthPixel(165),
                    borderRadius: 10,
                    backgroundColor: COLORS.LIGHTGREEN,
                  }}></View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Text
                  style={{
                    fontSize: fontPixel(17),
                    fontWeight: '500',
                    color: COLORS.GRAYDARK,
                  }}>
                  Fruits & Vegetables
                </Text>
                <Text
                  style={{
                    fontSize: fontPixel(17),
                    fontWeight: '500',
                    color: COLORS.GRAYDARK,
                  }}>
                  Atta, Rice, Oil & Dals
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={_SubonPress}
                style={{marginHorizontal: 15, marginTop: 30}}>
                <View
                  style={{
                    height: heightPixel(80),
                    width: widthPixel(80),
                    backgroundColor: COLORS.LIGHTGREEN,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                  }}>
                  <IonIcon
                    title="ios-home-sharp"
                    size={25}
                    IconColor={COLORS.GREEN}
                  />
                </View>
                <Text
                  numberOfLines={2}
                  style={{
                    fontWeight: '500',
                    color: COLORS.GRAYDARK,
                    letterSpacing: 0.5,
                    marginTop: 5,
                    fontSize: fontPixel(15),
                  }}>
                  Ravi rai noida
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={_Visible}
              style={{
                marginTop: 15,
                backgroundColor: COLORS.BLACK,
                height: heightPixel(50),
                width: widthPixel(50),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                alignSelf: 'center',
              }}>
              <EntypoIcon title="cross" size={25} IconColor={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        );

      case 'log-out':
        return (
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              paddingVertical: 30,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: COLORS.BLACK,
                alignSelf: 'center',
                fontSize: fontPixel(18),
                fontWeight: '500',
              }}>
              Are You sure you want to logout?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingVertical: '5%',
                top: '5%',
              }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={_YES}
                style={{
                  paddingVertical: 9,
                  backgroundColor: COLORS.GREEN,
                  width: widthPixel(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: fontPixel(18),
                    fontWeight: '500',
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={_NO}
                activeOpacity={0.6}
                style={{
                  paddingVertical: 9,
                  borderWidth: 1,
                  borderColor: COLORS.GREEN,
                  width: widthPixel(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.GREEN,
                    fontSize: fontPixel(18),
                    fontWeight: '500',
                  }}>
                  NO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return <></>;
    }
  };
  return (
    <View>
      <Modal
        // animationOut={'zoomOutUp'}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        isVisible={isModal}
        onBackButtonPress={backPress ? backPress : () => {}}
        onBackdropPress={backPress ? backPress : () => {}}
        swipeDirection={
          type == 'floating-Button' ? ['up', 'left', 'right', 'down'] : null
        }>
        {UI(type)}
      </Modal>
    </View>
  );
}
