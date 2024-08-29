/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeReferenceState {
    isLoading: boolean;
    renewal: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeReferenceState = {
    isLoading: false,
    renewal: null,
    error_message: '',
    message: '',
};

const employeeReferenceSlice = createSlice({
    name: 'employeeReferenceSlice',
    initialState,
    reducers: {
        fetchEmployeeReference: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        storeEmployeeReference: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployeeReference: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployeeReference: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployeeReference, storeEmployeeReference, updateEmployeeReference, deleteEmployeeReference } = employeeReferenceSlice.actions
export default employeeReferenceSlice.reducer