import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: { cartItems: [] },
};

export const ReducerSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartAddItem: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    },
    cartRemoveItem: (state, action) => {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    },
  },
});

export const { cartAddItem, cartRemoveItem } = ReducerSlice.actions;

export default ReducerSlice.reducer;
