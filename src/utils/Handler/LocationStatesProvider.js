import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from 'react-native-geolocation-service';
import {AppState, PermissionsAndroid} from 'react-native';

export const AppStatesContext = createContext();

const LocationStatesProvider = ({children}) => {
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(false);

  const [locationCoords, setLocationCoords] = useState({
    latitude: '',
    longitude: '',
  });

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      console.log('GET NETWORK STATE in context', state);
      setIsNetworkAvailable(state.isConnected);
    });
    getLocation();

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsNetworkAvailable(state.isConnected);
    });

    //Subscribe to app state updates
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    // Unsubscribe from network state updates
    return () => {
      unsubscribe();
      subscription.remove();
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        getOneTimeLocation();
        subscribeLocationLocation();
      }
    });
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Position', position);
        setLocationCoords({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationCoords({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <AppStatesContext.Provider
      value={{isNetworkAvailable, locationCoords, appStateVisible}}>
      {children}
    </AppStatesContext.Provider>
  );
};

export const useAppStates = () => useContext(AppStatesContext);

export default LocationStatesProvider;
