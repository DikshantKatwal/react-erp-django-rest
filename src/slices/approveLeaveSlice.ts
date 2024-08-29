/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface ApproveleaveState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: ApproveleaveState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const ApproveleaveSlice = createSlice({
    name: 'leaveSlice',
    initialState,
    reducers: {
        fetchApproveLeave: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storeApproveLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateApproveLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteApproveLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchApproveLeave, storeApproveLeave, updateApproveLeave, deleteApproveLeave} = ApproveleaveSlice.actions
export default ApproveleaveSlice.reducer