import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';


function UserGroups() {


    const [userGroups, setUserGroups] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.USERGROUPS).fetchAll()
            .then(res => {
                let userGroupsList = res.data.map(item => ({
                    id: item.id,
                    userId: item.userId,
                    groupId: item.groupId,
                    relationshipTypeId: item.relationshipTypeId, 
                    dateAdded: item.dateAdded
                }));
                setUserGroups(userGroupsList)

            })
            .catch(err => console.log(err))
        console.log(userGroups)
    }, [])


    return (
        <div className="container mb-5">
            <h1 className="mb-5">Grup Üyeleri Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kullanıcı ID</th>
                        <th scope="col">Group ID</th>
                        <th scope="col">İlişki ID</th>
                        <th scope="col">Eklendiği Tarih</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {userGroups && userGroups.map((userGroup, index) => {
                        return (
                            <tr key={userGroup.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{userGroup.userId}</td>
                                <td>{userGroup.groupId}</td>
                                <td>{userGroup.relationshipTypeId}</td>
                                <td>{userGroup.dateAdded}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.USERGROUPS).fetchById(userGroup.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("Grup İlişkisi Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.USERGROUPS).delete(userGroup.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Grup İlişkisi başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Grup İlişkisi silinemedi.')
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

export default UserGroups
