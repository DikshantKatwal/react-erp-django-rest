/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeQualificationState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeQualificationState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const employeeQualificationSlice = createSlice({
    name: 'employeeQualificationSlice',
    initialState,
    reducers: {
        fetchEmployeeQualification: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        storeEmployeeQualification: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployeeQualification: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployeeQualification: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployeeQualification, storeEmployeeQualification, updateEmployeeQualification, deleteEmployeeQualification } = employeeQualificationSlice.actions
export default employeeQualificationSlice.reducer