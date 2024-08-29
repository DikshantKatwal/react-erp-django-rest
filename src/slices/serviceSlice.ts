/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface serviceState {
    isLoading: boolean;
    service: any[] | null;
    error_message: string;
    message: string;
}


const initialState: serviceState = {
    isLoading: false,
    service: null,
    error_message: '',
    message: '',
};

const serviceSlice = createSlice({
    name: 'serviceSlice',
    initialState,
    reducers: {
        fetchClient: (state, action) => {
            state.isLoading = false;
            state.service = action.payload; 
            state.error_message = '';
        },
        fetchCurrency: (state, action) => {
            state.isLoading = false;
            state.service = action.payload; 
            state.error_message = '';
        },
        storeRenewal: (state, action) => {
            state.isLoading = false;
            state.service = action.payload; 
            state.error_message = '';
        },

        fetchService: (state, action) => {
            state.isLoading = false;
            state.service = action.payload; 
            state.error_message = '';
        },
        storeService: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateService: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteService: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const {fetchClient, fetchCurrency,  fetchService, storeRenewal,  storeService, updateService, deleteService } = serviceSlice.actions
export default serviceSlice.reducer