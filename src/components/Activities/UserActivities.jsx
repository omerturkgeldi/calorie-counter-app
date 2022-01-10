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


function UserActivities() {


    const today = useSelector(state => state.todaysDate.today)
    const calorieBurned = useSelector(state => state.calories.calorieBurned)
    const dispatch = useDispatch()



    var totalBurnedCalories = 0;

    const [todaysActivities, setTodaysActivities] = useState();
    const [showModal, setShowModal] = useState(false);
    const [idToBeDeleted, setIdToBeDeleted] = useState();

    const handleDelete = () => {

        createdAPIEndpoint(ENDPOINTS.DAILYACTIVITIES + "/Remove/" + idToBeDeleted).delete(idToBeDeleted)
            .then(res => {
                setShowModal(false);
                success('Başarılı!', 'Aktivite başarıyla silindi.')
            })
            .catch(err => {
                console.log(err)
                setShowModal(false);
                error('Başarısız!', 'Aktivite silinemedi.')
            })
    }


    const handleShow = (id) => {
        setShowModal(true)
        setIdToBeDeleted(id)

    }


    // const navigateToYesterday = () => {
    //     setToday(new Date(today - 24 * 60 * 60 * 1000).getTime())
    // }

    // const navigateToTomorrow = () => {
    //     setToday(new Date(today + 24 * 60 * 60 * 1000).getTime())
    // }




    useEffect(() => {

        let myProps = {
            id: "ed3e6bea-fd43-4323-8d9c-1d8d848eb3ed",
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

                var totalKcalBurned = 0

                activityList && activityList.map((item) => {
                    totalKcalBurned += Math.round(((item.metValue * 3.5 * item.weight) / 200 * item.minutes).toFixed(2))
                })

                dispatch(setCalorieBurned(Math.round(totalKcalBurned.toFixed(2))));

                setTodaysActivities(activityList)
            })
            .catch(err => console.log(err))
    }, [today])



    return (

        <>

            <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Aktivite sil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Bu aktiviteyi silmek istediğinize emin misiniz?</h5>
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



                <h1>Günün aktiviteleri</h1>


                <div className='col-xl-12 col-12 p-2'>
                    {todaysActivities && todaysActivities.length != 0 ?
                        <table className="table table-striped mt-4">
                            <thead>
                                <tr>
                                    <th scope="col p-3">Aktivite</th>
                                    <th scope="col p-3">Süre (dk)</th>
                                    <th scope="col p-3">Yakılan Kalori</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {todaysActivities.map((singleActivity) => {

                                    var burnedCalories = ((singleActivity.metValue * 3.5 * singleActivity.weight) / 200 * singleActivity.minutes).toFixed(2);
                                    totalBurnedCalories += parseFloat(burnedCalories);

                                    return (
                                        <tr key={singleActivity.id + (isNaN(parseInt(singleActivity.type)) ? 0 : parseInt(singleActivity.type))}>
                                            <td className='p-4'>{singleActivity.specificMotion}</td>
                                            <td className='p-4'>{singleActivity.minutes} dk</td>
                                            <td className='p-4'>{burnedCalories}  kcal</td>
                                            <td className='p-4'>
                                                <button className='btn'
                                                    onClick={() => handleShow(singleActivity.id)}
                                                >
                                                    <HighlightOffIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                })}
                            </tbody>

                        </table>
                        : <h2 className='text-danger text-center mt-5 mb-5'>Aktivite Bulunamadı!</h2>}

                    {totalBurnedCalories && totalBurnedCalories >= 0 ?
                        <div className='row'>
                            <h5 className='col-md-9 text-end'>Bugün yakılan kalori: </h5>
                            <h5 className='col-md-3 text-end'> <span className='text-danger'>{calorieBurned}</span> kcal</h5>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default UserActivities
