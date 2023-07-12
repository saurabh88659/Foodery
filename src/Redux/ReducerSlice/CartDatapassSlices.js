import {createSlice} from '@reduxjs/toolkit';

const CartDatapassSlices = createSlice({
  name: 'CartData',
  initialState: {
    cartdata: '',
  },
  reducers: {
    setCartdata: (state, action) => {
      state.cartdata = action.payload;
    },
  },
});

export const {setCartdata} = CartDatapassSlices.actions;

export default CartDatapassSlices.reducer;
