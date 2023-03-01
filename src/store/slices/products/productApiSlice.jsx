import { api } from "../../api";

export const productApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (category) => `products/${category}`,
    }),
  }),
});

export const { useGetProductsQuery } = productApiSlice;
