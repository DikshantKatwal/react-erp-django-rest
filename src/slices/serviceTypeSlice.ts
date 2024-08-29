import { createSlice } from "@reduxjs/toolkit";

interface serviceTypeState {
    isLoading: boolean;
    service_types: any[] | null;
    error_message: string;
    message: string;
}


const initialState: serviceTypeState = {
    isLoading: false,
    service_types: null,
    error_message: '',
    message: '',
};

const serviceTypeSlice = createSlice({
    name: 'serviceTypeSlice',
    initialState,
    reducers: {
        fetchServiceTypes: (state, action) => {
            state.isLoading = false;
            state.service_types = action.payload; 
            state.error_message = '';
        },
        storeServiceType: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateServiceType: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteServiceType: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchServiceTypes, storeServiceType, updateServiceType, deleteServiceType } = serviceTypeSlice.actions
export default serviceTypeSlice.reducer