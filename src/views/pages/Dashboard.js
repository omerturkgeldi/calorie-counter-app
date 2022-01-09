import React from 'react'
import UserActivities from '../../components/Activities/UserActivities'
import DateSelector from '../../components/DateSelector'
import UserFoods from '../../components/Foods/UserFoods'



import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'



const Dashboard = () => {

    const totalCalorieBurned = useSelector(state => state.calories.calorieBurned)
    const totalCalorieIntake = useSelector(state => state.calories.calorieIntake)
    const dispatch = useDispatch()


    return (
        <div>
            <h2>{totalCalorieBurned}</h2>
            <h2>{totalCalorieIntake}</h2>
            <DateSelector />
            <UserActivities />
            <br></br>
            <br></br>
            <br></br>
            <UserFoods />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1>Ana Sayfa</h1>
            <br></br>
            <h3>Gün Özeti (Alınan yakılan kaloriler) </h3>
            <h3>4 öğün ve yenilenler</h3>
            <h3>Yapılan aktiviteler</h3>

        </div>
    )
}

export default Dashboard
