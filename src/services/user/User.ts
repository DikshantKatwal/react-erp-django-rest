import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { fetchUser, permissionUser } from "../../slices/userSlice";

import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

export const UserService = createApi({
  reducerPath: "UserService",
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
    fetchUser: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/auth/fetch_user/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchUser(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    permissionUser: builder.mutation({
        query: ({ ...payload }) => ({
          url: "api/auth/user/add-permission/",
          method: "POST",
          body: JSON.stringify({ ...payload }),
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            dispatch(setLoading());
            const { data } = await queryFulfilled;
            dispatch(permissionUser(data));
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
  useFetchUserMutation,
  usePermissionUserMutation
} = UserService;
