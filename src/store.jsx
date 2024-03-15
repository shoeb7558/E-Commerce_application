import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other reducers if any
  },
});

export default store;
