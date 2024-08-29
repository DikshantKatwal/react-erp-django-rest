import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { fetchSms } from "../../slices/smsSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";


export const smsService = createApi({
    reducerPath: 'smsService',
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
        fetch_sms: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/admin/sms/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(fetchSms(data))
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),


        // download_sms: builder.mutation({
        //     query: ({...payload}) => ({
        //         url: 'api/admin/sms/fetch/',
        //         method: 'POST',
        //         body: JSON.stringify({ ...payload })
        //     }),
        //     onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        //         try{
        //             dispatch(setLoading())
        //             const {data} = await queryFulfilled;
        //             dispatch(downloadSms(data))
        //         }catch (error){
        //             console.log(error)
        //         }
        //         finally{
        //             dispatch(decreaseLoading())
        //         }
        //     }
        // }),

        // update_sms: builder.mutation({
        //     query: ({...payload}) => ({
        //         url: 'api/admin/sms/update/',
        //         method: 'POST',
        //         body: JSON.stringify({ ...payload })
        //     }),
        //     onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        //         try{
        //             dispatch(setLoading())
        //             const {data} = await queryFulfilled;
        //             dispatch(updateSms(data))
        //         }catch (error){
        //             console.log(error)
        //         }
        //         finally{
        //             dispatch(decreaseLoading())
        //         }
        //     }
        // }),
        
    }),
}) 

export const { useFetch_smsMutation } = smsService