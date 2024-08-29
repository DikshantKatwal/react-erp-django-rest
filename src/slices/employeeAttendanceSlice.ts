/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface employeeAttendanceState {
    isLoading: boolean;
    renewal: any[] | null;
    months: any[] | null;
    error_message: string;
    message: string;
}


const initialState: employeeAttendanceState = {
    isLoading: false,
    renewal: null,
    months: null,
    error_message: '',
    message: '',
};

const employeeAttendanceSlice = createSlice({
    name: 'employeeAttendanceSlice',
    initialState,
    reducers: {
        fetchEmployeeAttendance: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },

        fetchEmployeeAttendanceSummary: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },

        fetchEmployeeAttendanceDaily: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
        fetchMonth: (state, action) => {
            state.isLoading = false;
            state.months = action.payload; 
            state.error_message = '';
        },
        fetchApprovedLeave: (state, action) => {
            state.isLoading = false;
            state.renewal = action.payload; 
            state.error_message = '';
        },
    }
})

export const { fetchEmployeeAttendance, fetchMonth, fetchEmployeeAttendanceSummary, fetchEmployeeAttendanceDaily, fetchApprovedLeave} = employeeAttendanceSlice.actions
export default employeeAttendanceSlice.reducer