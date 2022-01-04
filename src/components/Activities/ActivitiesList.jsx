import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';


function FoodList() {


    const [activities, setActivities] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.ACTIVITIES + '/getall').fetchAll()
            .then(res => {
                let activitiesList = res.data.map(item => ({
                    activityId: item.activityId,
                    name: item.name,
                    specificMotion: item.specificMotion,
                    metValue: item.metValue                    
                }));
                setActivities(activitiesList)

            })
            .catch(err => console.log(err))
        console.log(activities)
    }, [])


    return (
        <div className="container mb-5">
            <h1 className="mb-5">Aktivite Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Aktivite İsmi</th>
                        <th scope="col">Hareket İsmi</th>
                        <th scope="col">MET Değeri</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {activities && activities.map((activity, index) => {
                        return (
                            <tr key={activity.activityId}>
                                <th scope="row">{index + 1}</th>
                                <td>{activity.name}</td>
                                <td>{activity.specificMotion}</td>
                                <td>{activity.metValue}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.ACTIVITIES + '/getById').fetchById(activity.activityId)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("Aktivite Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.ACTIVITIES + "/Remove/").delete(activity.activityId)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Aktivite başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Aktivite silinemedi.')
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

export default FoodList
