/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeExperienceState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeExperienceState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const employeeExperienceSlice = createSlice({
    name: 'employeeExperienceSlice',
    initialState,
    reducers: {
        fetchEmployeeExperience: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        storeEmployeeExperience: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployeeExperience: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployeeExperience: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployeeExperience, storeEmployeeExperience, updateEmployeeExperience, deleteEmployeeExperience } = employeeExperienceSlice.actions
export default employeeExperienceSlice.reducer