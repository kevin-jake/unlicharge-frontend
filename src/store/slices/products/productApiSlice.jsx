import { api } from "../../api";

export const productApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, initParams, filters, pagination }) => ({
        url: `products/${category}`,
        method: "GET",
        params: { initParams, filters, pagination },
      }),
    }),
    createProductRequest: builder.mutation({
      query: ({ category, specs }) => ({
        url: `products/${category}`,
        method: "POST",
        body: specs,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductRequestMutation } =
  productApiSlice;
