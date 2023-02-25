import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const ReducerSlice = createSlice({
  name: 'cart2',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      return {
        products: action.payload,
      };
    },
    deleteProduct: (state, action) => {
      return {
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    },
  },
});

export const { getProducts, deleteProduct } = ReducerSlice.actions;

export default ReducerSlice.reducer;
