import React from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../utils/Colors';
import {
  fontPixel,
  heightPixel,
  screenHeight,
  screenWidth,
  widthPixel,
} from './Dimensions';
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
  _Ui,
  _PayUI,
  _TOP_UI,
}) {
  const UI = data => {
    switch (data) {
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
              <ScrollView>
                <View>{_TOP_UI}</View>

                <View>{_Ui}</View>
              </ScrollView>
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
                borderRadius: 50 / 2,
                alignSelf: 'center',
                // overflow: 'hidden',
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

      case 'payment_check':
        return (
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              paddingVertical: 30,
              borderRadius: 10,
            }}>
            <View>{_PayUI}</View>
            <Text
              style={{
                color: COLORS.BLACK,
                alignSelf: 'center',
                fontSize: fontPixel(18),
                fontWeight: '500',
              }}>
              payment_check
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
                  Cancel
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
                  Conform
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
          type == 'floating-Button'
            ? //  ['up', 'left', 'right', 'down']
              null
            : null
        }>
        {UI(type)}
      </Modal>
    </View>
  );
}
