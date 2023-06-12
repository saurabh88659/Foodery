import {createSlice} from '@reduxjs/toolkit';

export const WishlistReducerSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
  },

  reducers: {
    addToWishlist: (state, action) => {
      const itemInWishlist = state.wishlist.find(
        item => item._id == action.payload._id,
      );
      if (itemInWishlist) {
        itemInWishlist.quantity++;
      } else {
        state.wishlist.push({...action.payload, quantity: 1});
      }
    },
    removeFromWishlist: (state, action) => {
      const removeFromwishlist = state.wishlist.filter(
        item => item._id !== action.payload._id,
      );
      state.wishlist = removeFromwishlist;
    },
  },
});

export const {addToWishlist, removeFromWishlist} = WishlistReducerSlice.actions;

export default WishlistReducerSlice.reducer;
