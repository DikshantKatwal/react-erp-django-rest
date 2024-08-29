/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    isLoading: boolean;
    leave: any[] | null;
    error_message: string;
    message: string;
}


const initialState: UserState = {
    isLoading: false,
    leave: null,
    error_message: '',
    message: '',
};

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        fetchUser: (state, action) => {
            state.isLoading = false;
            state.leave = action.payload;
            state.error_message = '';
        },
        permissionUser: (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message
        },

    }
})

export const { fetchUser, permissionUser } = UserSlice.actions
export default UserSlice.reducer