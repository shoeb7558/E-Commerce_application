import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      state.cartItems.push(action.payload);
    },
  },
});

export const { addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
