// actionTypes.js
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

// actions.js
import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from './actionTypes';

export const addToWishlist = itemId => {
  return {
    type: ADD_TO_WISHLIST,
    payload: itemId,
  };
};

export const removeFromWishlist = itemId => {
  return {
    type: REMOVE_FROM_WISHLIST,
    payload: itemId,
  };
};
