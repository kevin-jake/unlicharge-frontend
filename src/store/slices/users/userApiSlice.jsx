import { api } from "../../api";

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInformation: builder.mutation({
      query: ({ profileId, body }) => ({
        url: `/profile/${profileId}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useUpdateUserInformationMutation } = userApiSlice;
