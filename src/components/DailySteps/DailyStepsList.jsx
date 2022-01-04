import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from '../Products/UpdateProductForm';


function DailyStepsList() {


    const [dailySteps, setDailySteps] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.DAILYSTEPS).fetchAll()
            .then(res => {
                let dailyStepsList = res.data.map(item => ({
                    id: item.id,
                    userId: item.userId,
                    totalSteps: item.totalSteps,
                    date: item.date,
                }));
                setDailySteps(dailyStepsList)

            })
            .catch(err => console.log(err))
        console.log(dailySteps)
    }, [])


    return (
        <div className="container mb-5">
            <h1 className="mb-5">Günlük Adım Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Kullanıcı ID</th>
                        <th scope="col">Toplam Adım</th>
                        <th scope="col">Tarih</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {dailySteps && dailySteps.map((dailyStep, index) => {
                        return (
                            <tr key={dailyStep.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{dailyStep.userId}</td>
                                <td>{dailyStep.totalSteps}</td>
                                <td>{dailyStep.date}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.DAILYSTEPS).fetchById(dailyStep.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("Günlük Adım Bilgisi Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.DAILYSTEPS).delete(dailyStep.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Günlük Adım Bilgisi  başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Günlük Adım Bilgisi  silinemedi.')
                                        })} >
                                        <MdDelete style={{ color: 'red' }} size={22} />
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default DailyStepsList
