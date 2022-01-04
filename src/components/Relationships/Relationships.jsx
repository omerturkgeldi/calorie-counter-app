import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';


function Relationships() {


    const [relationships, setRelationships] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.RELATIONSHIPS).fetchAll()
            .then(res => {
                let relationshipsList = res.data.map(item => ({
                    id: item.id,
                    userId_1: item.userId_1,
                    userId_2: item.userId_2,
                    relationshipTypeId: item.relationshipTypeId,
                    createdAt: item.createdAt,
                }));
                setRelationships(relationshipsList)

            })
            .catch(err => console.log(err))
        console.log(relationships)
    }, [])


    return (
        <div className="container mb-5">
            <h1 className="mb-5">İlişkiler Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">USER_1</th>
                        <th scope="col">USER_2</th>
                        <th scope="col">İlişki Tipi</th>
                        <th scope="col">Tarih</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {relationships && relationships.map((relationship, index) => {
                        return (
                            <tr key={relationship.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{relationship.id}</td>
                                <td>{relationship.userId_1}</td>
                                <td>{relationship.userId_2}</td>
                                <td>{relationship.relationshipTypeId}</td>
                                <td>{relationship.createdAt}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.RELATIONSHIPS).fetchById(relationship.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("İlişki Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.RELATIONSHIPS).delete(relationship.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'İlişki başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'İlişki silinemedi.')
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

export default Relationships
