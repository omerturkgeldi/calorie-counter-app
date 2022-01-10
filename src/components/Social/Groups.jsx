import React from 'react'
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

function Groups() {
    return (
        <div className='container'>
            <div className='top my-4'>
                <h2>Gruplarım</h2>
            </div>

            <div className='col-12'>
                <div className="row">
                    <div className="card" style={{ 'backgroundColor': 'gray', 'color': 'white' }}>
                        <div className="card-body d-flex justify-content-between">
                            <h6 className='d-flex my-auto'>Grup 1</h6>
                            <IoArrowForwardCircleOutline size={32} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="card" style={{ 'backgroundColor': 'gray', 'color': 'white' }}>
                        <div className="card-body d-flex justify-content-between">
                            <h6 className='d-flex my-auto'>Grup 2</h6>
                            <IoArrowForwardCircleOutline size={32} />
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="card" style={{ 'backgroundColor': 'gray', 'color': 'white' }}>
                        <div className="card-body d-flex justify-content-between">
                            <h6 className='d-flex my-auto'>Grup 3</h6>
                            <IoArrowForwardCircleOutline size={32} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Groups
