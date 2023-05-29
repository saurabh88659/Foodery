// import {PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS} from '../constants';

import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from '../Action/actionProfile';

// const initialState = {
//   loading: false,
//   data: null,
//   error: null,
// };

// const Profilereducer = (state = initialState, action) => {
//   switch (action.type) {
//     case PROFILE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case PROFILE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null,
//       };
//     case PROFILE_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default Profilereducer;

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const Profilereducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
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
