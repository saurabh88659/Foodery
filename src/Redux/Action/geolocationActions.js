import Geolocation from 'react-native-geolocation-service';
import Geocoding from 'react-native-geocoding';
// import Geolocation from '@react-native-community/geolocation';

// Initialize Geocoding with your API key
Geocoding.init('AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg');

// Action types
export const GET_CURRENT_ADDRESS_SUCCESS = 'GET_CURRENT_ADDRESS_SUCCESS';
export const GET_CURRENT_ADDRESS_FAILURE = 'GET_CURRENT_ADDRESS_FAILURE';
export const UPDATE_MANUAL_ADDRESS = 'UPDATE_MANUAL_ADDRESS';

// Action creators
export const getCurrentAddress = () => {
  return async dispatch => {
    try {
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          const response = await Geocoding.from({latitude, longitude});
          const {results} = response;
          console.log('response', response);

          if (results.length > 0) {
            const {formatted_address} = results[0];
            console.log('action', formatted_address);

            dispatch({
              type: GET_CURRENT_ADDRESS_SUCCESS,
              payload: formatted_address,
            });
          } else {
            dispatch({
              type: GET_CURRENT_ADDRESS_FAILURE,
              payload: 'No results found',
            });
          }
        },
        error => {
          dispatch({type: GET_CURRENT_ADDRESS_FAILURE, payload: error.message});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      dispatch({
        type: GET_CURRENT_ADDRESS_FAILURE,
        payload: 'Error retrieving address',
      });
    }
  };
};

export const updateManualAddress = address => {
  return {
    type: UPDATE_MANUAL_ADDRESS,
    payload: address,
  };
};
