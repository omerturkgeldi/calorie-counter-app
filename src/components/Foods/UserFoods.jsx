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

import { setCalorieIntake, setCalorieBurned, setTotalCarb, setTotalFat, setTotalProtein } from '../../stores/calories'
import { toYesterday, toTomorrow, setToday } from '../../stores/todaysDate'


function UserFoods({ idOfTheUser }) {


    const today = useSelector(state => state.todaysDate.today)
    const calorieIntake = useSelector(state => state.calories.calorieIntake)
    const carbTotal = useSelector(state => state.calories.totalCarb)
    const fatTotal = useSelector(state => state.calories.totalFat)
    const proteinTotal = useSelector(state => state.calories.totalProtein)

    const dispatch = useDispatch()


    const [todaysCalories, setTodaysCalories] = useState();
    const [showModal, setShowModal] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState();
    const [totalFoodsCalories, setTotalFoodsCalories] = useState();


    const handleDelete = () => {

        // createdAPIEndpoint(ENDPOINTS.DAILYACTIVITIES + "/Remove/" + idToBeDeleted).delete(idToBeDeleted)
        //     .then(res => {
        //         setShowModal(false);
        //         success('Başarılı!', 'Aktivite başarıyla silindi.')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         setShowModal(false);
        //         error('Başarısız!', 'Aktivite silinemedi.')
        //     })
    }

    const handleShow = (id) => {
        setShowModal(true)
        setIdToBeDeleted(id)

    }


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

                var totalKcal = 0
                var totalCarb = 0
                var totalFat = 0
                var totalProtein = 0

                caloriesList && caloriesList.map((item) => {
                    totalKcal += Math.round((item.kcal * item.portionSize / 100))
                    totalCarb += item.carb
                    totalFat += item.fat
                    totalProtein += item.protein
                })


                dispatch(setCalorieIntake(Math.round(totalKcal.toFixed(2))));
                dispatch(setTotalCarb(Math.round(totalCarb.toFixed(2))))
                dispatch(setTotalFat(Math.round(totalFat.toFixed(2))))
                dispatch(setTotalProtein(Math.round(totalProtein.toFixed(2))))

            })
            .catch(err => console.log(err))
    }, [today])









    return (
        <>

            <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Yemek sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Bu yemeği silmek istediğinize emin misiniz?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Kapat
                    </Button>
                    <Button type="submit" variant="danger" onClick={handleDelete}
                    >
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>


            <div>


                <h3 className='mt-5 mb-2'>Yediklerim</h3>
                <hr />

                <div className='col-xl-12 col-12 p-2'>
                    {todaysCalories && todaysCalories.length != 0 ?

                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th scope="col p-3">Yemek</th>
                                    <th scope="col p-3">Miktar (gr)</th>
                                    <th scope="col p-3">Karbonhidrat</th>
                                    <th scope="col p-3">Yağ</th>
                                    <th scope="col p-3">Protein</th>
                                    <th scope="col p-3">Alınan Kalori</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {todaysCalories.map((singleCalorie) => {


                                    return (
                                        <tr key={(singleCalorie.id).toString() + (singleCalorie.type == true ? 1 : 0).toString()}>
                                            <td className='p-4'>{singleCalorie.name}</td>
                                            <td className='p-4'>{singleCalorie.portionSize}</td>
                                            <td className='p-4'>{singleCalorie.carb}</td>
                                            <td className='p-4'>{singleCalorie.fat}</td>
                                            <td className='p-4'>{singleCalorie.protein}</td>
                                            <td className='p-4'>{(singleCalorie.kcal * singleCalorie.portionSize / 100).toFixed(2)}</td>
                                            <td className='p-4'>
                                                <button className='btn'
                                                    onClick={() => handleShow(singleCalorie.id)}
                                                >
                                                    <HighlightOffIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                        : <h2 className='text-danger text-center mt-5 mb-5'>Gösterilecek yemek bulunamadı!</h2>
                    }

                    {calorieIntake && calorieIntake >= 0 ?
                        <>
                            <div className='row'>
                                <h5 className='col-md-9 text-end'>Bugün aldığınız kalori: </h5>
                                <h5 className='col-md-3 text-end'> <span className='text-danger'>{calorieIntake}</span> kcal</h5>
                            </div>

                            <div className='row'>
                                <h5 className='col-md-9 text-end'>Bugün aldığınız karbonhidrat: </h5>
                                <h5 className='col-md-3 text-end'> <span className='text-danger'>{carbTotal}</span> gr</h5>
                            </div>

                            <div className='row'>
                                <h5 className='col-md-9 text-end'>Bugün aldığınız yağ: </h5>
                                <h5 className='col-md-3 text-end'> <span className='text-danger'>{fatTotal}</span> gr</h5>
                            </div>

                            <div className='row'>
                                <h5 className='col-md-9 text-end'>Bugün aldığınız protein: </h5>
                                <h5 className='col-md-3 text-end'> <span className='text-danger'>{proteinTotal}</span> gr</h5>
                            </div>
                        </>
                        : <></>
                    }




                </div>









            </div>


        </>
    )




}

export default UserFoods
