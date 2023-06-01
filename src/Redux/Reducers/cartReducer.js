import {ADD_ITEM, DECREMENT_ITEM, INCREMENT_ITEM} from '../Action/actionCart';
import {DECREMENT, INCREMENT} from '../constants';

// const initialState = [];

const initialState = {
  count: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case INCREMENT:
      // return state.map(item =>
      //   item._id === action.payload
      //     ? {...item, quantity: item.quantity + 1}
      //     : item,
      // );
      return {
        ...state,
        count: state.count.map(
          item.id === action.payload
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      };

    case DECREMENT:
      return state.map(item =>
        item._id === action.payload && item.quantity > 0
          ? {...item, quantity: item.quantity - 1}
          : item,
      );
    default:
      return state;
  }
};

export default cartReducer;

// import {INCREMENT, DECREMENT} from '../constants';

// const initialState = {
//   count: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'INCREMENT':

//       //   return {
//       //     ...state,
//       //     count: [...state.count, action.payload],
//       //   };

//       return {

//         ...state,
//         count: state.count.map(

//           item.id === action.payload
//             ? {...item, quantity: item.quantity + 1}
//             : item,
//         ),
//       };

//     case 'DECREMENT':
//       // return {
//       //   ...state,
//       //   count: state.count - 1,
//       // };

//       return {
//         ...state,
//         count: state.count.map(item =>
//           item.id === action.payload
//             ? {...item, quantity: item.quantity - 1}
//             : item,
//         ),
//       };
//     default:
//       return state;
//   }
// };

// export default cartReducer;
