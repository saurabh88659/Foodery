import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
import {BASE_URL} from '../../utils/Const';

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (item, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + `/User/getCart1`);
      console.log(
        'slise data----------------------------------------->>>>>>>>>',
        response.data,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        item => item._id == action.payload._id,
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        item => item._id !== action.payload._id,
      );
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        item => item._id == action.payload._id,
      );
      //   console.log('price=========DG+++', itemInCart);
      if (itemInCart) {
        itemInCart.quantity++;
        // itemInCart.productPrice = itemInCart.quantity * itemInCart.productPrice;
        // console.log('price------------------++', itemInCart.productPrice);
      }
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(
        item => item._id == action.payload._id,
      );
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cart.filter(
          item => item._id !== action.payload._id,
        );
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
  },
});

export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} =
  cartSlice.actions;

export default cartSlice.reducer;
