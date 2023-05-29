// const initialState = {
//   wishlistItems: [],
// };

// const wishlistReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_WISHLIST:
//       return {
//         ...state,
//         wishlistItems: [...state.wishlistItems, action.payload],
//       };
//     case REMOVE_FROM_WISHLIST:
//       return {
//         ...state,
//         wishlistItems: state.wishlistItems.filter(
//           item => item.id !== action.payload,
//         ),
//       };
//     default:
//       return state;
//   }
// };

// export default wishlistReducer;

// import {GET_MOVIES, ADD_FAVORITE_ITEM, REMOVE_FAVORITE_ITEM} from './actions';

import {
  ADD_TO_WISHLIST,
  GET_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../constants';

const initialState = {
  item: [],
  favorites: [],
};
function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST:
      return {...state, movies: action.payload};
    case ADD_TO_WISHLIST:
      return {...state, favorites: [...state.favorites, action.payload]};
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        favorites: state.favorites.filter(
          movie => movie.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}
export default wishlistReducer;
