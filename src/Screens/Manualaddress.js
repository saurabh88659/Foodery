import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {
  _manualAddress,
  _putcurrentaddress,
} from '../utils/Handler/EpicControllers';
import {TextInput} from 'react-native-paper';
import Button from '../Components/Button';
import {SimpleToast} from '../utils/Const';

export default function Manualaddress({navigation}) {
  const [completeAddress, setCompleteAddress] = React.useState('');
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [adrtext, setAdrtext] = React.useState(1);
  const [issaveas, setIssaveas] = React.useState('Home');

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

    if (
      _Is_Address_Complete &&
      _is_Floor_Name &&
      _is_Near_by &&
      _is_pincode &&
      _is_State &&
      _is_City
    ) {
      // SimpleToast({title: 'Address update successfully', isLong: true});
      console.log('heeeeh');
      _addCustumAddress();
    }
  };

  const getcurrentaddress = async () => {
    SimpleToast({title: 'Please wait...', isLong: true});
    const result = await _putcurrentaddress();
    // setIsLoading(true);
    if (result?.data) {
      console.log('response data->', result?.data?.message);
      SimpleToast({title: result?.data?.message, isLong: true});
      setCompleteAddress(result?.data?.result?.completeAddress);
      setIsFloor(result?.data?.result?.floor);
      setIsnearby(result?.data?.result?.nearby_landmark);
      setIsPincode(result?.data?.result?.pinCode);
      setIsState(result?.data?.result?.state);
      setIsCity(result?.data?.result?.city);
    } else {
      console.log('catch error current address:', result?.response?.data);
      SimpleToast({title: 'Server Error:', isLong: true});
    }
  };

  const _addCustumAddress = async () => {
    setIsLoading(true);
    const data = {
      completeAddress: completeAddress,
      floor: isFloor,
      nearby_landmark: isNearby,
      pinCode: isPincode,
      receiverName: isReceiveName,
      state: isState,
      city: isCity,
      saveAs: issaveas,
    };
    const result = await _manualAddress(data);
    if (result?.data) {
      console.log('response data:', result?.data);
      setIsLoading(false);
      navigation.goBack();
      SimpleToast({title: result?.data?.message, isLong: true});
    } else {
      console.log('response data:', result?.response?.data?.message);
      SimpleToast({title: 'Server Error:', isLong: true});
      setIsLoading(false);
    }
  };

  const adrSRT = [
    {
      Name: 'Home',
      _id: 1,
      lablename: 'Complete address',
    },
    {
      Name: 'Office',
      _id: 2,
      lablename: 'Office',
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 15}}>
        <Text
          style={{
            color: COLORS.BLACK,
            fontSize: fontPixel(18),
            marginHorizontal: 15,
            marginTop: 10,
          }}>
          Add a new address
        </Text>
        <TouchableOpacity
          onPress={getcurrentaddress}
          activeOpacity={0.6}
          style={{
            paddingVertical: 10,
            backgroundColor: COLORS.LIGHT_WHITE,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.GRAYDARK,
            marginHorizontal: 15,
            marginTop: 15,
            borderRadius: 4,
          }}>
          <Text
            style={{color: COLORS.GRAYDARK, fontWeight: '500', fontSize: 13}}>
            Use current Locations
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              //   borderWidth: 0.5,
              borderBottomWidth: 1,
              borderColor: COLORS.GRAY,
              width: widthPixel(180),
            }}></View>
          <Text style={{color: COLORS.GRAYDARK}}> or </Text>
          <View
            style={{
              //   borderWidth: 0.5,
              borderBottomWidth: 1,

              borderColor: COLORS.GRAY,
              width: widthPixel(180),
            }}></View>
        </View>

        <View>
          <Text
            style={{
              color: COLORS.GRAYDARK,
              paddingHorizontal: 15,
              fontSize: 13,
              paddingVertical: 10,
            }}>
            Enter complete address
          </Text>
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
                  setAdrtext(value?._id), setIssaveas(value?.lablename);
                }}
                key={index}
                style={[
                  Styles.addressbox,
                  {
                    backgroundColor:
                      adrtext === value?._id ? COLORS.GREEN : COLORS.WHITE,
                  },
                ]}>
                <Text
                  style={{
                    color: adrtext === value?._id ? COLORS.WHITE : COLORS.GREEN,
                    letterSpacing: 0.6,
                    fontSize: 13,
                  }}>
                  {value?.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            label="Flat, House no., Building, Company, Apartment"
            // label={placeholderText}
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
              borderColor: completeAddressError ? COLORS.BROWN : COLORS.GREEN,
              borderRadius: 4,
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
              borderRadius: 4,
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
              borderRadius: 4,
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
            // onBlur={fetchLocationInfo}
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
              borderRadius: 4,
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
              borderRadius: 4,
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
              borderRadius: 4,
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
              borderRadius: 4,
            }}
          />
        </View>
        <View style={{marginTop: 20}}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
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
