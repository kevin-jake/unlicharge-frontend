import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "battery",
  initParams: {},
  pagination: {
    limit: 5,
  },
  filters: {},
  sort: {
    sortBy: "name",
    sortArrangement: "asc",
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      if (state.category != action.payload) state.sort = initialState.sort;
      state.category = action.payload;
    },
    setInitParams: (state, action) => {
      state.initParams = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setCategory,
  setInitParams,
  setFilters,
  setPagination,
  setSort,
} = productSlice.actions;

export const selectInitParams = (state) => state.product.initParams;
export const selectFilters = (state) => state.product.filters;
export const selectPagination = (state) => state.product.pagination;
export const selectSort = (state) => state.product.sort;

export default productSlice.reducer;
