import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import Button from '../Components/Button';
import {
  EntypoIcon,
  IonIcon,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  SimpleToast,
} from '../utils/Const';
import {TextInput} from 'react-native-paper';
// import MapView, {Marker} from 'react-native-maps';
// import Geocoder from 'react-native-geocoding';
import {BottomSheet} from 'react-native-btr';
// import {setAnimalAddress} from '../Redux/ReducerSlice/AddressLSlice';
import Lottie from 'lottie-react-native';
import {_getAddress, _postaddress} from '../utils/Handler/EpicControllers';
import {setCurrentAddress} from '../Redux/ReducerSlice/AddressLSlice';
var query = require('india-pincode-search');
import {useIsFocused} from '@react-navigation/native';

export default function AddressScreenWithMap({navigation, route}) {
  const [visible, setVisible] = React.useState(false);
  const [completeAddress, setCompleteAddress] = React.useState('');
  const preId = route.params;
  const isFocused = useIsFocused();

  const [completeAddressError, setCompleteAddressError] = React.useState('');
  const [isFloor, setIsFloor] = React.useState('');
  const [isFloorError, setIsFloorError] = React.useState('');
  const [isNearby, setIsnearby] = React.useState('');
  const [isNearbyError, setIsnearbyError] = React.useState('');
  const [isReceiveName, setIsReceiveName] = React.useState('');
  const [isPincode, setIsPincode] = useState('');
  const [isPincodeError, setIsPincodeError] = useState('');
  const [isCity, setIsCity] = useState('');
  const [isCityError, setIsCityError] = useState('');
  const [isState, setIsState] = useState('');
  const [isStateError, setIsStateError] = useState('');
  const [issaveas, setIssaveas] = React.useState('Home');
  const [isLoading, setIsLoading] = React.useState(false);
  const mapjosn = require('../Assets/Lottiejson/animation_lnmpy47v.json');

  const dispatch = useDispatch();

  // const [state, setState] = React.useState({
  //   isLoading: false,
  // });

  const _Complete_validateAddress = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(completeAddress)) {
      setCompleteAddressError('Please enter your complete address');
      return false;
    } else {
      setCompleteAddressError('');
      return true;
    }
  };

  const currentaddress = useSelector(
    state => state.AddressLSlice.currentAddress,
  );

  useEffect(() => {
    if (isFocused) {
      _getAddressapidata();
    }
  }, [isFocused]);

  // async function updatedata() {
  //   setCompleteAddress(newAddress?.compleAddress);
  //   setIsFloor(newAddress?.floor);
  //   setIsnearby(newAddress?.nearby);
  //   setIsReceiveName(newAddress?.namer);
  // }

  const validateFloorName = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(isFloor)) {
      setIsFloorError('Please enter your Floor');
      return false;
    } else {
      setIsFloorError('');
      return true;
    }
  };

  const validateNearBy = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(isNearby)) {
      setIsnearbyError('Please enter your Nearby');
      return false;
    } else {
      setIsnearbyError('');
      return true;
    }
  };

  const validatePincode = () => {
    const namePattern = /^\d{6}$/;
    if (!namePattern.test(isPincode)) {
      setIsPincodeError('Please enter your Pincode');
      return false;
    } else {
      setIsPincodeError('');
      return true;
    }
  };

  const validateSate = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(isState)) {
      setIsStateError('Please enter your State');
      return false;
    } else {
      setIsStateError('');
      return true;
    }
  };

  const validateCity = () => {
    const namePattern = /^[a-zA-Z0-9\s,]+$/;
    if (!namePattern.test(isState)) {
      setIsCityError('Please enter your City');
      return false;
    } else {
      setIsCityError('');
      return true;
    }
  };

  const _Is_Address_Validation_handle_Submit = () => {
    const _Is_Address_Complete = _Complete_validateAddress(completeAddress);
    const _is_Floor_Name = validateFloorName(isFloor);
    const _is_Near_by = validateNearBy(isNearby);
    const _is_pincode = validatePincode(isPincode);
    const _is_State = validateSate(isState);
    const _is_City = validateCity(isCity);
    setIsLoading(true);
    if (
      _Is_Address_Complete &&
      _is_Floor_Name &&
      _is_Near_by &&
      _is_pincode &&
      _is_State &&
      _is_City
    ) {
      // SimpleToast({title: 'Address update successfully', isLong: true});
      setTimeout(() => {
        setVisible(!visible);
        setIsLoading(false);
      }, 1500);
      _addaddres();

      // dispatch(
      //   setAnimalAddress({
      //     compleAddress: completeAddress,
      //     floor: isFloor,
      //     nearby: isNearby,
      //     namer: isReceiveName,
      //     saveas: issaveas,
      //     pincode: isPincode,
      //   }),
      // );
    }
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const Locations = useSelector(state => state.locationReducer);
  const [adrtext, setAdrtext] = React.useState(1);

  const addressCurrent = useSelector(
    state => state.AddressLSlice.currentAddress,
  );

  // console.log('addressCurrent---------', addressCurrent);

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
      lablename: 'Other',
    },
    {
      Name: 'Hotel',
      _id: 4,
      lablename: 'Hotel',
    },
  ];

  const handleTextChange = text => {
    setPlaceholderText(text);
  };

  const fetchLocationInfo = () => {
    const CollectData = query.search(`${isPincode}`);
    if (CollectData[0] == null) {
      SimpleToast({title: 'Please Enter Correct Pincode', isLong: true});
    } else {
      setIsState(CollectData[0]?.state);
      setIsCity(CollectData[0]?.city);
    }
  };

  const _addaddres = async () => {
    const data = {
      completeAddress: completeAddress,
      floor: isFloor,
      nearby_landmark: isNearby,
      receiverName: isReceiveName,
      pinCode: isPincode,
      state: isState,
      city: isCity,
      saveAs: issaveas,
    };
    const result = await _postaddress({data: data, id: preId});
    if (result?.data) {
      console.log('response data:====>>', result?.data);
      SimpleToast({title: result?.data?.message, isLong: true});
      dispatch(setCurrentAddress(completeAddress));
    } else {
      console.log('catch error:', result?.response?.data);
      SimpleToast({title: result?.response?.data?.message, isLong: true});
    }
  };

  const _getAddressapidata = async () => {
    const result = await _getAddress();
    if (result?.data) {
      console.log('response data:', result?.data?.result[0].city);
      dispatch(setCurrentAddress(result?.data?.result[0]?.completeAddress));
      setIsCity(result?.data?.result[0].city);
      setIsState(result?.data?.result[0].state);
      setIsPincode(result?.data?.result[0].pinCode);
      setCompleteAddress(result?.data?.result[0].completeAddress);
      setIsFloor(result?.data?.result[0].floor);
      setIsnearby(result?.data?.result[0].nearby_landmark);
      setIsReceiveName(result?.data?.result[0].receiverName);
    } else {
      console.log('catch error:', result?.response?.data);
      SimpleToast({title: result?.response?.data?.message, isLong: true});
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={Styles.CONTAINERMAIN}>
        <MyHeaderNo2
          title={'Choose Your Address'}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}>
          <Lottie
            source={mapjosn}
            autoPlay
            loop={true}
            style={{
              height: heightPixel(300),
              // width: widthPixel(200),
            }}
          />
        </View>
        {/* <View style={Styles.MAPBOX}>
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
        </View> */}

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

              <Text style={Styles.SUBTITLELOCATIONS}>{completeAddress}</Text>
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
          <ScrollView style={{}}>
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
                <Text style={Styles.SUBTITLELOCATIONS}>
                  {/* {newAddress?.compleAddress} */}
                </Text>
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
                        setIssaveas(value?.lablename);
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
                  value={completeAddress}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setCompleteAddress(text)}
                  style={{
                    marginHorizontal: 10,
                    fontSize: 14,
                    color: COLORS.GRAYDARK,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: completeAddressError
                      ? COLORS.BROWN
                      : COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />

                {completeAddressError ? (
                  <Text style={Styles.ERRORTEXT}>{completeAddressError}</Text>
                ) : null}
                <TextInput
                  label="Floor"
                  value={isFloor}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setIsFloor(text)}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: '2%',
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: isFloorError ? COLORS.BROWN : COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />

                {isFloorError ? (
                  <Text style={Styles.ERRORTEXT}>{isFloorError}</Text>
                ) : null}
                <TextInput
                  label="Nearby landmark"
                  value={isNearby}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setIsnearby(text)}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: '2%',
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: isNearbyError ? COLORS.BROWN : COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />
                {isNearbyError ? (
                  <Text style={Styles.ERRORTEXT}>{isNearbyError}</Text>
                ) : null}

                <TextInput
                  label="Pincode"
                  value={isPincode}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setIsPincode(text)}
                  onBlur={fetchLocationInfo}
                  maxLength={6}
                  keyboardType="number-pad"
                  style={{
                    marginHorizontal: 10,
                    marginVertical: '2%',
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: isPincodeError ? COLORS.BROWN : COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />
                {isPincodeError ? (
                  <Text style={Styles.ERRORTEXT}>{isPincodeError}</Text>
                ) : null}

                <TextInput
                  label="State"
                  value={isState}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setIsState(text)}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: '2%',
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: isStateError ? COLORS.BROWN : COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />
                {isStateError ? (
                  <Text style={Styles.ERRORTEXT}>{isStateError}</Text>
                ) : null}

                <TextInput
                  label="Town/City"
                  value={isCity}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setIsCity(text)}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: '2%',
                    fontSize: 14,
                    height: heightPixel(50),
                  }}
                  outlineStyle={{
                    borderWidth: 1,
                    borderColor: isCityError ? COLORS.BROWN : COLORS.GREEN,
                    borderRadius: 10,
                  }}
                />

                {isCityError ? (
                  <Text style={Styles.ERRORTEXT}>{isCityError}</Text>
                ) : null}

                <TextInput
                  label="Receiver's Name (optional)"
                  value={isReceiveName}
                  textColor={COLORS.BLACK}
                  activeOutlineColor={COLORS.BLACK}
                  mode="outlined"
                  onChangeText={text => setIsReceiveName(text)}
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
                <Button
                  title={
                    isLoading ? (
                      <View style={Styles.activStylesIndicator}>
                        <ActivityIndicator size="small" color={COLORS.WHITE} />
                        <Text style={Styles.activeStylesTitleIndicator}>
                          Please wait...
                        </Text>
                      </View>
                    ) : (
                      'Save address'
                    )
                  }
                  onPress={_Is_Address_Validation_handle_Submit}
                />
              </View>
            </View>
          </ScrollView>
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
    elevation: 3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: COLORS.WHITE,
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
  ERRORTEXT: {
    color: 'red',
    marginTop: 5,
    marginHorizontal: 15,
    fontSize: fontPixel(13),
  },
  activStylesIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStylesTitleIndicator: {
    color: COLORS.WHITE,
    fontSize: fontPixel(15),
    paddingLeft: 5,
  },
});
