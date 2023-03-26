import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initParams: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setInitParams: (state, action) => {
      state.productsArray = action.payload.initParams;
    },
  },
});

export const { setInitParams } = productSlice.actions;

export const selectInitParams = (state) => state.product.initParams;

export default productSlice.reducer;
