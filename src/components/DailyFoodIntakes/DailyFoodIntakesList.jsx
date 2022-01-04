import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from '../Products/UpdateProductForm';


function DailyFoodIntakesList() {


    const [dailyFoodIntakes, setDailyFoodIntakes] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.DAILYFOODINTAKES).fetchAll()
            .then(res => {
                let dailyFoodIntakesList = res.data.map(item => ({
                    id: item.id,
                    foodId: item.foodId,
                    userId: item.userId,
                    portionSize: item.portionSize,
                    date: item.date,
                }));
                setDailyFoodIntakes(dailyFoodIntakesList)

            })
            .catch(err => console.log(err))
        console.log(dailyFoodIntakes)
    }, [])


    return (
        <div className="container mb-5">
            <h1 className="mb-5">Günlük Yemek Tüketimi Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Yemek ID</th>
                        <th scope="col">Kullanıcı ID</th>
                        <th scope="col">Porsiyon (g)</th>
                        <th scope="col">Tarih</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {dailyFoodIntakes && dailyFoodIntakes.map((dailyFoodIntake, index) => {
                        return (
                            <tr key={dailyFoodIntake.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{dailyFoodIntake.id}</td>
                                <td>{dailyFoodIntake.foodId}</td>
                                <td>{dailyFoodIntake.userId}</td>
                                <td>{dailyFoodIntake.portionSize}</td>
                                <td>{dailyFoodIntake.date}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.DAILYFOODINTAKES).fetchById(dailyFoodIntake.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("Günlük Yemek Tüketimi Bilgisi Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.DAILYFOODINTAKES).delete(dailyFoodIntake.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Günlük Yemek Tüketimi Bilgisi başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Günlük Yemek Tüketimi Bilgisi silinemedi.')
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

export default DailyFoodIntakesList
