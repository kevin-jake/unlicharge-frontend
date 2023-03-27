import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initParams: {},
  filters: {
    limit: 5,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setInitParams: (state, action) => {
      state.initParams = action.payload;
    },
    setFilters: (state, action) => {
      console.log(
        "🚀 ~ file: productSlice.jsx:20 ~ action.payload:",
        action.payload
      );
      state.filters = action.payload;
    },
  },
});

export const { setInitParams } = productSlice.actions;

export const selectInitParams = (state) => state.product.initParams;
export const selectFilters = (state) => state.product.filters;

export default productSlice.reducer;
