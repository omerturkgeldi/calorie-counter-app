import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'
import { MdEdit, MdDelete } from 'react-icons/md';
import { success, warn, info, error } from 'tata-js/src/tata'
import UpdateProductForm from './../Products/UpdateProductForm';
import axios from 'axios'
import Pagination from '../Pagination';
import AddIcon from '@mui/icons-material/Add';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik'


function ActivitiesList() {


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




    const [activities, setActivities] = useState([]);
    const [postActivity, setPostActivity] = useState();
    const [modalActivity, setModalActivity] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        values.minutes = "";
        setShowModal(false);
    }

    const handleShow = () => setShowModal(true);

    const handlePostActivity = (e) => {


        let activityToPost =
        {
            activityId: modalActivity.activityId,
            minutes: parseInt(values.minutes),
            userId: "ed3e6bea-fd43-4323-8d9c-1d8d848eb3ed"
        }

        if (values.minutes != null  && values.minutes != 0) {
            createdAPIEndpoint(ENDPOINTS.DAILYACTIVITIES + "/Save").create(activityToPost)
                .then(res => {
                    console.log(res);
                    success('Başarılı', `Aktivite başarıyla eklendi.`)
                })
                .catch(err => {
                    console.log(err)
                    error('Başarısız!', 'Aktivite eklenemedi.')
                });
        }


        console.log(activityToPost);
        values.minutes = "";
        handleClose();


    }



    const [search, setSearch] = useState("yürüme");

    const handleChange = (e) => {
        if (e.target.value.trim() == null || e.target.value.trim() == "") {
            setSearch("yürüme");
        }
        else {
            setSearch(e.target.value);
            console.log("e.target.value", e.target.value);
        }
    };


    useEffect(() => {
        setLoading(true);
        axios.get("https://localhost:5001/api/activities/SearchByActivityName/?name=" + search)
            .then((res) => {
                console.log(res);
                setActivities(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((error) => alert("Hata!"));
    }, [search]);




    // useEffect(() => {
    //     createdAPIEndpoint(ENDPOINTS.ACTIVITIES + '/getall').fetchAll()
    //         .then(res => {
    //             let activitiesList = res.data.map(item => ({
    //                 activityId: item.activityId,
    //                 name: item.name,
    //                 specificMotion: item.specificMotion,
    //                 metValue: item.metValue
    //             }));
    //             setActivities(activitiesList)

    //         })
    //         .catch(err => console.log(err))
    //     console.log(activities)
    // }, [])

    // if (loading) {
    //     return (
    //         <h1 style={{ 'color': 'red' }} >Yükleniyor...</h1>
    //     )
    // }


    const indexOfLastPost = currentPage + postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = activities.slice(indexOfFirstPost, indexOfLastPost);

    //Change page


    const paginate = ((pageNumber) => {
        setCurrentPage(pageNumber);
    })

    return (
        <>

            <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Aktivite ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalActivity ?
                        <div>
                            <div className='row'>
                                <div className='col-md-6 my-2'>
                                    <h5>Aktivite :</h5>
                                </div>
                                <div className='col-md-6 my-2'>
                                    <span>{modalActivity.name}</span>
                                </div>

                                <hr />

                                <div className='col-md-6 my-2'>
                                    <h5>Açıklama :</h5>
                                </div>
                                <div className='col-md-6 my-2'>
                                    <span>{modalActivity.specificMotion}</span>
                                </div>

                                <hr />

                                <div className='col-md-6 my-2'>
                                    <h5>* MET Değeri :</h5>
                                </div>
                                <div className='col-md-6 my-2'>
                                    <span>{modalActivity.metValue}</span>
                                </div>

                                <hr />

                                <form onSubmit={handleSubmit}>
                                    <div className='col-md-6 my-2'>
                                        <h5>
                                            <label htmlFor="minutes" className="form-label">Dakika</label>
                                        </h5>
                                    </div>
                                    <div className='col-md-6 my-2'>
                                        <input type="number" max={600} className="form-control" name="minutes" value={values.minutes} onChange={e => customChange(e, setFieldValue)} onBlur={handleBlur} />
                                    </div>
                                </form>


                            </div>

                            <p className='my-5'>* Egzersizde tüketilen enerjinin matematiksel olarak hesaplanması için MET değeri kullanılır</p>

                        </div>
                        : <div>x</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
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
                                    placeholder="Bir aktivite arayın..."
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
                                {currentPosts && currentPosts.map((activity) => {
                                    return (
                                        <li key={activity.activityId} className='list-group-item text-start d-flex justify-content-between py-4'>
                                            <span className='col-md-8' style={{'textTransform': 'capitalize'}}>{activity.specificMotion}</span>
                                            <span className='col-md-2 text-center'>{activity.metValue}</span>

                                            <button className='col-md-q btn btn-danger'
                                                onClick={() => createdAPIEndpoint(ENDPOINTS.ACTIVITIES + "/GetById").fetchById(activity.activityId)
                                                    .then(res => {
                                                        console.log("res.datares.datares.data", res.data);

                                                        let currentPostSingle = {
                                                            activityId: res.data.activityId,
                                                            metValue: res.data.metValue,
                                                            name: res.data.name,
                                                            specificMotion: res.data.specificMotion
                                                        }


                                                        setModalActivity(currentPostSingle);
                                                        console.log(currentPostSingle);
                                                        handleShow();
                                                        // <UpdateProductForm xbarcodeNo={res.data.barcodeNo}/>
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        error("Aktivite Bulunamadı", "");
                                                    })}
                                            >
                                                <AddIcon />
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>

                            <Pagination postsPerPage={postsPerPage} totalPosts={activities.length} paginate={paginate} />
                        </div>

                    }
                    {/* <ul className='list-group mb-4'>
                    {currentPosts && currentPosts.map((activity) => {
                        return (
                            <li key={activity.activityId} className='list-group-item'>
                                {activity.specificMotion}
                            </li>
                        )
                    })}
                </ul> */}

                </div>






                {/* <h1 className="mb-5">Aktivite Listesi</h1> */}



                {/* <table className="table mt-5 mb-5">
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
            </table> */}
            </div >
        </>
    )
}

export default ActivitiesList
