/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: NotificationState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const NotificationSlice = createSlice({
    name: 'NotificationSlice',
    initialState,
    reducers: {
        fetchNotification: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storeNotification: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        storeNotificationToken: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateNotification: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteNotification: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchNotification, storeNotification, updateNotification, deleteNotification, storeNotificationToken } = NotificationSlice.actions
export default NotificationSlice.reducer