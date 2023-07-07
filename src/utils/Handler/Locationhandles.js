import {Alert, Platform, PermissionsAndroid, Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const checkLocationEnabled = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      // Location permission denied, show alert message
      Alert.alert('Location Disabled', 'Please enable location to proceed.', [
        {text: 'OK', onPress: () => handleLocationDisabled()},
      ]);
      return;
    }
  }

  Geolocation.getCurrentPosition(
    () => {
      // Location is enabled, proceed with your logic
      console.log('Location is enabled. Proceed with your logic here.');
    },
    error => {
      // Location is disabled, show alert message
      Alert.alert('Location Disabled', 'Please enable location to proceed.', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Settings', onPress: () => openLocationSettings()},
      ]);
    },
    // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  );
};

const handleLocationDisabled = () => {
  // Handle location disabled scenario
  console.log('Location is disabled. Handle accordingly.');
};

const openLocationSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

export {checkLocationEnabled};
