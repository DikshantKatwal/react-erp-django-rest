/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState,
    reducers: {
        fetchEmployee: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        fetchEmployeeForm: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },

        fetchInternForm: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        
        storeEmployee: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployee: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployee: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        resendPassword: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployee, storeEmployee, fetchEmployeeForm, updateEmployee, deleteEmployee, fetchInternForm, resendPassword } = employeeSlice.actions
export default employeeSlice.reducer