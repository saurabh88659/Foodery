// import { ADD_ITEM, DECREMENT_ITEM, INCREMENT_ITEM } from "../Action/actionCart";

// const initialState = [];

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_ITEM:
//       return [...state, action.payload];
//     case INCREMENT_ITEM:
//       return state.map(item =>
//         item._id === action.payload
//           ? {...item, quantity: item.quantity + 1}
//           : item,
//       );
//     case DECREMENT_ITEM:
//       return state.map(item =>
//         item._id === action.payload && item.quantity > 0
//           ? {...item, quantity: item.quantity - 1}
//           : item,
//       );
//     default:
//       return state;
//   }
// };

// export default cartReducer

import {INCREMENT, DECREMENT} from '../Action/actionCart';

const initialState = {
  count: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };

    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default cartReducer;
