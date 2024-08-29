/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeLanguageState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeLanguageState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const employeeLanguageSlice = createSlice({
    name: 'employeeLanguageSlice',
    initialState,
    reducers: {
        fetchEmployeeLanguage: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        fetchLanguage: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        storeEmployeeLanguage: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployeeLanguage: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployeeLanguage: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployeeLanguage, fetchLanguage, storeEmployeeLanguage, updateEmployeeLanguage, deleteEmployeeLanguage } = employeeLanguageSlice.actions
export default employeeLanguageSlice.reducer