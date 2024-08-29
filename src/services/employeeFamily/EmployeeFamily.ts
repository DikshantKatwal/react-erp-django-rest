import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import {
  fetchEmployeeFamily,
  updateEmployeeFamily,
  storeEmployeeFamily,
  deleteEmployeeFamily,
} from "../../slices/employeeFamilySlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

export const employeeFamilyService = createApi({
  reducerPath: "employeeFamilyService",
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
    fetchEmployeeFamily: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeFamily/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchEmployeeFamily(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    store: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeFamily/store/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(storeEmployeeFamily(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    update: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeFamily/update/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(updateEmployeeFamily(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    delete: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeFamily/delete/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(deleteEmployeeFamily(data));
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
  useFetchEmployeeFamilyMutation,
  useStoreMutation,
  useUpdateMutation,
  useDeleteMutation,
} = employeeFamilyService;
