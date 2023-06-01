// export const ADD_ITEM = 'ADD_ITEM';
// export const INCREMENT_ITEM = 'INCREMENT_ITEM';
// export const DECREMENT_ITEM = 'DECREMENT_ITEM';

import {DECREMENT, INCREMENT} from '../constants';

// export const addItem = item => ({
//    type: ADD_ITEM,
//   payload: item,

// });

// export const incrementItem = (itemId) => ({
//   type: INCREMENT_ITEM,
//   payload: itemId,
// });

// export const decrementItem = (itemId) => ({
//   type: DECREMENT_ITEM,
//   payload: itemId,
// });

export const increment = (item) => ({
  type: INCREMENT,
  payload: item,
});

export const decrement = (item) => ({
  type: DECREMENT,
  payload: item,
});
