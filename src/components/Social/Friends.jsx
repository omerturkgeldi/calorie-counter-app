import React, { useEffect, useState } from 'react'
import { createdAPIEndpoint, ENDPOINTS } from '../../api'

import { MdArrowForward } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Friends() {

    const userId = useSelector(state => state.auth.userId)

    const [friends, setFriends] = useState();

    console.log(userId)


    useEffect(() => {
        createdAPIEndpoint(ENDPOINTS.RELATIONSHIPS + "/search?userId=" + userId).fetchAll()
            .then(res => {
                let friendList = res.data.map(item => ({
                    id: item.id,
                    userId_1: item.userId_1,
                    userId_2: item.userId_2,
                    relationshipTypeId: item.relationshipTypeId,
                    createdAt: item.createdAt,
                    city: item.city,
                    registerDate: item.registerDate,
                    birthdate: item.birthdate,
                    weight: item.weight,
                    height: item.height,
                    email: item.email,
                    gender: item.gender,
                    activityFactor: item.activityFactor,
                    goal: item.goal,
                    username: item.username,
                    name: item.name,
                    surname: item.surname,
                }));

                setFriends(friendList)

            })
            .catch(err => console.log(err))
        console.log(friends)
    }, [])




    return (
        <div className='container'>
            <div className='top my-4'>
                <h2>Arkadaşlarım</h2>
            </div>

            {/* https://localhost:5001/api/Relationship/search?userId=375570d6-3ced-4ed9-8fff-d0060b494ddf */}

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Adı</th>
                        <th scope="col">Soyadı</th>
                        <th scope="col">Kullanıcı Adı</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {friends && friends.map((friend, index) => {

                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td className='mx-auto'>{friend.name != null ? friend.name : " - "}</td>
                                <td>{friend.surname != null ? friend.surname : " - "}</td>
                                <td>{friend.username}</td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: `/arkadas-ile-karsilastirma`,
                                            state: [ {friendId: friend.userId_2}, {friendName: friend.name}, { friendUserName: friend.username} ]
                                        }}

                                    >
                                        <button className='btn'>
                                            <MdArrowForward size={22} />
                                        </button>
                                    </Link>


                                </td>
                            </tr>
                        )

                    })}


                </tbody>
            </table>



        </div>
    )
}

export default Friends
