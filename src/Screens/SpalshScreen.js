import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import {fontPixel, heightPixel} from '../Components/Dimensions';
import Geolocation from 'react-native-geolocation-service';
import {updateGeolocation} from '../Redux/Action/locationAction';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL, MAP_API_KEY, SimpleToast} from '../utils/Const';
// import Geocoder from 'react-native-geocoding';
import {useIsFocused} from '@react-navigation/native';
import Routes from '../Navigation/Routes';
import {_getStorage} from '../utils/Storage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkInternetConnection} from '../utils/Handler/InternetInfo';
import Lottie from 'lottie-react-native';
import RNExitApp from 'react-native-exit-app';
import {fetchData} from '../Redux/RootsagaEpic';
import {
  _getAddress,
  _getCurrentLocations,
  _getProfile,
  _postcoordinates,
} from '../utils/Handler/EpicControllers';
import {
  setAnimalAddress,
  setCurrentAddress,
} from '../Redux/ReducerSlice/AddressLSlice';

export default function SpalshScreen({navigation}) {
  const IsFocused = useIsFocused();
  const dispatch = useDispatch();
  const [hasInternet, setHasInternet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const Locations = useSelector(state => state.locationReducer);
  console.log('Locations------------', Locations);

  // const {loading, data, error} = useSelector(state => state.Profilereducer);
  // console.log(
  //   'data-------------------------------->>>>>>>',
  //   data,
  //   loading,
  //   error,
  // );

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        dispatch(updateGeolocation(latitude, longitude));
      },
      error => console.log('error locations', error),
    );
  };

  useEffect(() => {
    if (IsFocused) {
      getCurrentPosition();
      // geoCoding();
    }
  }, [IsFocused]);

  // const geoCoding = async () => {
  //   Geocoder.init(MAP_API_KEY);

  //   Geocoder.from(Locations.latitude, Locations.longitude).then(json => {
  //     json.results[0].address_components.forEach((value, index) => {
  //       console.log(
  //         'hey++++++++++++++++++++++++++DG',
  //         json.results[0].formatted_address,
  //       );

  //       // setAddress(
  //       //   json.results[0].formatted_address,
  //       //   // tempAddress: json.results[0].formatted_address,
  //       // );
  //     });
  //   });
  // };

  useEffect(() => {
    _Handle_Splash();
    _getAddressapidata();
  }, []);

  useEffect(() => {
    dispatch(fetchData());
    _Coordinates();
    currentloactions();
  }, []);

  const _getAddressapidata = async () => {
    const result = await _getAddress();
    if (result?.data) {
      console.log('response data:', result?.data?.result[0]?.completeAddress);
      dispatch(setCurrentAddress(result?.data?.result[0]?.completeAddress));
    } else {
      console.log('catch error:', result?.response?.data);
      SimpleToast({title: result?.response?.data?.message, isLong: true});
    }
  };

  const _Handle_Splash = async () => {
    const token = await _getStorage('token');
    const isInternet = await checkInternetConnection();

    // const result = await _getProfile();

    if (isInternet) {
      if (token) {
        axios
          .get(BASE_URL + `/User/getProfile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(resp => {
            if (resp?.data?.result?.name || resp?.data?.result?.address) {
              navigation.replace(Routes.BOTTOM_TAB_BAR);
              // console.log('Splahs screen =========', resp?.data?.result);
            } else {
              navigation.navigate(Routes.LOG_IN_SCREEN);
              // console.log('Splahs screen =========', resp?.data?.result);
            }
          })

          .catch(async err => {
            if (err.response?.data) {
              if (err.response?.data?.message == 'You are not  user.!') {
                navigation.replace(Routes.LOG_IN_SCREEN);
              } else if (err.response.data?.message === 'Token is not valid!') {
                const resfreshToken = await AsyncStorage.getItem(
                  'refreshToken',
                );
                const userId = await AsyncStorage.getItem('user_id');

                // console.log('userId--------->>', userId);

                const SubmitDAta = {
                  refreshToken: resfreshToken,
                  user_id: userId,
                };

                //refresh token api
                // console.log('refresh token------->>', SubmitDAta);
                axios
                  .post(BASE_URL + `/User/refreshToken`, SubmitDAta)

                  .then(async res => {
                    // console.log('dablu------------------', res?.data);
                    await AsyncStorage.setItem('token', res?.data?.token);
                    await AsyncStorage.setItem(
                      'refreshToken',
                      res.data.refreshToken,
                    );

                    if (res?.data?.token) {
                      navigation.replace(Routes.BOTTOM_TAB_BAR);
                    }
                  })
                  .catch(error => {
                    console.log('errr--->>>', error?.response?.data?.message);
                    navigation.replace(Routes.BOTTOM_TAB_BAR);
                  });
              }
            }
          });
      } else {
        navigation.replace(Routes.LOG_IN_SCREEN);
      }
    } else {
      setIsLoading(false);
      setHasInternet(isInternet);
    }
  };

  const _Coordinates = async () => {
    const logtat = {
      latitude: Locations.longitude,
      longitude: Locations.latitude,
    };
    const result = await _postcoordinates(logtat);
    if (result?.data) {
      console.log('coordinates-----------', result?.data);
    } else {
      console.log('coordinates catch error--->>', result?.response?.data);
    }
  };

  const currentloactions = async () => {
    const results = await _getCurrentLocations(Locations);
    if (results?.data) {
      console.log('result---<<>>>>>', results?.data?.display_name);
      // dispatch(setAnimalAddress({currentaddress: results?.data?.display_name}));
    } else {
      console.log('result===>> catch error', results?.response?.data?.message);
    }
  };

  return (
    <SafeAreaView style={Styles.Container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={COLORS.GREEN}
        translucent={true}
      />
      {isLoading ? (
        <ImageBackground
          source={require('../Assets/Logo/splashbackgoundimage.png')}
          style={Styles.CONAINERBACKGROUND}>
          <Text style={Styles.TEXTSTYL}>
            Welcome to {`\n`} <Text style={{fontWeight: '800'}}>Grocery</Text>{' '}
            shopping
          </Text>
        </ImageBackground>
      ) : (
        !hasInternet && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.LIGHT_WHITE,
              flex: 1,
            }}>
            <Lottie
              source={require('../Assets/Lottiejson/39620-404-network.json')}
              autoPlay
              loop={true}
              style={{height: heightPixel(400), marginVertical: -30}}
            />
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: COLORS.BLACK,
                  fontSize: fontPixel(20),
                  fontWeight: '500',
                }}>
                No internet connection
              </Text>
              <Text
                style={{
                  color: COLORS.BLACK,
                  textAlign: 'center',
                  fontSize: fontPixel(18),
                  marginTop: 8,
                }}>
                Could not connect to the internet. Please check your network
              </Text>
            </View>
            <TouchableOpacity
              // onPress={() => checkInternetConnection()}
              onPress={() => RNExitApp.exitApp()}
              activeOpacity={0.6}>
              <Text
                style={{
                  color: COLORS.GREEN,
                  top: 50,
                  fontSize: 16,
                  fontWeight: '700',

                  letterSpacing: 0.6,
                }}>
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  TEXTSTYL: {
    fontSize: fontPixel(33),
    letterSpacing: 1,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  CONAINERBACKGROUND: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
