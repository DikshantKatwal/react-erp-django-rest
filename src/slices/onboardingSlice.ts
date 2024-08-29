import { createSlice } from "@reduxjs/toolkit";

interface onboardingState {
    isLoading: boolean;
    onboarding: any[] | null;
    error_message: string;
    message: string;
}


const initialState: onboardingState = {
    isLoading: false,
    onboarding: null,
    error_message: '',
    message: '',
};

const onboardingSlice = createSlice({
    name: 'onboardingSlice',
    initialState,
    reducers: {
        fetchOnboarding: (state, action) => {
            state.isLoading = false;
            state.onboarding = action.payload; 
            state.error_message = '';
        },
        storeOnboarding: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateOnboarding: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        resendOnboarding: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteOnboarding: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchOnboarding, storeOnboarding, updateOnboarding, deleteOnboarding, resendOnboarding } = onboardingSlice.actions
export default onboardingSlice.reducer