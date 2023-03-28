import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      console.log(
        "🚀 ~ file: productSlice.jsx:30 ~ action.payload:",
        action.payload
      );
      state.sort = action.payload;
    },
  },
});

export const { setInitParams, setFilters, setPagination, setSort } =
  productSlice.actions;

export const selectInitParams = (state) => state.product.initParams;
export const selectFilters = (state) => state.product.filters;
export const selectPagination = (state) => state.product.pagination;
export const selectSort = (state) => state.product.sort;

export default productSlice.reducer;
