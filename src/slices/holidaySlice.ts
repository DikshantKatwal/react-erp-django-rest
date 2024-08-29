/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface HolidayState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: HolidayState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const HolidaySlice = createSlice({
    name: 'HolidaySlice',
    initialState,
    reducers: {
        fetchHoliday: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storeHoliday: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateHoliday: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteHoliday: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        ADtoBS: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchHoliday, storeHoliday, updateHoliday, deleteHoliday, ADtoBS } = HolidaySlice.actions
export default HolidaySlice.reducer