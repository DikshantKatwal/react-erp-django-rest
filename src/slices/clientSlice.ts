/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface clientState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: clientState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const clientSlice = createSlice({
    name: 'clientSlice',
    initialState,
    reducers: {
        fetchClient: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        fetchClientForm: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        
        storeClient: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateClient: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteClient: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchClient, storeClient, fetchClientForm, updateClient, deleteClient} = clientSlice.actions
export default clientSlice.reducer