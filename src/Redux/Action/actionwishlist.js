import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../constants';

// export const addToWishlist = item => {
//   //   console.log('hey action', item);
//   return {
//     type: ADD_TO_WISHLIST,
//     payload: item,
//   };
// };

// export const removeFromWishlist = itemId => {
//   return {
//     type: REMOVE_FROM_WISHLIST,
//     payload: itemId,
//   };
// };

export const addToWishlist = item => {
  return {
    type: ADD_TO_WISHLIST,
    payload: item,
  };
};
export const removeFromWishlist = item => {
  return {    
    type: REMOVE_FROM_WISHLIST,
    payload: item,
  };
};

// export const removeFromWishlist = item => dispatch => {
//   dispatch({
//     type: REMOVE_FROM_WISHLIST,
//     payload: item,
//   });
// };
