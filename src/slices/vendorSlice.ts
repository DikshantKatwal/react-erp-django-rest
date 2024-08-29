/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface vendorState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: vendorState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const vendorSlice = createSlice({
    name: 'vendorSlice',
    initialState,
    reducers: {
        fetchVendor: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        fetchVendorForm: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },

        fetchInternForm: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        
        storeVendor: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateVendor: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteVendor: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchVendor, storeVendor, fetchVendorForm, updateVendor, deleteVendor} = vendorSlice.actions
export default vendorSlice.reducer