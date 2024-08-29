import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import {
  fetchEmployeeLanguage,
  fetchLanguage,
  updateEmployeeLanguage,
  storeEmployeeLanguage,
  deleteEmployeeLanguage,
} from "../../slices//employeeLangugeSlice.ts";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

export const employeeLanguageService = createApi({
  reducerPath: "employeeLanguageService",
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
    fetchEmployeeLanguage: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeLanguage/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchEmployeeLanguage(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    store: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeLanguage/store/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(storeEmployeeLanguage(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    update: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeLanguage/update/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(updateEmployeeLanguage(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    delete: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeLanguage/delete/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(deleteEmployeeLanguage(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    fetchLanguage: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/languages/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchLanguage(data));
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
  useFetchEmployeeLanguageMutation,
  useFetchLanguageMutation,
  useStoreMutation,
  useUpdateMutation,
  useDeleteMutation,
} = employeeLanguageService;
