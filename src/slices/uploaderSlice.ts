import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uploaderState {
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploader: any[] | null;
    error_message: string;
    message: string;
}


const initialState: uploaderState = {
    isLoading: false,
    uploader: null,
    error_message: '',
    message: '',
};

const uploaderSlice = createSlice({
    name: 'uploaderSlice',
    initialState,
    reducers: {
        fetchUploader: (state, action) => {
            state.isLoading = false;
            state.uploader = action.payload; 
            state.error_message = '';
        },
        storeUploader: (state, action: PayloadAction<{ message: string }>) => {
            state.isLoading = false;
            state.message = action.payload.message;
        },
        updateUploader: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteUploader: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchUploader, storeUploader, updateUploader, deleteUploader } = uploaderSlice.actions
export default uploaderSlice.reducer