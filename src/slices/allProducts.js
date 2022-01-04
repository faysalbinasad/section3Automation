import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState,
  reducers: {
    rentProduct(state, action) {
      const productIndexToRent = state.findIndex(p => p.id === action.payload.id);
      state[productIndexToRent] = {
        ...state[productIndexToRent],
        rent_start_time: action.payload.rent_start_time,
        rent_end_time: action.payload.rent_end_time
      };

      return state;
    },
    buyProduct(state, action) {
      const productIndexToBuy = state.findIndex(p => p.id === action.payload.id);
      state[productIndexToBuy] = { ...state[productIndexToBuy], is_bought: true };

      return state;
    },
    loadAllProducts(state, action) {
      state = action.payload;

      return state;
    },
  }
})

export const { rentProduct, buyProduct, loadAllProducts } = allProductsSlice.actions

export default allProductsSlice.reducer
