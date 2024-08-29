/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeFamilyState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeFamilyState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const employeeFamilySlice = createSlice({
    name: 'employeeFamilySlice',
    initialState,
    reducers: {
        fetchEmployeeFamily: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        storeEmployeeFamily: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployeeFamily: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployeeFamily: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployeeFamily, storeEmployeeFamily, updateEmployeeFamily, deleteEmployeeFamily } = employeeFamilySlice.actions
export default employeeFamilySlice.reducer