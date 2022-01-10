import React from 'react'
import GroupList from '../../components/Groups/Groups'
import Relationships from '../../components/Relationships/Relationships'
import RelationshipTypes from '../../components/RelationshipTypes/RelationshipTypes'
import Friends from '../../components/Social/Friends'
import Groups from '../../components/Social/Groups'
import UserGroups from '../../components/UserGroups/UserGroups'

const Social = () => {
    return (
        <div>
            <div className='row'>
                <div className='col-xl-4'>
                    <Groups />
                </div>
                <div className='col-xl-8'>
                    <Friends />
                </div>
            </div>
            {/* <GroupList />
            <UserGroups />
            <RelationshipTypes />
            <Relationships /> */}
        </div>
    )
}

export default Social
