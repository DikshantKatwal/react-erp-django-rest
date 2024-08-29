/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { fetchService } from "./serviceSlice";

interface service_historiesState {
    isLoading: boolean;
    service_histories: any[] | null;
    error_message: string;
    message: string;
}


const initialState: service_historiesState = {
    isLoading: false,
    service_histories: null,
    error_message: '',
    message: '',
};

const service_historiesSlice = createSlice({
    name: 'service_historiesSlice',
    initialState,
    reducers: {
        fetchServiceHistories: (state, action) => {
            state.isLoading = false;
            state.service_histories = action.payload; 
            state.error_message = '';
        },
      
    }
})

export const { fetchServiceHistories} = service_historiesSlice.actions
export default service_historiesSlice.reducer