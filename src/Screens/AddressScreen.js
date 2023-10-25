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
import {fontPixel, heightPixel, widthPixel} from '../Components/Dimensions';
import {
  MAP_API_KEY,
  MaterialCommunityIconsTwo,
  OcticonsIcon,
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
  _getAddress,
  _getCurrentLocations,
} from '../utils/Handler/EpicControllers';

// import {MenuProvider} from 'react-native-popup-menu';

// import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useIsFocused} from '@react-navigation/native';
import {setAnimalAddress} from '../Redux/ReducerSlice/AddressLSlice';
import Lottie from 'lottie-react-native';

export default function AddressScreen({navigation}) {
  const [checked, setChecked] = React.useState('');

  const dispatch = useDispatch();
  const [newAddress, setNewAddress] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [isaddress, setIsadress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Locations = useSelector(state => state.locationReducer);
  const addressold = useSelector(state => state.AddressLSlice.animalAddress);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const isFocused = useIsFocused();

  // console.log('addressold------------', addressold.currentaddress);
  // const addressCurrent = useSelector(
  //   state => state.AddressLSlice.currentAddress,
  // );

  useEffect(() => {
    if (isFocused) {
      _getAddressapidata();
    }
  }, [isFocused]);

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
    setIsLoading(true);
    if (result?.data) {
      console.log('response data:', result?.data?.result[0]._id);
      setIsadress(result?.data?.result);
      setIsLoading(false);
      dispatch(
        setAnimalAddress({
          orderId: result?.data?.result[0]?._id,
        }),
      );
    } else {
      console.log('catch error:', result?.response?.data);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={Styles.CONTAINERMAIN}>
      <MyHeaderNo2
        title={'Choose Your Address'}
        onPress={() => navigation.goBack()}
      />
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('AddressScreenWithMap')}
        // onPress={handleSetCurrentAddress}
        activeOpacity={0.6}
        style={Styles.BOX}>
        <OcticonsIcon title={'plus'} size={22} IconColor={COLORS.BLUE} />
        <Text style={{color: COLORS.BLUE, paddingLeft: 10, fontWeight: '800'}}>
          Add new address
        </Text>
      </TouchableOpacity> */}

      {/* <View style={{}}> */}
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
                    <MenuTrigger
                      style={{top: 10}}
                      text={
                        <MaterialCommunityIconsTwo
                          title={'dots-vertical'}
                          size={25}
                          IconColor={COLORS.GRAYDARK}
                          style={{}}
                        />
                      }
                    />
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
                        }
                        //customStyles={'red'}
                      >
                        <Text
                          style={{paddingHorizontal: 10, color: COLORS.BLACK}}>
                          Edit address
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

              {/* <Menu>
                <MenuTrigger text="Select action" />
                <MenuOptions>
                  <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                  <MenuOption onSelect={() => alert(`Delete`)}>
                    <Text style={{color: 'red'}}>Delete</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => alert(`Not called`)}
                    disabled={true}
                    text="Disabled"
                  />
                </MenuOptions>
              </Menu> */}
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
