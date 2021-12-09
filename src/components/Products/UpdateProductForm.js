import { useFormik } from 'formik'
import React from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api';
import validations from './../validations';
import { success, warn, info, error } from 'tata-js/src/tata'

function UpdateProductForm({xbarcodeNo}) {
console.log(xbarcodeNo)

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            barcodeNo: {xbarcodeNo},
            productName: '',
            kcal: '',
            carb: '',
            protein: '',
            fat: '',
            portionSize: '',
            note: '',
        },
        onSubmit: values => {
            console.log(values);
            // createdAPIEndpoint(ENDPOINTS.PRODUCT).update(data.id,values)
            //     .then(res => {
            //         console.log(res);
            //         success('Başarılı', `${res.data.barcodeNo} başarıyla eklendi.`)
            //     })
            //     .catch(err => {
            //         console.log(err)
            //         error('Başarısız!', 'Ürün eklenemedi.')
            //     });
        },
        validationSchema: validations,

    })


    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Ürün Ekle</h1>
                        <form onSubmit={handleSubmit} autoComplete="off" className="mt-5 mb-5 p-5" style={{ border: "3px solid green", borderRadius: '15px' }}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="barcodeNo" className="form-label">Barkod Numarası</label>
                                        <input type="text" className="form-control" name="barcodeNo" value={values.barcodeNo} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="productName" className="form-label">Ürün İsmi</label>
                                        <input type="text" className="form-control" name="productName" value={values.productName} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="kcal" className="form-label">Kalori</label>
                                        <input type="number" className="form-control" name="kcal" value={values.kcal} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="note" className="form-label">Not</label>
                                        <input type="text" className="form-control" name="note" value={values.note} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="carb" className="form-label">Karbonhidrat</label>
                                        <input type="number" className="form-control" name="carb" value={values.carb} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="protein" className="form-label">Protein</label>
                                        <input type="number" className="form-control" name="protein" value={values.protein} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fat" className="form-label">Yağ</label>
                                        <input type="number" className="form-control" name="fat" value={values.fat} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="portionSize" className="form-label">Porsiyon Miktarı</label>
                                        <input type="number" className="form-control" name="portionSize" value={values.portionSize} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>


                            <button type="submit" className="btn btn-success btn-lg">Ekle</button>

                            {errors.barcodeNo && touched.barcodeNo && (
                                <div className="bg-danger text-white">{errors.barcodeNo}</div>
                            )}
                            {errors.productName && touched.productName && (
                                <div className="bg-danger text-white">{errors.productName}</div>
                            )}
                            {errors.kcal && touched.kcal && (
                                <div className="bg-danger text-white">{errors.kcal}</div>
                            )}
                            {errors.carb && (
                                <div className="bg-danger text-white">{errors.carb}</div>
                            )}
                            {errors.protein && (
                                <div className="bg-danger text-white">{errors.protein}</div>
                            )}
                            {errors.fat && (
                                <div className="bg-danger text-white">{errors.fat}</div>
                            )}
                            {errors.portionSize && (
                                <div className="bg-danger text-white">{errors.portionSize}</div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdateProductForm
