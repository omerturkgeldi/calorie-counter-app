import { createSlice } from "@reduxjs/toolkit";

export const calories = createSlice({
    name: 'calories',
    initialState: {
        calorieIntake: 0,
        calorieBurned: 0,
    },
    reducers: {
        setCalorieIntake: (state, action) => {
            state.calorieIntake = action.payload
        },
        setCalorieBurned: (state, action) => {
            state.calorieBurned = action.payload
        }
    }
})

export const { setCalorieIntake, setCalorieBurned } = calories.actions

export default calories.reducer