import { api } from "../../api";

export const productApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, initParams, filters, pagination, sort }) => {
        const { inputVoltage, inputCapacity, inputDod } = initParams || {};
        const { page, limit } = pagination || {};
        const { battType, minPrice, maxPrice, search } = filters || {};
        const { sortBy, sortArrangement } = sort || {};
        return {
          url: `products/${category}`,
          method: "GET",
          params: {
            inputVoltage,
            inputCapacity,
            inputDod,
            page,
            limit,
            sortBy,
            sortArrangement,
            search,
            battType,
            minPrice,
            maxPrice,
          },
        };
      },
    }),
    getBattery: builder.query({
      query: ({ initParams, selectedBatt }) => {
        const { inputVoltage, inputCapacity } = initParams || {};
        return {
          url: `products/battSpec/${selectedBatt}`,
          method: "GET",
          params: {
            inputVoltage,
            inputCapacity,
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

export const {
  useGetProductsQuery,
  useGetBatteryQuery,
  useCreateProductRequestMutation,
} = productApiSlice;
