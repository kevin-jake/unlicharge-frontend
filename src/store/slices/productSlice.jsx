import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "Battery",
  productsArray: [],
  productSpecs: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setProducts: (state, action) => {
      state.productsArray = action.payload.productsArray;
    },
  },
});

export const { setCategory, setProducts } = productSlice.actions;
export default productSlice.reducer;
