import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useState } from 'react';
import { useEffect } from 'react';
import { createdAPIEndpoint, ENDPOINTS } from '../../api/dailyCalorieIntakes'
import { Modal, Button } from 'react-bootstrap';
import { success, warn, info, error } from 'tata-js/src/tata'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'



function FriendsAndUserFoods({ idOfTheUser }) {


    const today = useSelector(state => state.todaysDate.today)

    const dispatch = useDispatch()


    const [todaysCalories, setTodaysCalories] = useState();


    var totalKcal = 0
    var totalCarb = 0
    var totalFat = 0
    var totalProtein = 0

    useEffect(() => {

        let myProps = {
            id: idOfTheUser,
            date: new Date(today).toJSON(),
        }
        createdAPIEndpoint(ENDPOINTS.DAILYPRODUCTS + "/SearchByUserAndDate").fetchByDateAndUserId(myProps)
            .then(res => {
                let caloriesList = res.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    userId: item.userId,
                    kcal: item.kcal,
                    barcodeNo: item.barcodeNo,
                    carb: item.carb,
                    protein: item.protein,
                    fat: item.fat,
                    portionSize: item.portionSize,
                    intakeType: item.intakeType,
                    date: item.date
                }));
                setTodaysCalories(caloriesList)



            })
            .catch(err => console.log(err))
    }, [today])










    return (
        <>

            <div>


                <h3 className='mt-5 mb-2'>Yenilenler</h3>
                <hr />

                <div className='col-xl-12 col-12 p-2'>
                    {todaysCalories && todaysCalories.length != 0 ?

                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th scope="col p-3">Yemek</th>
                                    <th scope="col p-3">Miktar (gr)</th>
                                    <th scope="col p-3">Alınan Kalori</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todaysCalories.map((singleCalorie) => {
                                    totalKcal += parseInt((singleCalorie.kcal * singleCalorie.portionSize / 100).toFixed(2))

                                    return (
                                        <tr key={(singleCalorie.id).toString() + (singleCalorie.type == true ? 1 : 0).toString()}>
                                            <td className='p-4'>{singleCalorie.name}</td>
                                            <td className='p-4'>{singleCalorie.portionSize}</td>
                                            <td className='p-4'>{(singleCalorie.kcal * singleCalorie.portionSize / 100).toFixed(2)}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                        : <h2 className='text-danger text-center mt-5 mb-5'>Gösterilecek yemek bulunamadı!</h2>
                    }



                    {todaysCalories && todaysCalories.length != 0 ?
                        <>
                            <div className='row'>
                                <h5 className='col-md-9 text-end'>Toplam alınan kalori: </h5>
                                <h5 className='col-md-3 text-end'> <span className='text-danger'>{totalKcal}</span> kcal</h5>
                            </div>
                        </>
                        : <></>
                    }




                </div>



            </div>


        </>
    )
}

export default FriendsAndUserFoods
