import { createSlice } from "@reduxjs/toolkit";

export const calories = createSlice({
    name: 'calories',
    initialState: {
        calorieIntake: 0,
        calorieBurned: 0,
        totalCarb: 0,
        totalFat: 0,
        totalProtein: 0
    },
    reducers: {
        setCalorieIntake: (state, action) => {
            state.calorieIntake = action.payload
        },
        setCalorieBurned: (state, action) => {
            state.calorieBurned = action.payload
        },
        setTotalCarb: (state, action) => {
            state.totalCarb = action.payload
        },
        setTotalFat: (state, action) => {
            state.totalFat = action.payload
        },
        setTotalProtein: (state, action) => {
            state.totalProtein = action.payload
        }
    }
})

export const { setCalorieIntake, setCalorieBurned, setTotalCarb, setTotalFat, setTotalProtein } = calories.actions

export default calories.reducer