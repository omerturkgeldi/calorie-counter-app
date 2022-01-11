import React from 'react'
import { useSelector } from 'react-redux';
import FriendsAndUserActivities from '../../components/Activities/FriendsAndUserActivities';
import DailySummary from '../../components/DailySummary';
import DateSelector from '../../components/DateSelector';
import FriendsAndUserFoods from '../../components/Foods/FriendsAndUserFoods';

function UserVsFriend(props) {

    const userId = useSelector(state => state.auth.userId)
    const friendId = props.location.state[0].friendId
    const friendName = props.location.state[1].friendName
    const friendUserName = props.location.state[2].friendUserName

    console.log(props.location.state)

    return (


        <div>
            <h3>Arkadaş Karşılaştırma Sayfası</h3>




            <DateSelector />

            <div className='container mt-5'>
                <div class="row">
                    <div class="col-lg-12 col-12 text-center d-flex flex-row">
                        <div className='col-lg-5 col-12'>
                            <h5>Ben</h5>
                            <FriendsAndUserActivities idOfTheUser={userId} />
                        </div>
                        <div className='col-2'></div>
                        <div className='col-lg-5 col-12'>
                            <h5>{friendUserName}</h5>
                            <FriendsAndUserActivities idOfTheUser={friendId} />
                        </div>
                    </div>
                    <div class="col-lg-12 col-12 text-center d-flex flex-row">
                        <div className='col-lg-5 col-12'>
                            <FriendsAndUserFoods idOfTheUser={userId} />
                        </div>
                        <div className='col-2'></div>
                        <div className='col-lg-5 col-12'>
                            <FriendsAndUserFoods idOfTheUser={friendId} />
                        </div>
                    </div>
                </div>

            </div>





        </div>
    )
}

export default UserVsFriend
