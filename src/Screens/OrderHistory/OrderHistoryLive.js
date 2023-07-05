import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../../Components/Dimensions';
import Lottie from 'lottie-react-native';
import {BottomSheet} from 'react-native-btr';
import {EntypoIcon, LATITUDE_DELTA, LONGITUDE_DELTA} from '../../utils/Const';
import {useSelector} from 'react-redux';
import MapView, {Marker} from 'react-native-maps';

export default function OrderHistoryLive() {
  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const Locations = useSelector(state => state.locationReducer);

  const SRTDATA = [
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
    {
      name: 'ravi rai',
    },
  ];

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <ScrollView contentContainerStyle={{paddingBottom: 25}}>
        <Text style={Styles.QTEXT}>Order Summary</Text>

        <View style={Styles.MAINCONTAINERMAIN}>
          {SRTDATA.map((value, index) => (
            <View key={index} style={Styles.MAINBOX}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../Assets/Logo/Laysicone.jpg')}
                  style={Styles.IMAGESTYLES}
                />
                <View style={Styles.QTEXTBOX}>
                  <View>
                    <Text numberOfLines={1} style={Styles.QTEXTNAME}>
                      Mango Alphonso
                    </Text>
                    <Text style={Styles.QSUBTITEL}>Mango Alphonso</Text>
                  </View>
                  <Text style={Styles.QPRICES}>Rs. 567</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={Styles.TOTALBOXSTY}>
            <View style={Styles.SUBBOX}>
              <Text style={Styles.TOTALTITLES}>Item Total</Text>
              <Text style={[Styles.TOTALTITLES, {fontSize: fontPixel(20)}]}>
                {`Rs.${'100'}`}
              </Text>
            </View>

            <View style={[Styles.SUBBOX]}>
              <Text style={Styles.HANDLINGTITLE}>
                Handling Charges
                <Text style={{color: COLORS.GREEN}}> (Rs.10 Saved)</Text>
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.DELIVERYTITLE}>Rs.15</Text>
                <Text style={Styles.FREEPRICES}>Rs.5</Text>
              </View>
            </View>

            <View
              style={[
                Styles.SUBBOX,
                {
                  borderBottomWidth: 0.2,
                  color: COLORS.LIGHTGREEN,
                  paddingVertical: 5,
                },
              ]}>
              <Text style={Styles.HANDLINGTITLE}>
                Delivery Free{' '}
                <Text style={{color: COLORS.GREEN}}>(Rs.36 Saved)</Text>
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={Styles.DELIVERYTITLE}>Rs.18</Text>
                <Text style={Styles.FREEPRICES}>Rs.8</Text>
              </View>
            </View>

            <View
              style={[
                Styles.SUBBOX,
                {
                  alignItems: 'center',
                  paddingVertical: 15,
                  top: heightPixel(2),
                },
              ]}>
              <Text style={Styles.TOTALTITLES}>To pay</Text>
              <Text style={[Styles.TOTALTITLES, {fontSize: fontPixel(20)}]}>
                {`Rs.${'100'}`}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={toggleBottomNavigationView}
          activeOpacity={0.5}
          style={Styles.QBOXBOT}>
          <Lottie
            source={require('../../Assets/Lottiejson/58352-delivery-boy.json')}
            autoPlay
            loop={true}
            style={{height: heightPixel(90)}}
          />
          <View style={{width: widthPixel(200)}}>
            <Text style={{fontSize: fontPixel(15), color: COLORS.BLACK}}>
              Your Delivery Partner will be assigned soon
            </Text>
            <Text
              style={{
                fontSize: fontPixel(15),
                color: COLORS.BLACK,
                paddingTop: 5,
              }}>
              +91 7739*******980
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            activeOpacity={0.6}
            style={Styles.CLOSEBTN}>
            <EntypoIcon title="cross" size={25} IconColor={COLORS.WHITE} />
          </TouchableOpacity>
          <View style={Styles.bottomNavigationView}>
            <View style={Styles.MAPBOX}>
              {Locations && (
                <MapView
                  style={StyleSheet.absoluteFill}
                  initialRegion={{
                    latitude: Locations.latitude,
                    longitude: Locations.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  showsUserLocation={true}
                  provider="google">
                  <Marker
                    coordinate={{
                      latitude: Locations.latitude,
                      longitude: Locations.longitude,
                    }}
                    // title={address}
                  />
                </MapView>
              )}
            </View>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
  },
  QTEXT: {
    color: COLORS.BLACK,
    fontSize: fontPixel(20),
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: '500',
    letterSpacing: 0.4,
  },

  MAINCONTAINERMAIN: {
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  MAINBOX: {
    marginVertical: 3,
    marginHorizontal: 15,
    paddingVertical: heightPixel(10),
  },
  IMAGESTYLES: {
    height: heightPixel(60),
    width: widthPixel(60),
  },
  PRODUCTTEXT: {
    color: COLORS.BLACK,
    paddingLeft: widthPixel(10),
  },
  QTEXTBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: widthPixel(20),
  },
  QTEXTNAME: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    fontWeight: '500',
    letterSpacing: 0.3,
    width: widthPixel(200),
  },
  QSUBTITEL: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(14),
    letterSpacing: 0.3,
    paddingTop: heightPixel(5),
  },
  QPRICES: {
    color: COLORS.BLACK,
    fontSize: fontPixel(18),
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  QBOXBOT: {
    height: heightPixel(100),
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  TOTALBOXSTY: {
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 0.5,
    borderColor: COLORS.GRAYDARK,
    marginHorizontal: 15,
  },
  SUBBOX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 15,
    top: heightPixel(10),
    paddingVertical: 3,
  },
  TOTALTITLES: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: fontPixel(18),
  },
  HANDLINGTITLE: {color: COLORS.GRAYDARK, fontSize: fontPixel(17)},
  DELIVERYTITLE: {
    color: COLORS.GRAYDARK,
    fontSize: fontPixel(17),
    paddingRight: 10,
    textDecorationLine: 'line-through',
  },
  FREEPRICES: {
    color: COLORS.GREEN,
    fontSize: fontPixel(17),
  },
  bottomNavigationView: {
    backgroundColor: COLORS.WHITE,
    height: heightPixel(700),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  CLOSEBTN: {
    backgroundColor: COLORS.BLACK,
    height: heightPixel(50),
    width: widthPixel(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  MAPBOX: {
    marginTop: 10,
    height: heightPixel(600),
    backgroundColor: COLORS.GREEN,
    elevation: 9,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
});
