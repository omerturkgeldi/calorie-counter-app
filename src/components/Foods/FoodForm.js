import { useFormik } from 'formik'
import React from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api';
import validations from './../validations';
import { success, warn, info, error } from 'tata-js/src/tata'
import axios from 'axios';

function FoodForm() {
    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            foodName: '',
            kcal: '',
            carb: '',
            protein: '',
            fat: '',
            note: '',
        },
        onSubmit: values => {
            console.log(values);
            console.log(values.foodName);

            axios.get(`https://diyetkolik-api.herokuapp.com/kalori/${values.foodName}`)
                .then(res => {
                    let apiResult = res.data[0]
                    console.log(apiResult)

                    let newResult = {
                        foodName: apiResult.foodName,
                        kcal: parseInt(apiResult.kcalIn100gr),
                        carb: apiResult.carb,
                        fat : apiResult.fat,
                        protein : apiResult.protein,
                        urlName : apiResult.urlName
                        // note: apiResult.note
                    }
                    console.log("newResult",newResult);

                    if (values.kcal != null) {
                        createdAPIEndpoint(ENDPOINTS.FOOD).create(newResult)
                            .then(res => {
                                console.log(res);
                                success('Başarılı', `${apiResult.foodName} başarıyla eklendi.`)
                            })
                            .catch(err => {
                                console.log(err)
                                error('Başarısız!', 'Ürün eklenemedi.')
                            });
                    }


                })
                .catch(err => console.log(err))


        },
        // validationSchema: validations.foodValidations,

    })


    return (
        <div>
        <button style={{color:'red',padding:'10px'}}>SDGdg</button>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Yemek Ekle</h1>
                        <form onSubmit={handleSubmit} autoComplete="off" className="mt-5 mb-5 p-5" style={{ border: "3px solid blue", borderRadius: '15px' }}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="foodName" className="form-label">Yemek İsmi</label>
                                        <input type="text" className="form-control" name="foodName" value={values.foodName} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label htmlFor="kcal" className="form-label">Kalori</label>
                                        <input type="number" className="form-control" name="kcal" value={values.kcal} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="note" className="form-label">Not</label>
                                        <input type="text" className="form-control" name="note" value={values.note} onChange={handleChange} />
                                    </div> */}
                                </div>
                                <div className="col-md-6">
                                    {/* <div className="mb-3">
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
                                    </div> */}
                                </div>
                            </div>


                            <button type="submit" className="btn btn-success btn-lg">Ekle</button>

                            {/* {errors.foodName && touched.foodName && (
                                <div className="bg-danger text-white">{errors.foodName}</div>
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
                            )} */}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FoodForm
