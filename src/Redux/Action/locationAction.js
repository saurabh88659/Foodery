import {UPDATE_GEOLOCATION} from '../constants';

export const updateGeolocation = (latitude, longitude) => {
  // console.log('latitude, longitude ++++++++++DG', latitude, longitude);
  return {
    type: UPDATE_GEOLOCATION,
    payload: {latitude, longitude},
  };
};
