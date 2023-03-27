import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initParams: {},
  pagination: {
    limit: 5,
  },
  filters: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setInitParams: (state, action) => {
      state.initParams = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const { setInitParams, setFilters, setPagination } =
  productSlice.actions;

export const selectInitParams = (state) => state.product.initParams;
export const selectFilters = (state) => state.product.filters;
export const selectPagination = (state) => state.product.pagination;

export default productSlice.reducer;
