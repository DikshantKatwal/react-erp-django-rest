/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface renewalState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: renewalState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const renewalSlice = createSlice({
    name: 'renewalSlice',
    initialState,
    reducers: {
        fetchRenewal: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        storeRenewal: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateRenewal: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteRenewal: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchRenewal, storeRenewal, updateRenewal, deleteRenewal } = renewalSlice.actions
export default renewalSlice.reducer