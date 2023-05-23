import {ADD_ITEM, DECREMENT_ITEM, INCREMENT_ITEM} from '../constants';

export const addItem = item => ({
  type: ADD_ITEM,
  payload: item,
});

export const incrementItem = itemId => ({
  type: INCREMENT_ITEM,
  payload: itemId,
});

export const decrementItem = itemId => ({
  type: DECREMENT_ITEM,
  payload: itemId,
});
