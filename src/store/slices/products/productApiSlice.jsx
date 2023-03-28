import { api } from "../../api";

export const productApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, initParams, filters, pagination, sort }) => {
        const { inputVoltage, inputCapacity } = initParams || {};
        const { page, limit } = pagination || {};
        const { battType, minPrice, maxPrice } = filters || {};
        const { sortBy, sortArrangement } = sort || {};
        return {
          url: `products/${category}`,
          method: "GET",
          params: {
            inputVoltage,
            inputCapacity,
            page,
            limit,
            sortBy,
            sortArrangement,
            battType,
            minPrice,
            maxPrice,
          },
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
