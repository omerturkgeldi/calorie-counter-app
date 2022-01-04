import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';


function GroupList() {


    const [groups, setGroups] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.GROUPS).fetchAll()
            .then(res => {
                let groupsList = res.data.map(item => ({
                    id: item.id,
                    groupName: item.groupName,
                    createdAt: item.createdAt,
                    creatorId: item.creatorId, 
                }));
                setGroups(groupsList)

            })
            .catch(err => console.log(err))
        console.log(groups)
    }, [])


    return (
        <div className="container mb-5">
            <h1 className="mb-5">Gruplar Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Grup İsmi</th>
                        <th scope="col">Açıldığı Tarih</th>
                        <th scope="col">Açan Kişi</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {groups && groups.map((group, index) => {
                        return (
                            <tr key={group.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{group.groupName}</td>
                                <td>{group.createdAt}</td>
                                <td>{group.creatorId}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.GROUPS).fetchById(group.id)
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
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.GROUPS).delete(group.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Grup başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Grup silinemedi.')
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

export default GroupList
