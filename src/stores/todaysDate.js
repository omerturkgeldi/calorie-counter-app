import { createSlice } from "@reduxjs/toolkit";

export const todaysDate = createSlice({
    name: 'todaysDate',
    initialState: {
        today: new Date().getTime(),
    },
    reducers: {
        toYesterday: state => {
            state.today = new Date(state.today - 24 * 60 * 60 * 1000).getTime()
        },
        toTomorrow: state => {
            state.today = new Date(state.today + 24 * 60 * 60 * 1000).getTime()
        },
        setToday: (state, action) => {
            state.today = new Date().getTime()
        }
    }
})

export const { toYesterday, toTomorrow, setToday } = todaysDate.actions

export default todaysDate.reducer