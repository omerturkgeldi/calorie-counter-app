import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { useEffect } from 'react';
import { createdAPIEndpoint, ENDPOINTS } from '../../api/dailyActivities'
import { Modal, Button } from 'react-bootstrap';
import { success, warn, info, error } from 'tata-js/src/tata'



import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setCalorieBurned } from '../../stores/calories';



function FriendsAndUserActivities({ idOfTheUser }) {

    const today = useSelector(state => state.todaysDate.today)
    const calorieBurned = useSelector(state => state.calories.calorieBurned)
    const dispatch = useDispatch()

    var totalBurnedCalories = 0;

    var totalKcalBurned = 0
    const [todaysActivities, setTodaysActivities] = useState();



    useEffect(() => {

        let myProps = {
            id: idOfTheUser,
            date: new Date(today).toJSON(),
        }
        createdAPIEndpoint(ENDPOINTS.DAILYACTIVITIES + "/SearchByUserAndDate").fetchByDateAndUserId(myProps)
            .then(res => {
                let activityList = res.data.map(item => ({
                    id: item.id,
                    activityId: item.activityId,
                    minutes: item.minutes,
                    date: item.date,
                    userId: item.userId,
                    specificMotion: item.specificMotion,
                    weight: item.weight,
                    metValue: item.metValue
                }));


                setTodaysActivities(activityList)
            })
            .catch(err => console.log(err))
    }, [today])



    return (
        <>
            <div>

                <h3 className='mt-5 mb-2'>Aktiviteler</h3>
                <hr />


                <div className='col-xl-12 col-12 p-2'>
                    {todaysActivities && todaysActivities.length != 0 ?
                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th scope="col p-3">Aktivite</th>
                                    <th scope="col p-3">Süre (dk)</th>
                                    <th scope="col p-3">Yakılan Kalori</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todaysActivities.map((singleActivity) => {

                                    var burnedCalories = ((singleActivity.metValue * 3.5 * singleActivity.weight) / 200 * singleActivity.minutes).toFixed(2);
                                    totalBurnedCalories += parseInt(burnedCalories);

                                    return (
                                        <tr key={singleActivity.id + (isNaN(parseInt(singleActivity.type)) ? 0 : parseInt(singleActivity.type))}>
                                            <td className='p-4'>{singleActivity.specificMotion}</td>
                                            <td className='p-4'>{singleActivity.minutes} dk</td>
                                            <td className='p-4'>{burnedCalories}  kcal</td>
                                        </tr>
                                    )

                                })}
                            </tbody>

                        </table>
                        : <h2 className='text-danger text-center mt-5 mb-5'>Aktivite Bulunamadı!</h2>}

                    {totalBurnedCalories && totalBurnedCalories >= 0 ?
                        <div className='row'>
                            <h5 className='col-md-9 text-end'>Bugün yakılan kalori: </h5>
                            <h5 className='col-md-3 text-end'> <span className='text-danger'>{totalBurnedCalories}</span> kcal</h5>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default FriendsAndUserActivities
