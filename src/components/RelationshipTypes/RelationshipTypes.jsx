import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';


function RelationshipTypes() {


    const [relationshipTypes, setRelationshipTypes] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.RELATIONSHIPTYPES).fetchAll()
            .then(res => {
                let relationshipTypesList = res.data.map(item => ({
                    id: item.id,
                    type: item.type,
                }));
                setRelationshipTypes(relationshipTypesList)

            })
            .catch(err => console.log(err))
        console.log(relationshipTypes)
    }, [])


    return (
        <div className="container mb-5">
            <h1 className="mb-5">İlişki Tipleri Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {relationshipTypes && relationshipTypes.map((relationshipType, index) => {
                        return (
                            <tr key={relationshipType.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{relationshipType.id}</td>
                                <td>{relationshipType.type}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.RELATIONSHIPTYPES).fetchById(relationshipType.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("İlişki Tipi Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.RELATIONSHIPTYPES).delete(relationshipType.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'İlişki Tipi başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'İlişki Tipi silinemedi.')
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

export default RelationshipTypes
