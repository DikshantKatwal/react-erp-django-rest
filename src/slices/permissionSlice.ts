/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface PermissionState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: PermissionState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const PermissionSlice = createSlice({
    name: 'PermissionSlice',
    initialState,
    reducers: {
        viewPermission: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storePermission: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updatePermission: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deletePermission: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { viewPermission, storePermission, updatePermission, deletePermission } = PermissionSlice.actions
export default PermissionSlice.reducer