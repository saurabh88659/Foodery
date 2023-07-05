import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel} from '../Components/Dimensions';
import {MAP_API_KEY, OcticonsIcon} from '../utils/Const';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentAddress} from '../Redux/ReducerSlice/AddressLSlice';
import Geocoder from 'react-native-geocoding';

export default function AddressScreen({navigation}) {
  const [checked, setChecked] = React.useState('first');
  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState('');
  const Locations = useSelector(state => state.locationReducer);
  const addressCurrent = useSelector(
    state => state.AddressLSlice.currentAddress,
  );
  console.log('addressCurrent==============>>>>>', addressCurrent);

  useEffect(() => {
    geoCoding();
  }, []);

  const handleSetCurrentAddress = () => {
    dispatch(setCurrentAddress(newAddress));
    setNewAddress('');
    geoCoding();
  };

  const handleSetAnimalAddress = () => {
    dispatch(setAnimalAddress(newAddress));
    setNewAddress('');
  };

  const geoCoding = async () => {
    Geocoder.init(MAP_API_KEY);
    Geocoder.from(Locations.latitude, Locations.longitude).then(json => {
      setNewAddress(
        json.results[0].formatted_address,
        // tempAddress: json.results[0].formatted_address,
      );
    });
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <RadioButton
            value="first"
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
            Noida sector 62 Noida sector 62Noida sector sector 62Noida sector
          </Text>
        </View>

        <View
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
            Noida sector 62 Noida sector 62Noida sector sector 62Noida sector
          </Text>
        </View>
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
