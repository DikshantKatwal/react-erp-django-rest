import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { CONFIG } from "../../constants";
import { fetchPermission, loginComplete, loginFailed, logout } from "../../slices/authSlice";
import { decreaseLoading, setLoading } from "../../slices/loaderSlice";
import { RootState } from "../../store"; 

export const authService = createApi({
    reducerPath: 'authService',
    baseQuery: fetchBaseQuery({
        baseUrl: CONFIG.API_URL,
        // headers: {
        //     'Content-Type': 'application/json'
        // }
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
        login: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/auth/login/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const {data} = await queryFulfilled;
                    dispatch(loginComplete(data))
                }catch (error){
                    console.log(error)
                    dispatch(loginFailed(error))
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        checkAuth: builder.query({
            query: () => ({
              url: 'api/auth/user/',
              method: 'GET'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
              try {
                const { data } = await queryFulfilled;
                if (!data) {
                    dispatch(logout());
                }
              } catch (error) {
                console.error('Error checking server auth:', error);
                dispatch(logout());
              } finally {
                dispatch(decreaseLoading());
              }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'api/auth/logout/',
                method: 'POST',
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    await queryFulfilled;
                    dispatch(logout())
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }),
        check_permission: builder.mutation({
            query: ({...payload}) => ({
                url: 'api/auth/check_permission/',
                method: 'POST',
                body: JSON.stringify({ ...payload })
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try{
                    dispatch(setLoading())
                    const { data } = await queryFulfilled;
                }catch (error){
                    console.log(error)
                }
                finally{
                    dispatch(decreaseLoading())
                }
            }
        }), 

        fetch_permission: builder.query({
            query: () => ({
              url: 'api/admin/users/get_user_permission/',
              method: 'GET'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
              try {
                const { data } = await queryFulfilled;
                dispatch(fetchPermission(data))
              } catch (error) {
                console.error('Error checking server auth:', error);
              } finally {
                dispatch(decreaseLoading());
              }
            }
        }),
    }),
})


export const { useLoginMutation, useCheckAuthQuery, useLogoutMutation, useCheck_permissionMutation, useFetch_permissionQuery} = authService