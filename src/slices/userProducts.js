import { createSlice } from '@reduxjs/toolkit'

import userProducts from 'testData/userProducts';

const initialState = {
  userProducts: [],
};

const userProductsSlice = createSlice({
  name: 'userProducts',
  initialState,
  reducers: {
    deleteProduct(state, action) {
      state.userProducts = state.userProducts.filter(p => p.id !== action.payload);
    },
    editProduct(state, action) {
      const productIndexToEdit = state.userProducts.findIndex(p => p.id === action.payload.id);
      state.userProducts[productIndexToEdit] = action.payload;
    },
    addProduct(state, action) {
      state.userProducts.push(action.payload);
    },
    loadProducts(state) {
      state.userProducts = userProducts;
    },
  }
})

export const { addProduct, editProduct, deleteProduct, loadProducts } = userProductsSlice.actions

export default userProductsSlice.reducer
