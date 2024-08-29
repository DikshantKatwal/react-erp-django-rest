/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface attendance_configState {
    isLoading: boolean;
    attendance_config: any[] | null;
    error_message: string;
    message: string;
}


const initialState: attendance_configState = {
    isLoading: false,
    attendance_config: null,
    error_message: '',
    message: '',
};

const attendance_configSlice = createSlice({
    name: 'attendance_configSlice',
    initialState,
    reducers: {
        fetchAttendance_config: (state, action) => {
            state.isLoading = false;
            state.attendance_config = action.payload; 
            state.error_message = '';
        },
        storeAttendance_config: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateAttendance_config: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteAttendance_config: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchAttendance_config, storeAttendance_config, updateAttendance_config, deleteAttendance_config } = attendance_configSlice.actions
export default attendance_configSlice.reducer