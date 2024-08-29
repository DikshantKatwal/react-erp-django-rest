import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: 0
    },
    reducers: {
        setLoading(state){
            state.isLoading += 1
        },
        decreaseLoading(state){
            state.isLoading -= 1 
        }
    }
})

export const { setLoading, decreaseLoading } = loaderSlice.actions
export default loaderSlice.reducer