import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import axios from 'axios'
import Pagination from '../Pagination';
import AddIcon from '@mui/icons-material/Add';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik'

function AllFoodsLists() {

    const { handleSubmit, handleFormikChange, handleBlur, values, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            activityId: '',
            minutes: '',
            userId: '',
        },
        onSubmit: values => {
            console.log(values);
            console.log(values);

            // axios.get(`https://diyetkolik-api.herokuapp.com/kalori/${values.foodName}`)
            //     .then(res => {
            //         let apiResult = res.data[0]
            //         console.log(apiResult)

            //         let newResult = {
            //             foodName: apiResult.foodName,
            //             kcal: parseInt(apiResult.kcalIn100gr),
            //             carb: apiResult.carb,
            //             fat : apiResult.fat,
            //             protein : apiResult.protein,
            //             urlName : apiResult.urlName
            //             // note: apiResult.note
            //         }
            //         console.log("newResult",newResult);

            //         // if (values.kcal != null) {
            //         //     createdAPIEndpoint(ENDPOINTS.FOOD).create(newResult)
            //         //         .then(res => {
            //         //             console.log(res);
            //         //             success('Başarılı', `${apiResult.foodName} başarıyla eklendi.`)
            //         //         })
            //         //         .catch(err => {
            //         //             console.log(err)
            //         //             error('Başarısız!', 'Ürün eklenemedi.')
            //         //         });
            //         // }
            //     })
            //     .catch(err => console.log(err))
        },
        // validationSchema: validations.foodValidations,
    })

    const customChange = (e, setFieldValue) => {
        console.log(e.target.value);
        setFieldValue(e.target.name, e.target.value);
    };


    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [modalActivity, setModalActivity] = useState();
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("çikolata");

    const handleClose = () => {
        values.gram = "";
        values.timeOfTheDay = "";
        setShowModal(false);
    }

    const handleShow = () => setShowModal(true);


    const handlePostActivity = (e) => {

        if (!modalActivity.type) {

            let foodToPost =
            {
                foodId: modalActivity.id,
                userId: "ed3e6bea-fd43-4323-8d9c-1d8d848eb3ed",
                portionSize: parseFloat(values.gram),
                date: new Date().toJSON(),
                intakeType: Number.isNaN(parseInt(values.timeOfTheDay)) ? 0 : parseInt(values.timeOfTheDay),
            }


            if (foodToPost.portionSize != null && foodToPost.portionSize != 0 && foodToPost.intakeType != null) {
                createdAPIEndpoint(ENDPOINTS.DAILYFOODINTAKES).create(foodToPost)
                    .then(res => {
                        success('Başarılı', `Yemek başarıyla eklendi.`)
                    })
                    .catch(err => {
                        console.log(err)
                        error('Başarısız!', 'Yemek eklenemedi.')
                    });
            }
        }
        else {

            let productToPost =
            {
                productId: modalActivity.id,
                userId: "ed3e6bea-fd43-4323-8d9c-1d8d848eb3ed",
                portionSize: parseFloat(values.gram),
                date: new Date().toJSON(),
                intakeType: Number.isNaN(parseInt(values.timeOfTheDay)) ? 0 : parseInt(values.timeOfTheDay),
            }

            if (productToPost.portionSize != null && productToPost.portionSize != 0 && productToPost.intakeType != null) {
                createdAPIEndpoint(ENDPOINTS.DAILYPRODUCTINTAKES + "/Save").create(productToPost)
                    .then(res => {
                        success('Başarılı', `Yemek başarıyla eklendi.`)
                    })
                    .catch(err => {
                        console.log(err)
                        error('Başarısız!', 'Yemek eklenemedi.')
                    });
            }
        }
        handleClose();

    }


    const handleChange = (e) => {
        if (e.target.value.trim() == null || e.target.value.trim() == "") {
            setSearch("yürüme");
        }
        else {
            setSearch(e.target.value);
        }
    };


    useEffect(() => {
        setLoading(true);
        axios.get("https://localhost:5001/api/Foods/search?name=" + search)
            .then((res) => {
                setFoods(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((error) => alert("Hata!"));
    }, [search]);


    const indexOfLastPost = currentPage + postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = foods.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = ((pageNumber) => {
        setCurrentPage(pageNumber);
    })

    return (
        <>
            <Modal size='lg' show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Yemek ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalActivity ?
                        <div>
                            <div className='row mr-5 ml-5 mt-4 mb-5 p-4 '>
                                <div style={{ 'borderBottom': 'solid', 'borderColor': 'blueviolet' }} className=' d-flex flex-row justify-content-between p-4 mb-5'>
                                    <h2 className='col-md-6 '>
                                        {modalActivity.name}
                                    </h2>

                                    <h4 className='text-info col-md-6 text-end'>
                                        {modalActivity.kcal} kcal
                                    </h4>
                                </div>


                                <div className='row'>
                                    <div className='col-lg-5'>
                                        <div className='container my-4'>
                                            <div className='my-4 d-flex flex-row justify-content-between'>
                                                <h5>Yağ</h5>
                                                <h4>{modalActivity.fat} g</h4>
                                            </div>
                                            <div className='my-4 d-flex flex-row justify-content-between'>
                                                <h5>Protein</h5>
                                                <h4>{modalActivity.protein} g</h4>
                                            </div>
                                            <div className='my-4 d-flex flex-row justify-content-between'>
                                                <h5>Karbonhidrat</h5>
                                                <h4>{modalActivity.carb} g</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-2'>

                                    </div>
                                    <div className='col-lg-5'>
                                        <div className='container'>

                                            <form onSubmit={handleSubmit}>



                                                <div className='d-flex justify-content-between col-md-12 my-2'>
                                                    <div className=' col-md-5 align-middle'>
                                                        <h5 className='align-middle'>
                                                            <label htmlFor="timeOfTheDay" className="form-label">Öğün</label>
                                                        </h5>
                                                    </div>
                                                    <div className='col-md-7'>
                                                        <select
                                                            className="form-control"
                                                            name="timeOfTheDay"
                                                            value={values.timeOfTheDay}
                                                            onChange={e => customChange(e, setFieldValue)}
                                                            onBlur={handleBlur}
                                                        >
                                                            <option value="0" label="Kahvaltı" />
                                                            <option value="1" label="Öğle Yemeği" />
                                                            <option value="2" label="Akşam Yemeği" />
                                                            <option value="3" label="Atıştırmalık" />
                                                        </select>
                                                    </div>
                                                </div>




                                                <div className='d-flex justify-content-between col-md-12 my-2'>
                                                    <div className=' col-md-5 align-middle'>
                                                        <h5 className='align-middle'>
                                                            <label htmlFor="gram" className="form-label">Gram</label>
                                                        </h5>
                                                    </div>
                                                    <div className='col-md-7'>
                                                        <input type="number" max={600} className="form-control" name="gram" value={values.gram} onChange={e => customChange(e, setFieldValue)} onBlur={handleBlur} />
                                                    </div>

                                                </div>
                                                <div className='col-lg-12 mt-4'>
                                                    <h5>
                                                        <span className='text-danger'>{values.gram}</span> gramda  <span className='text-danger'>{modalActivity.kcal * values.gram / 100}</span> kalori
                                                    </h5>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>


                            </div>

                            <p className='my-5'>* Egzersizde tüketilen enerjinin matematiksel olarak hesaplanması için MET değeri kullanılır</p>


                        </div>
                        : <div>x</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                    <Button type="submit" variant="primary" onClick={handlePostActivity}
                    >
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>






            <div className="container mb-3">
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <input
                                    placeholder="Bir yemek arayın..."
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                    name="value"
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <br></br>
                <br></br>
                <div className="col-md-12 d-flex flex-column ">

                    {
                        loading ? <h1 style={{ 'color': 'red' }} >Yükleniyor...</h1> : <div>

                            <ul className='list-group mb-4'>
                                {currentPosts && currentPosts.map((food) => {
                                    return (
                                        <li key={food.foodId} className='list-group-item text-start d-flex justify-content-between py-4'>
                                            <span className='col-md-8' style={{ 'textTransform': 'capitalize' }}>
                                                {food.name}
                                            </span>
                                            <span className='col-md-2 text-center'>
                                                {food.kcal} kcal
                                            </span>

                                            <button className='col-md-q btn btn-danger'
                                                onClick={() => {

                                                    let currentPostSingle = {
                                                        id: food.id,
                                                        carb: food.carb,
                                                        fat: food.fat,
                                                        kcal: food.kcal,
                                                        protein: food.protein,
                                                        type: food.type,
                                                        name: food.name,
                                                    }

                                                    setModalActivity(currentPostSingle);
                                                    console.log("currentPostSingle", currentPostSingle);
                                                    handleShow();
                                                }}
                                            // onClick={() => createdAPIEndpoint(ENDPOINTS.FOOD + "/GetById").fetchById(food.foodId)
                                            //     .then(res => {
                                            //         console.log("res.datares.datares.data", res.data);

                                            //         let currentPostSingle = {
                                            //             id: food.id,
                                            //             carb: food.carb,
                                            //             fat: food.fat,
                                            //             kcal: food.kcal,
                                            //             protein: food.protein,
                                            //             type: food.type,
                                            //         }


                                            //         setModalActivity(currentPostSingle);
                                            //         console.log(currentPostSingle);
                                            //         handleShow();
                                            //         // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                            //     })
                                            //     .catch(err => {
                                            //         console.log(err);
                                            //         error("Aktivite Bulunamadı", "");
                                            //     })}
                                            >
                                                <AddIcon />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>

                            <Pagination postsPerPage={postsPerPage} totalPosts={foods.length} paginate={paginate} />
                        </div>

                    }

                </div>
            </div>
        </>
    )
}

export default AllFoodsLists
