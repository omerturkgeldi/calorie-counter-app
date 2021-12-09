import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';



function ProductList() {


    const [products, setProducts] = useState();



    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.PRODUCT).fetchAll()
            .then(res => {
                let productList = res.data.map(item => ({
                    id: item.productId,
                    barcodeNo: item.barcodeNo,
                    productName: item.productName,
                    kcal: item.kcal,
                    carb: item.carb,
                    protein: item.protein,
                    fat: item.fat,
                    portionSize: item.portionSize,
                    note: item.note
                }));
                setProducts(productList)

            })
            .catch(err => console.log(err))
        console.log(products)
    }, [])



    return (
        <div className="container mb-5">
            <h1 className="mb-5">Ürün Listesi</h1>

            <table className="table mt-5 mb-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Barkod Numarası</th>
                        <th scope="col">Ürün İsmi</th>
                        <th scope="col">Kalori</th>
                        <th scope="col">Karbonhidrat</th>
                        <th scope="col">Protein</th>
                        <th scope="col">Yağ</th>
                        <th scope="col">Porsiyon Miktarı</th>
                        <th scope="col">Not</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, index) => {
                        return (
                            <tr key={product.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.barcodeNo}</td>
                                <td>{product.productName}</td>
                                <td>{product.kcal}</td>
                                <td>{product.carb == 0 ? " - " : product.carb + ` gr`}</td>
                                <td>{product.protein == 0 ? " - " : product.protein + ` gr`}</td>
                                <td>{product.fat == 0 ? " - " : product.fat + ` gr`}</td>
                                <td>{product.portionSize == 0 ? " - " : product.portionSize + ` gr`}</td>
                                <td>{product.note}</td>
                                <td>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.PRODUCT).fetchById(product.id)
                                        .then(res => {
                                            console.log(res.data);
                                            // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            error("Ürün Bulunamadı", "");
                                        })}>
                                        <MdEdit style={{ color: 'blue' }} size={22} />
                                    </a>
                                </td>
                                <td style={{ cursor: 'pointer' }}>
                                    <a onClick={() => createdAPIEndpoint(ENDPOINTS.PRODUCT).delete(product.id)
                                        .then(res => {
                                            console.log(res);
                                            success('Başarılı!', 'Ürün başarıyla silindi.')
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            error('Başarısız!', 'Ürün silinemedi.')
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

export default ProductList
