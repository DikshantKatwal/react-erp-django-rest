import { createSlice } from "@reduxjs/toolkit";

interface templateState {
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    templates: any[] | null;
    error_message: string;
    message: string;
}


const initialState: templateState = {
    isLoading: false,
    templates: null,
    error_message: '',
    message: '',
};

const templateSlice = createSlice({
    name: 'templateSlice',
    initialState,
    reducers: {
        fetchTemplate: (state, action) => {
            state.isLoading = false;
            state.templates = action.payload; 
            state.error_message = '';
        },
        storeTemplate: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateTemplate: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        downloadTemplate: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchTemplate, storeTemplate, updateTemplate, downloadTemplate } = templateSlice.actions
export default templateSlice.reducer