import {ADD_ITEM, DECREMENT_ITEM, INCREMENT_ITEM} from '../constants';

const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case INCREMENT_ITEM:
      return state.map(item =>
        item.id === action.payload
          ? {...item, quantity: item.quantity + 1}
          : item,
      );
    case DECREMENT_ITEM:
      return state.map(item =>
        item.id === action.payload && item.quantity > 0
          ? {...item, quantity: item.quantity - 1}
          : item,
      );
    default:
      return state;
  }
};

export default cartReducer;
