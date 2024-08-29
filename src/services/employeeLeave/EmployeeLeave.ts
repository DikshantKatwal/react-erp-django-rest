import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { deleteLeave, fetchLeave, storeLeave, updateLeave } from "../../slices/employeeLeaveSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";


export const leaveService = createApi({
    reducerPath: 'leaveService',
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
        fetch_leave: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/employee_leave/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchLeave(data))
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
                url: 'api/admin/employee_leave/store/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(storeLeave(data))
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
                url: 'api/admin/employee_leave/update/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(updateLeave(data))
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
                url: 'api/admin/employee_leave/delete/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(deleteLeave(data))
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

export const { useFetch_leaveMutation, useStoreMutation, useUpdateMutation, useDeleteMutation } = leaveService