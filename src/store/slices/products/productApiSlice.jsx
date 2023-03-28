import { api } from "../../api";

export const productApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, initParams, filters, pagination, sort }) => {
        console.log(
          "🚀 ~ file: productApiSlice.jsx:17 ~ pagination:",
          pagination
        );
        const { inputVoltage, inputCapacity } = initParams || {};
        const { page, limit } = pagination || {};
        const { battType, minPrice, maxPrice } = filters || {};
        return {
          url: `products/${category}`,
          method: "GET",
          params: { inputVoltage, inputCapacity, page, limit },
        };
      },
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
