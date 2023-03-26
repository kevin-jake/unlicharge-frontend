import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsArray: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productsArray = action.payload.productsArray;
    },
  },
});

export const { setCategory, setProducts } = productSlice.actions;

export default productSlice.reducer;
