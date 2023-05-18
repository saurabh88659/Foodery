import {UPDATE_GEOLOCATION} from '../constants';

const initialState = {
  latitude: null,
  longitude: null,
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GEOLOCATION:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };

    default:
      return state;
  }
};

export default locationReducer;
