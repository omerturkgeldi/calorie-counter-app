import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth'
import todaysDateReducer from './todaysDate'
import caloriesReducer from './calories'

export default configureStore({
    reducer: {
        auth: authReducer,
        todaysDate: todaysDateReducer,
        calories: caloriesReducer
    },
})