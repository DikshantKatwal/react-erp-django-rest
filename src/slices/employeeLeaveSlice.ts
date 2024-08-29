/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface leaveState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: leaveState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const leaveSlice = createSlice({
    name: 'leaveSlice',
    initialState,
    reducers: {
        fetchLeave: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storeLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchLeave, storeLeave, updateLeave, deleteLeave } = leaveSlice.actions
export default leaveSlice.reducer