import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import {
  fetchEmployeeEducation,
  updateEmployeeEducation,
  storeEmployeeEducation,
  deleteEmployeeEducation,
} from "../../slices/employeeEducationSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

export const employeeEducationService = createApi({
  reducerPath: "employeeEducationService",
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
    fetchEmployeeEducation: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeEducation/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchEmployeeEducation(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    store: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeEducation/store/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(storeEmployeeEducation(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    update: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeEducation/update/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(updateEmployeeEducation(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),
    delete: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee/employee_detail/EmployeeEducation/delete/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(deleteEmployeeEducation(data));
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
  useFetchEmployeeEducationMutation,
  useStoreMutation,
  useUpdateMutation,
  useDeleteMutation,
} = employeeEducationService;
