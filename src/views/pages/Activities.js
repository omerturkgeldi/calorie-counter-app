import React from 'react'
import ActivitiesList from '../../components/Activities/ActivitiesList'
import UserActivities from '../../components/Activities/UserActivities'

const Activities = () => {
    return (
        <div className='row'>
            <div className="col-xl-12 col-12">
                <div className="container mb-3">
                    <h1>Aktiviteler</h1>
                </div>
                <ActivitiesList />
            </div>
            {/* <div class="col-xl-7 col-12">
                <UserActivities />
            </div> */}
        </div>
    )
}

export default Activities
