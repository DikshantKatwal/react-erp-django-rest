import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import {
  deleteHoliday,
  fetchHoliday,
  storeHoliday,
  updateHoliday,
  ADtoBS,
} from "../../slices/holidaySlice";


import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

export const HolidayService = createApi({
  reducerPath: "HolidayService",
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
    fetch: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/holiday/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchHoliday(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    store: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/holiday/store/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(storeHoliday(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    update: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/holiday/update/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(updateHoliday(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    delete: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/holiday/delete/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(deleteHoliday(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),

    adtobs: builder.mutation({
        query: ({ ...payload }) => ({
          url: "api/admin/holiday/ad_to_bs/",
          method: "POST",
          body: JSON.stringify({ ...payload }),
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            dispatch(setLoading());
            const { data } = await queryFulfilled;
            dispatch(ADtoBS(data));
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
  useFetchMutation,
  useStoreMutation,
  useUpdateMutation,
  useDeleteMutation,
  useAdtobsMutation,
} = HolidayService;
