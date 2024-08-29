import { createSlice } from "@reduxjs/toolkit";

interface smsState {
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sms: any[] | null;
    error_message: string;
    message: string;
}


const initialState: smsState = {
    isLoading: false,
    sms: null,
    error_message: '',
    message: '',
};

const smsSlice = createSlice({
    name: 'smsSlice',
    initialState,
    reducers: {
        fetchSms: (state, action) => {
            state.isLoading = false;
            state.sms = action.payload; 
            state.error_message = '';
        },
      
    }
})

export const { fetchSms } = smsSlice.actions
export default smsSlice.reducer