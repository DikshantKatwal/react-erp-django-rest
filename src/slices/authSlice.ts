import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    user: any | null;
    passwordResetVerification: any | null;
    resetpassword: any | null; 
    error_message: string;
    token: any | null;
    permissions: any | null;
}

const token = localStorage.getItem('token');
const isAuthenticated = !!token;


const initialState: AuthState = {
    isAuthenticated: isAuthenticated,
    isLoading: false,
    user: null,
    passwordResetVerification: null,
    resetpassword: null,
    error_message: '',
    token: token,
    permissions: []
};

const authSLice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        clearAuth: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            state.permissions = [];
        },
        loginComplete: (state, action) => {
            state.isAuthenticated = true; 
            state.isLoading = false;
            state.user = action.payload; 
            state.passwordResetVerification = null;
            state.resetpassword = null;
            state.error_message = '';
            state.token = action.payload._token;
            localStorage.setItem('token', action.payload._token);
        },
        loginFailed: (state, action) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
            state.passwordResetVerification = null;
            state.resetpassword = null;
            state.permissions = [];
            state.error_message = action.payload.message || 'Login failed';
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.token = null;
            state.permissions = [];
            localStorage.removeItem('token');
        },
        fetchPermission: (state, action) => {
          state.permissions = action.payload
        }
    },
})

export const { loginComplete, loginFailed, logout ,fetchPermission} = authSLice.actions
export default authSLice.reducer