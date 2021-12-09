import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';


function FoodList() {


    const [foods, setFoods] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.FOOD).fetchAll()
            .then(res => {
                let foodList = res.data.map(item => ({
                    id: item.foodId,
                    foodName: item.foodName,
                    kcal: item.kcal,
                    carb: item.carb,
                    protein: item.protein,
                    fat: item.fat,
                    note: item.note
                }));
                setFoods(foodList)

            })
            .catch(err => console.log(err))
        console.log(foods)
    }, [])



    return (
        <div className="container mb-5">
            <h1 className="mb-5">Yemek Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Yemek İsmi</th>
                        <th scope="col">Kalori</th>
                        <th scope="col">Karbonhidrat</th>
                        <th scope="col">Protein</th>
                        <th scope="col">Yağ</th>
                        <th scope="col">Not</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {foods && foods.map((food, index) => {
                        return (
                            <tr key={food.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.foodName}</td>
                                <td>{food.kcal}</td>
                                <td>{food.carb == 0 ? " - " : food.carb + ` gr`}</td>
                                <td>{food.protein == 0 ? " - " : food.protein + ` gr`}</td>
                                <td>{food.fat == 0 ? " - " : food.fat + ` gr`}</td>
                                {/* <td>{food.note}</td> */}
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.FOOD).fetchById(food.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("Yemek Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.FOOD).delete(food.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Yemek başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Yemek silinemedi.')
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
