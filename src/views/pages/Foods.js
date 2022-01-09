import React from 'react'
import AllFoodsLists from '../../components/Foods/AllFoodsLists'
import FoodForm from '../../components/Foods/FoodForm'
import FoodList from '../../components/Foods/FoodList'

const Foods = () => {
    return (
        <div>
            {/* <div className="col-md-12">
                <FoodForm />
            </div>
            <div className="col-md-12">
                <FoodList />
            </div> */}

            <div className='row'>
                <div className="col-xl-12 col-12">
                    <div className="container mb-3">
                        <h1>Yemekler</h1>
                    </div>
                    <AllFoodsLists />
                </div>

            </div>


        </div>
    )
}

export default Foods
