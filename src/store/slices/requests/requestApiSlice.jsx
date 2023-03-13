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
  }),
});

export const { useEditProductRequestMutation } = requestApiSlice;
