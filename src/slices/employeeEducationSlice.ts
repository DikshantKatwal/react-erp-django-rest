/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeEducationState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeEducationState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const employeeEducationSlice = createSlice({
    name: 'employeeEducationSlice',
    initialState,
    reducers: {
        fetchEmployeeEducation: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        storeEmployeeEducation: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployeeEducation: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployeeEducation: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployeeEducation, storeEmployeeEducation, updateEmployeeEducation, deleteEmployeeEducation } = employeeEducationSlice.actions
export default employeeEducationSlice.reducer