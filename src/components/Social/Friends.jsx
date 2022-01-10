import React from 'react'
import { MdArrowForward } from 'react-icons/md';


function Friends() {
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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Adı</td>
                        <td>Soyadı</td>
                        <td>
                            <button className='btn'>
                                <MdArrowForward size={22} />
                            </button>

                        </td>
                    </tr>

                </tbody>
            </table>



        </div>
    )
}

export default Friends
