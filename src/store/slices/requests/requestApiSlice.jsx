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
  }),
});

export const {
  useEditProductRequestMutation,
  useDeleteProductRequestMutation,
} = requestApiSlice;
