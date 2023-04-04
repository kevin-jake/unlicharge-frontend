import { createSlice } from "@reduxjs/toolkit";
import { areProductsCompatible } from "../../../logic/compatibilityLogic";

const initialState = {
  category: "battery",
  initParams: {},
  pagination: {
    limit: 5,
    page: 1,
  },
  filters: {},
  sort: {
    sortBy: "name",
    sortArrangement: "asc",
  },
  selection: {
    battery: {},
    bms: {},
    ab: {},
  },
  issues: {
    battery: [],
    bms: [],
    ab: [],
  },
};

export const buildSlice = createSlice({
  name: "build",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      if (state.category != action.payload) {
        state.sort = initialState.sort;
      }
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
    setSelectedProduct: (state, action) => {
      state.selection[state.category] = action.payload;
      state.issues = areProductsCompatible(
        state.selection.battery,
        state.selection.bms,
        state.selection.ab
      );
    },
    setUpdatedBatt: (state, action) => {
      state.selection.battery = action.payload;
      state.issues = areProductsCompatible(
        state.selection.battery,
        state.selection.bms,
        state.selection.ab
      );
    },
    resetSelection: (state) => {
      state.selection = initialState.selection;
      state.issues = initialState.issues;
    },
    resetSortPageFilters: (state) => {
      state = initialState;
    },
  },
});

export const {
  setCategory,
  setInitParams,
  setFilters,
  setPagination,
  setSort,
  setUpdatedBatt,
  resetSelection,
  setSelectedProduct,
  resetSortPageFilters,
} = buildSlice.actions;

export const selectCategory = (state) => state.build.category;
export const selectInitParams = (state) => state.build.initParams;
export const selectFilters = (state) => state.build.filters;
export const selectPagination = (state) => state.build.pagination;
export const selectSort = (state) => state.build.sort;
export const selectSelection = (state) => state.build.selection;
export const selectIssues = (state) => state.build.issues;

export default buildSlice.reducer;
