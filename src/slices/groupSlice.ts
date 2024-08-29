/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface GroupState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: GroupState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const GroupSlice = createSlice({
    name: 'GroupSlice',
    initialState,
    reducers: {
        fetchGroup: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload; 
            state.error_message = '';
        },
        storeGroup: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        updateGroup: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        deleteGroup: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
        permissionGroup: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },
    }
})

export const { fetchGroup, storeGroup, updateGroup, deleteGroup, permissionGroup } = GroupSlice.actions
export default GroupSlice.reducer