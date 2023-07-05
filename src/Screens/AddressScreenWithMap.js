import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {createRef} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {useSelector} from 'react-redux';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';
import {
  EntypoIcon,
  IonIcon,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from '../utils/Const';
import {TextInput} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';
import {BottomSheet} from 'react-native-btr';

export default function AddressScreenWithMap({navigation}) {
  const [visible, setVisible] = React.useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  const Locations = useSelector(state => state.locationReducer);
  const [text, setText] = React.useState('');
  const [adrtext, setAdrtext] = React.useState(1);
  const addressCurrent = useSelector(
    state => state.AddressLSlice.currentAddress,
  );
  const [placeholderText, setPlaceholderText] =
    React.useState('Complete address');

  const adrSRT = [
    {
      Name: 'Home',
      _id: 1,
      lablename: 'Complete address',
    },
    {
      Name: 'Office',
      _id: 2,
      lablename: 'Office/Building Name',
    },
    {
      Name: 'Other',
      _id: 3,
      lablename: 'Complete address',
    },
    {
      Name: 'Hotel',
      _id: 4,
      lablename: 'Complete address',
    },
  ];

  const handleTextChange = text => {
    setPlaceholderText(text);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <MyHeaderNo2
          title={'Choose Your Address'}
          onPress={() => navigation.goBack()}
        />
        <View style={Styles.MAPBOX}>
          {Locations && (
            <MapView
              style={StyleSheet?.absoluteFill}
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
                title={addressCurrent}
              />
            </MapView>
          )}
        </View>
        <View style={Styles.BOXNUMBEROF2}>
          <Text style={Styles.TITLEPR}>Your Locations</Text>
          <View style={Styles.BOXLOACTIONS}>
            <View style={Styles.ICONEBOXLOACTIONS}>
              <IonIcon
                title="ios-location-sharp"
                size={40}
                IconColor={COLORS.GREEN}
              />
            </View>
            <View>
              {/* <Text
                style={[
                  Styles.SUBTITLELOCATIONS,
                  {fontSize: fontPixel(19), fontWeight: '500'},
                ]}>
                {block}
              </Text> */}

              <Text style={Styles.SUBTITLELOCATIONS}>{addressCurrent}</Text>
            </View>
          </View>
          <View style={{marginVertical: '2%'}}>
            <Button
              title={'Enter complete address'}
              onPress={toggleBottomNavigationView}
            />
          </View>
        </View>

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
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                borderTopLeftRadius: 13,
                borderTopRightRadius: 13,
              }}>
              <View style={Styles.BOXLOACTIONS}>
                <View style={Styles.ICONEBOXLOACTIONS}>
                  <IonIcon
                    title="ios-location-sharp"
                    size={40}
                    IconColor={COLORS.GREEN}
                  />
                </View>
                <Text style={Styles.SUBTITLELOCATIONS}>{addressCurrent}</Text>
              </View>
              <View style={{marginTop: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  {adrSRT.map((value, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setAdrtext(value?._id),
                          handleTextChange(value?.lablename);
                      }}
                      key={index}
                      style={[
                        Styles.addressbox,
                        {
                          backgroundColor:
                            adrtext === value?._id
                              ? COLORS.GREEN
                              : COLORS.WHITE,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            adrtext === value?._id
                              ? COLORS.WHITE
                              : COLORS.GREEN,
                          letterSpacing: 0.6,
                          fontSize: 13,
                        }}>
                        {value?.Name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text
                  style={{
                    color: COLORS.GRAYDARK,
                    paddingHorizontal: 15,
                    fontSize: 13,
                    paddingVertical: 10,
                  }}>
                  Enter complete address
                </Text>
                <TextInput
                  // label="Flat /Building /Street"
                  label={placeholderText}
                  value={text}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setText(text)}
                  style={{
                    marginHorizontal: 10,
                    fontSize: 14,
                    color: COLORS.GRAYDARK,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />
                <TextInput
                  label="Floor (optional)"
                  value={text}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setText(text)}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: '2%',
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />

                <TextInput
                  label="Nearby landmark (optional)"
                  value={text}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setText(text)}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: '2%',
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />
                <TextInput
                  label="Receiver's Name*"
                  value={text}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setText(text)}
                  style={{
                    marginHorizontal: 10,
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />
              </View>

              <View style={{marginTop: 20, top: -10}}>
                <Button title={'Save address'} />
              </View>
            </View>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
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
  BOXNUMBEROF2: {
    marginHorizontal: 10,
    height: heightPixel(200),
    // borderWidth: 1,
    flex: 1,
    elevation: 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // marginTop: '1%',
  },
  TITLEPR: {
    color: COLORS.BLACK,
    marginTop: 15,
    fontWeight: '500',
    fontSize: fontPixel(18),
    paddingLeft: 10,
  },
  BOXLOACTIONS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    marginHorizontal: widthPixel(10),
  },
  ICONEBOXLOACTIONS: {
    height: heightPixel(70),
    width: widthPixel(70),
    borderRadius: 10,
    backgroundColor: COLORS.LIGHT_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SUBTITLELOCATIONS: {
    paddingLeft: 10,
    color: COLORS.BLACK,
    fontWeight: '400',
    width: widthPixel(300),
    textAlign: 'left',
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
  addressbox: {
    borderWidth: 1,
    paddingVertical: 4,
    width: widthPixel(60),
    // backgroundColor: COLORS.GREEN,
    alignItems: 'center',
    borderColor: COLORS.GREEN,
    borderRadius: 7,
    marginHorizontal: 5,
  },
});
