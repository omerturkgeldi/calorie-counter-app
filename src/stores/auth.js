import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
    name: 'auth',
    initialState: {
        userId: "ed3e6bea-fd43-4323-8d9c-1d8d848eb3ed",
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        setUserId: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { increment, decrement, setUserId } = auth.actions

export default auth.reducer