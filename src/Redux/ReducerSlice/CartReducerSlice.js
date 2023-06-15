import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const CartReducerSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
    discountTotalPrice: 0,
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
      if (itemInCart) {
        itemInCart.quantity++;
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

    getCartTotal: (state, action) => {
      let {totalQuantity, totalPrice, discountTotalPrice} = state.cart.reduce(
        (cartTotal, cartItem) => {
          const {productPrice, quantity, discountPrice} = cartItem;
          const itemTotal = productPrice * quantity;
          const itemTotalDis = discountPrice * quantity;
          cartTotal.discountTotalPrice += itemTotalDis;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
          discountTotalPrice: 0,
        },
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.discountTotalPrice = parseInt(discountTotalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getCartTotal,
} = CartReducerSlice.actions;

export default CartReducerSlice.reducer;
