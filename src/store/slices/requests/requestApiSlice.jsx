import { api } from "../../api";

export const requestApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    editProductRequest: builder.mutation({
      query: ({ category, productId, specs }) => ({
        url: `requests/${category}/${productId}/edit`,
        method: "POST",
        body: specs,
      }),
    }),
    deleteProductRequest: builder.mutation({
      query: ({ category, productId, deleteBody }) => ({
        url: `requests/${category}/${productId}/delete`,
        method: "POST",
        body: deleteBody,
      }),
    }),
    processRequest: builder.mutation({
      query: ({ category, productId, request, requestBody, decision }) => ({
        url: `requests/${category}/${productId}/${request}/${decision}`,
        method: "POST",
        body: requestBody,
      }),
    }),
    getRequests: builder.query({
      query: ({ category, request, filters }) => ({
        url: `requests/${category}/${request}`,
        method: "GET",
        params: filters,
      }),
    }),
  }),
});

export const {
  useEditProductRequestMutation,
  useDeleteProductRequestMutation,
  useProcessRequestMutation,
  useGetRequestsQuery,
} = requestApiSlice;
