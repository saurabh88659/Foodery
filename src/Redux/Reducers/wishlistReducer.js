import {createSlice} from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      state.push(item);
    },
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
    },
  },
});
