/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface EmployeeleaveState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: EmployeeleaveState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const EmployeeleaveSlice = createSlice({
    name: 'leaveSlice',
    initialState,
    reducers: {
        fetchEmployeeLeave: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storeEmployeeLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateEmployeeLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteEmployeeLeave: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchEmployeeLeave, storeEmployeeLeave, updateEmployeeLeave, deleteEmployeeLeave } = EmployeeleaveSlice.actions
export default EmployeeleaveSlice.reducer