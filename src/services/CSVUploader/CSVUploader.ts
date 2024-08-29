import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { storeUploader } from "../../slices/uploaderSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";

export const uploaderApi = createApi({
    reducerPath: 'uploaderApi',
    baseUrl: CONFIG.API_URL,
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),


    endpoints: (builder) => ({
        uploadCSV: builder.mutation({
            query: (file: File) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: 'api/admin/onboarding/upload_csv/',
                    method: 'POST',
                    body: formData,
                };
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                dispatch(setLoading());
                try {
                    const { data } = await queryFulfilled;
                    console.log(data)
                    dispatch(storeUploader(data));
                } catch (error) {
                    console.error('Upload failed:', error);
                } finally {
                    dispatch(decreaseLoading());
                }
            },
        }),
    }),
});

export const { useUploadCSVMutation } = uploaderApi;

