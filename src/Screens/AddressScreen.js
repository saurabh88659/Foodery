import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MyHeaderNo2 from '../Components/MyHeaderNo2';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {
  MAP_API_KEY,
  MaterialCommunityIconsTwo,
  OcticonsIcon,
  SimpleToast,
  wishlistempty,
} from '../utils/Const';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
// import {setCurrentAddress} from '../Redux/ReducerSlice/AddressLSlice';
import Geocoder from 'react-native-geocoding';
// import Button from '../Components/Button';
// import {WebView} from 'react-native-webview';
import Routes from '../Navigation/Routes';
import {
  _deleteaddresss,
  _getAddress,
  _getCurrentLocations,
  newAddressbyId,
} from '../utils/Handler/EpicControllers';

// import {MenuProvider} from 'react-native-popup-menu';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useIsFocused} from '@react-navigation/native';
import {
  newAddressbyid,
  setAnimalAddress,
} from '../Redux/ReducerSlice/AddressLSlice';
import Lottie from 'lottie-react-native';

export default function AddressScreen({navigation}) {
  const [checked, setChecked] = React.useState('');

  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState('');
  const [isaddress, setIsadress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Locations = useSelector(state => state.locationReducer);
  const addressold = useSelector(state => state.AddressLSlice.animalAddress);
  const isFocused = useIsFocused();
  const [refresh, setRfresh] = useState(false);

  const newAddressb = useSelector(state => state.AddressLSlice.newAddress);
  console.log('newAddressb', newAddressb?.newByid?.completeAddress);

  useEffect(() => {
    if (isFocused) {
      _getAddressapidata();
    }
  }, [isFocused]);

  const geoCoding = async () => {
    Geocoder.init(MAP_API_KEY);
    Geocoder.from(Locations.latitude, Locations.longitude).then(json => {
      setNewAddress(
        json.results[0].formatted_address,
        // tempAddress: json.results[0].formatted_address,
      );
    });
  };

  const _getAddressapidata = async () => {
    const result = await _getAddress();
    setIsLoading(true);
    if (result?.data) {
      console.log('response data:', result?.data?.result._id);
      setIsadress(result?.data?.result);
      setIsLoading(false);
    } else {
      console.log('catch error:', result?.response?.data);
      setIsLoading(false);
    }
  };

  const _removeaddress = async id => {
    const result = await _deleteaddresss(id);
    setIsLoading(true);
    if (result?.data) {
      console.log('response data:', result?.data);
      SimpleToast({title: result?.data?.message, isLong: true});
      setIsLoading(false);
    } else {
      console.log('catch remove error:', result?.response?.data?.message);
      SimpleToast({
        title: 'Server Error:',
        isLong: true,
      });
      setIsLoading(false);
    }
  };

  const newAddressShow = async id => {
    const result = await newAddressbyId(id);
    if (result?.data) {
      // console.log('result===dddddddd', result?.data?.result);
      dispatch(newAddressbyid({newByid: result?.data?.result}));
    } else {
      console.log('catch error data', result?.response?.data?.message);
    }
  };

  setTimeout(() => {
    setRfresh(false);
  }, 3000);

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.MANUAL_ADDRESS)}
        // onPress={handleSetCurrentAddress}
        activeOpacity={0.6}
        style={Styles.BOX}>
        <OcticonsIcon title={'plus'} size={22} IconColor={COLORS.BLUE} />
        <Text style={{color: COLORS.BLUE, paddingLeft: 10, fontWeight: '800'}}>
          Add new address
        </Text>
      </TouchableOpacity>

      {isLoading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: COLORS.grayWithOpacity,
          }}>
          <Lottie
            source={wishlistempty}
            autoPlay
            loop={true}
            style={{height: heightPixel(200)}}
          />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={_getAddressapidata}
              tintColor={COLORS.GREEN}
              colors={[COLORS.GREEN]}
            />
          }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          scrollEnabled={true}
          data={isaddress}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                paddingVertical: 10,
                borderWidth: 1,
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 5,
                borderColor: COLORS.GRAY,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // backgroundColor: 'red',
                  marginHorizontal: 10,
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.GREEN,
                    marginHorizontal: 30,
                    width: widthPixel(60),
                    alignItems: 'center',
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                    }}>
                    {item?.saveAs}
                  </Text>
                </View>

                <View>
                  <Menu>
                    <MenuTrigger style={{top: 10}} />
                    <MaterialCommunityIconsTwo
                      title={'dots-vertical'}
                      size={25}
                      IconColor={COLORS.GRAYDARK}
                      style={{}}></MaterialCommunityIconsTwo>
                    <MenuOptions
                      style={{
                        paddingVertical: 15,
                        borderRadius: 4,
                      }}>
                      <MenuOption
                        onSelect={() =>
                          navigation.navigate(
                            Routes.ADDRESS_SCREEN_WITH_MAP,
                            item?._id,
                          )
                        }>
                        <Text
                          style={{paddingHorizontal: 10, color: COLORS.BLACK}}>
                          Edit address
                        </Text>
                      </MenuOption>
                      <MenuOption
                        onSelect={() => {
                          _removeaddress(item?._id);
                        }}>
                        <Text
                          style={{paddingHorizontal: 10, color: COLORS.BLACK}}>
                          Remove
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setChecked(item?._id);
                  navigation.navigate(Routes.TAB_CART);
                  newAddressShow(item._id);
                  dispatch(
                    setAnimalAddress({
                      orderId: item._id,
                    }),
                  );
                }}
                activeOpacity={0.6}
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                  marginTop: 10,
                }}>
                <RadioButton
                  value={item?._id}
                  color={COLORS.GREEN}
                  status={checked === item?._id ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(item?._id)}
                />
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: COLORS.BLACK,
                        fontSize: fontPixel(15),
                        paddingHorizontal: 5,
                        // textAlign: 'left',
                        width: widthPixel(290),
                      }}>
                      {item?.completeAddress}
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: fontPixel(15),
                      paddingHorizontal: 5,
                      textAlign: 'left',
                    }}>
                    Floor: {item?.floor}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: fontPixel(15),
                      paddingHorizontal: 5,
                      textAlign: 'left',
                    }}>
                    State: {item?.state}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: fontPixel(15),
                      paddingHorizontal: 5,
                      textAlign: 'left',
                    }}>
                    State: {item?.city}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: fontPixel(15),
                      paddingHorizontal: 5,
                      // textAlign: 'left',
                      // backgroundColor: 'red',
                      flexWrap: 'wrap',
                      width: widthPixel(340),
                    }}>
                    Landmark: {item?.nearby_landmark}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontSize: fontPixel(15),
                      paddingHorizontal: 5,
                      textAlign: 'left',
                    }}>
                    Receiver Name: {item?.receiverName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

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
      {/* </View> */}
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
