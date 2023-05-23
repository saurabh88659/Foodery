import {
  GET_CURRENT_ADDRESS_FAILURE,
  GET_CURRENT_ADDRESS_SUCCESS,
  UPDATE_MANUAL_ADDRESS,
} from '../Action/geolocationActions';

const initialState = {
  currentAddress: '',
  manualAddress: '',
  error: '',
};

const geolocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_ADDRESS_SUCCESS:
      return {
        ...state,
        currentAddress: action.payload,
        error: '',
      };
    case GET_CURRENT_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_MANUAL_ADDRESS:
      return {
        ...state,
        manualAddress: action.payload,
      };
    default:
      return state;
  }
};

export default geolocationReducer;
