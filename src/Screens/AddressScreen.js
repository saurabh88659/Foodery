import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel} from '../Components/Dimensions';
import {MAP_API_KEY, OcticonsIcon} from '../utils/Const';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentAddress} from '../Redux/ReducerSlice/AddressLSlice';
import Geocoder from 'react-native-geocoding';
// import Button from '../Components/Button';
// import {WebView} from 'react-native-webview';
import Routes from '../Navigation/Routes';
import {
  _getAddress,
  _getCurrentLocations,
} from '../utils/Handler/EpicControllers';

export default function AddressScreen({navigation}) {
  const [checked, setChecked] = React.useState('');

  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [isaddress, setIsadress] = useState([]);

  const Locations = useSelector(state => state.locationReducer);
  const addressold = useSelector(state => state.AddressLSlice.animalAddress);

  // console.log('addressold------------', addressold.currentaddress);
  // const addressCurrent = useSelector(
  //   state => state.AddressLSlice.currentAddress,
  // );

  useEffect(() => {
    // geoCoding();
    // currentloactions();
    _getAddressapidata();
  }, []);

  // const handleSetCurrentAddress = () => {
  //   dispatch(setCurrentAddress(newAddress));
  //   setNewAddress('');
  //   geoCoding();
  // };

  // const handleSetAnimalAddress = () => {
  //   dispatch(setAnimalAddress(newAddress));
  //   setNewAddress('');
  // };

  const geoCoding = async () => {
    Geocoder.init(MAP_API_KEY);
    Geocoder.from(Locations.latitude, Locations.longitude).then(json => {
      setNewAddress(
        json.results[0].formatted_address,
        // tempAddress: json.results[0].formatted_address,
      );
    });
  };

  // const handleRadioChange = value => {
  //   setSelectedValue(value);
  // };
  // const handleButtonPress = () => {
  //   setShowWebView(true);
  // };

  const _getAddressapidata = async () => {
    const result = await _getAddress();
    if (result?.data) {
      console.log('response data:', result?.data?.result);
      setIsadress(result?.data?.result);
    } else {
      console.log('catch error:', result?.data);
    }
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddressScreenWithMap')}
        // onPress={handleSetCurrentAddress}
        activeOpacity={0.6}
        style={Styles.BOX}>
        <OcticonsIcon title={'plus'} size={22} IconColor={COLORS.BLUE} />
        <Text style={{color: COLORS.BLUE, paddingLeft: 10, fontWeight: '800'}}>
          Add new address
        </Text>
      </TouchableOpacity>
      <View style={{}}>
        {/* {addressold?.compleAddress ? (
          <TouchableOpacity
            onPress={() => {
              setChecked('first');
              navigation.navigate(Routes.TAB_CART);
            }}
            activeOpacity={0.6}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            <RadioButton
              value="first"
              color={COLORS.GREEN}
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: fontPixel(18),
                paddingHorizontal: 5,
                textAlign: 'left',
              }}>
              {addressold?.compleAddress}
            </Text>
          </TouchableOpacity>
        ) : null} */}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingLeft: '35%'}}
          scrollEnabled={true}
          data={isaddress}
          renderItem={({item, index}) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setChecked('first');
                  navigation.navigate(Routes.TAB_CART);
                }}
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 15,
                }}>
                <RadioButton
                  value="first"
                  color={COLORS.GREEN}
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text
                  style={{
                    color: COLORS.BLACK,
                    fontSize: fontPixel(18),
                    paddingHorizontal: 5,
                    textAlign: 'left',
                  }}>
                  {addressold?.compleAddress}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text
            style={{
              color: COLORS.BLACK,
              fontSize: fontPixel(18),
              marginHorizontal: 5,
              textAlign: 'left',
            }}>
            {addressCurrent}
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  CONTAINERMAIN: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  BOX: {
    borderWidth: 1,
    marginVertical: heightPixel(25),
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 1,
    borderColor: COLORS.GRAYDARK,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
