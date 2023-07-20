import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MyHeader from '../Components/MyHeader';
import {COLORS} from '../utils/Colors';
import {
  fontPixel,
  heightPixel,
  screenHeight,
  widthPixel,
} from '../Components/Dimensions';
import {BASE_URL, EntypoIcon, IonIcon} from '../utils/Const';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';

export default function Notification({navigation}) {
  const [isNotifications, setIsNotifications] = useState([]);
  const SRTNOW = [
    {
      title: 'Your order has been delivered',
      time: 'Now',
      itecolor: '#38EF7D',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
      itecolor: '#38EF',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },

    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
    {
      title: 'Your order has been delivered',
      time: 'Now',
    },
  ];

  useEffect(() => {
    _Notification();
  });

  const _Notification = async () => {
    const token = await _getStorage('token');
    axios
      .get(BASE_URL + `/notificationModel/getAllNotification`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        console.log('message response------>>>', response.data);
        setIsNotifications(response?.data?.result);
      })
      .catch(error => {
        console.log('catch message error----->>>>', error);
      });
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeader
        title={'Notification'}
        onPress={() => navigation.goBack()}
        UIBACK={
          <IonIcon
            title="arrow-back-outline"
            size={30}
            IconColor={COLORS.WHITE}
          />
        }
      />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        data={isNotifications}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[Styles.MAINBOX, {backgroundColor: item.itecolor}]}>
            <EntypoIcon
              title="dot-single"
              size={35}
              IconColor={COLORS.PURPLE}
            />
            <View>
              <Text numberOfLines={1} style={[Styles.TITLE]}>
                {item?.title}
              </Text>
              <Text numberOfLines={2} style={Styles.SUBTITLE}>
                {item?.body}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  MAINBOX: {
    height: heightPixel(100),
    backgroundColor: COLORS.LIGHT_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
    top: 10,
  },
  TITLE: {
    fontSize: fontPixel(16),
    fontWeight: '400',
    color: COLORS.BLACK,
    letterSpacing: 0.4,
    width: widthPixel(360),
  },
  SUBTITLE: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLORS.GRAYDARK,
    letterSpacing: 0.5,
    // width: widthPixel(screenHeight),
    width: widthPixel(350),
  },
});
