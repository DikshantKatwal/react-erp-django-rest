import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { viewPermission } from "../../slices/permissionSlice";

import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

export const PermissionsService = createApi({
  reducerPath: "PermissionsService",
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.API_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    view: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/auth/roles/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(viewPermission(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    
  }),
});

export const {
  useViewMutation
} = PermissionsService;
