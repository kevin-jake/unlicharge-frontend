import { api } from "../../api";

export const requestApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    editProductRequest: builder.mutation({
      query: ({ category, id, specs }) => ({
        url: `requests/${category}/${id}/edit`,
        method: "POST",
        body: specs,
      }),
    }),
    deleteProductRequest: builder.mutation({
      query: ({ category, id, deleteBody }) => ({
        url: `requests/${category}/${id}/delete`,
        method: "POST",
        body: deleteBody,
      }),
    }),
    getRequests: builder.query({
      query: ({ category, request }) => `requests/${category}/${request}`,
    }),
  }),
});

export const {
  useEditProductRequestMutation,
  useDeleteProductRequestMutation,
  useGetRequestsQuery,
} = requestApiSlice;
