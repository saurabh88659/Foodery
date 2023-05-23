import {PROFILE_FAILURE, PROFILE_SUCCESS} from '../constants';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const Profilereducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Profilereducer;
