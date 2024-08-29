import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { fetchEmployeeQualification, updateEmployeeQualification, storeEmployeeQualification, deleteEmployeeQualification } from "../../slices/employeeQualificationSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";


export const employeeQualificationService = createApi({
    reducerPath: 'employeeQualificationService',
    baseQuery: fetchBaseQuery({
        baseUrl: CONFIG.API_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');
            const token = (getState() as RootState).authSlice.token;
            if (token) {
                headers.set('Authorization', `Token ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        fetchEmployeeQualification: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/employee/employee_detail/EmployeeQualification/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchEmployeeQualification(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        store: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/employee/employee_detail/EmployeeQualification/store/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(storeEmployeeQualification(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        update: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/employee/employee_detail/EmployeeQualification/update/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(updateEmployeeQualification(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        delete: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/employee/employee_detail/EmployeeQualification/delete/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(deleteEmployeeQualification(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
    }),
}) 

export const { useFetchEmployeeQualificationMutation, useStoreMutation, useUpdateMutation, useDeleteMutation } = employeeQualificationService