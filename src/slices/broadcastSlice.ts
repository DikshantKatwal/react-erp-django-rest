/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface BroadcastState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: BroadcastState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const BroadcastSlice = createSlice({
    name: 'BroadcastSlice',
    initialState,
    reducers: {
        fetchBroadcast: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storeBroadcast: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateBroadcast: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteBroadcast: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchBroadcast, storeBroadcast, updateBroadcast, deleteBroadcast } = BroadcastSlice.actions
export default BroadcastSlice.reducer