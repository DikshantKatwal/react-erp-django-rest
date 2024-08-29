import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { deleteService, storeRenewal, fetchService, storeService, updateService, fetchClient, fetchCurrency } from "../../slices/serviceSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";


export const serviceService = createApi({
    reducerPath: 'serviceService',
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
        fetchService: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/service/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchService(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        fetchClient: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/client/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchClient(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),

        fetchCurrency: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/service/fetch_currency/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchCurrency(data))
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
                url: 'api/admin/service/store/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(storeService(data))
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
                url: 'api/admin/service/update/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    console.log(data)
                    dispatch(updateService(data))
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
                url: 'api/admin/service/delete/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(deleteService(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),

        updateRenewal: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/service/renewal/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(storeRenewal(data))
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

export const { useFetchServiceMutation, useFetchClientMutation, useFetchCurrencyMutation, useStoreMutation, useUpdateRenewalMutation , useUpdateMutation, useDeleteMutation } = serviceService