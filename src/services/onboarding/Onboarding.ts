import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { deleteOnboarding, fetchOnboarding, storeOnboarding, updateOnboarding } from "../../slices/onboardingSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";


export const onboardingService = createApi({
    reducerPath: 'onboardingService',
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
        fetchOnboarding: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/onboarding/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchOnboarding(data))
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
                url: 'api/admin/onboarding/store/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(storeOnboarding(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        store_bulk: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/onboarding/store_bulk/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(storeOnboarding(data))
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
                url: 'api/admin/onboarding/update/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(updateOnboarding(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        resend: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/onboarding/resend/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(updateOnboarding(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        downloadCSV: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/onboarding/download_template/',
                method: 'POST',
                body: JSON.stringify({ ...payload }),
                responseHandler: (response) => response.blob(), // Expecting blob response
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading());
                    const { data } = await queryFulfilled;
                    const blob = new Blob([data], { type: 'text/csv' });
                    const link = document.createElement('a');
                    link.download = 'template.csv';
                    link.href = window.URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                } catch (error) {
                    console.log(error);
                } finally {
                    dispatch(decreaseLoading());
                }
            }
        }),
        delete: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/onboarding/delete/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                    dispatch(deleteOnboarding(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        // uploadCSV: builder.mutation({
        //     query: (file) => {
        //         const formData = new FormData();
        //         formData.append('file', file);
        //         return {
        //             url: 'api/admin/onboarding/upload_csv/',
        //             method: 'POST',
        //             body: formData, // FormData will handle the Content-Type
        //         };
        //     },
        //     onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        //         try {
        //             dispatch(setLoading());
        //             const { data } = await queryFulfilled;
        //             // Handle data if needed
        //         } catch (error) {
        //             console.error('Upload failed:', error);
        //         } finally {
        //             dispatch(decreaseLoading());
        //         }
        //     },
        // }),
        
    }),
}) 

export const {useFetchOnboardingMutation,useStore_bulkMutation,  useStoreMutation, useUpdateMutation, useResendMutation, useDeleteMutation, useDownloadCSVMutation  } = onboardingService