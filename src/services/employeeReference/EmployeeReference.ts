import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { fetchEmployeeReference, updateEmployeeReference, storeEmployeeReference, deleteEmployeeReference } from "../../slices/employeeReferenceSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";


export const employeeReferenceService = createApi({
    reducerPath: 'employeeReferenceService',
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
        fetchEmployeeReference: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/employee/employee_detail/EmployeeReference/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchEmployeeReference(data))
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
                url: 'api/admin/employee/employee_detail/EmployeeReference/store/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(storeEmployeeReference(data))
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
                url: 'api/admin/employee/employee_detail/EmployeeReference/update/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(updateEmployeeReference(data))
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
                url: 'api/admin/employee/employee_detail/EmployeeReference/delete/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(deleteEmployeeReference(data))
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

export const { useFetchEmployeeReferenceMutation, useStoreMutation, useUpdateMutation, useDeleteMutation } = employeeReferenceService