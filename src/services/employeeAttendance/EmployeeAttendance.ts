import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import {
  fetchEmployeeAttendance,
  fetchEmployeeAttendanceSummary,
  fetchEmployeeAttendanceDaily,
  fetchApprovedLeave
} from "../../slices/employeeAttendanceSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

export const employeeAttendanceService = createApi({
  reducerPath: "employeeAttendanceService",
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
    fetchEmployeeAttendance: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee_attendance/fetch_attendance/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchEmployeeAttendance(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),

    fetchEmployeeAttendanceSummary: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee_attendance/summary/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchEmployeeAttendanceSummary(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),

    fetchApprovedLeave: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee_attendance/leave_view/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchApprovedLeave(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),


    fetchEmployeeAttendanceDaily: builder.mutation({
      query: ({ ...payload }) => ({
        url: "api/admin/employee_attendance/daily_attendance/",
        method: "POST",
        body: JSON.stringify({ ...payload }),
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading());
          const { data } = await queryFulfilled;
          dispatch(fetchEmployeeAttendanceDaily(data));
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(decreaseLoading());
        }
      },
    }),



    fetchMonths: builder.mutation({
        query: ({ ...payload }) => ({
          url: "api/admin/employee_attendance/fetch_months/",
          method: "POST",
          body: JSON.stringify({ ...payload }),
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            dispatch(setLoading());
            const { data } = await queryFulfilled;
            dispatch(fetchEmployeeAttendance(data));
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
  useFetchEmployeeAttendanceMutation, useFetchMonthsMutation, useFetchApprovedLeaveMutation
} = employeeAttendanceService;
