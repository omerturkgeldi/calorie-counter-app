import React from 'react'
import FoodForm from '../../components/Foods/FoodForm'
import FoodList from '../../components/Foods/FoodList'

const Foods = () => {
    return (
        <div>
            <div className="col-md-12">
                <FoodForm />
            </div>
            <div className="col-md-12">
                <FoodList />
            </div>
        </div>
    )
}

export default Foods
