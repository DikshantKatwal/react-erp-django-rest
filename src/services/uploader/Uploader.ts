import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { fetchUploader, storeUploader, updateUploader, deleteUploader } from "../../slices/uploaderSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store";

const handleQuery = async (queryFulfilled: any, dispatch: any, successAction: any) => {
  try {
    dispatch(setLoading());
    const { data } = await queryFulfilled;
    dispatch(successAction(data));
  } catch (error) {
    console.error(error);
    // Dispatch an error action here if needed
  } finally {
    dispatch(decreaseLoading());
  }
};

export const UploaderService = createApi({
  reducerPath: "UploaderService",
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetch: builder.mutation({
      query: (payload) => ({
        url: "api/admin/broadcast/upload/",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await handleQuery(queryFulfilled, dispatch, fetchUploader);
      },
    }),
    store: builder.mutation({
      query: (payload) => ({
        url: "api/admin/broadcast/upload/",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await handleQuery(queryFulfilled, dispatch, storeUploader);
      },
    }),

    notification_store: builder.mutation({
      query: (payload) => ({
        url: "api/admin/notifications/upload/",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await handleQuery(queryFulfilled, dispatch, storeUploader);
      },
    }),


    update: builder.mutation({
      query: (payload) => ({
        url: "api/admin/uploader/update/",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await handleQuery(queryFulfilled, dispatch, updateUploader);
      },
    }),
    delete: builder.mutation({
      query: (payload) => ({
        url: "api/admin/uploader/delete/",
        method: "POST",
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await handleQuery(queryFulfilled, dispatch, deleteUploader);
      },
    }),
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
              dispatch(storeUploader(data));
          } catch (error) {
              console.error('Upload failed:', error);
          } finally {
              dispatch(decreaseLoading());
          }
      },
  }),
//   uploadCSV: builder.mutation<UploadResponse, File>({
//     query: (file) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         return {
//             url: 'api/admin/onboarding/upload_csv/',
//             method: 'POST',
//             body: formData,
//         };
//     },
//     transformResponse: (response: { data: UploadResponse }) => response.data
//    , // Adjust if necessary
// }),

  }),
});

export const {
  useFetchMutation,
  useStoreMutation,
  useUpdateMutation,
  useDeleteMutation,
  useNotification_storeMutation,
  useUploadCSVMutation
} = UploaderService;
