import React from 'react'
import ActivitiesList from '../../components/Activities/ActivitiesList'

const Activities = () => {
    return (
        <div>
            <h1>Aktiviteler</h1>
            <ActivitiesList itemsPerPage={4}  />
        </div>
    )
}

export default Activities
