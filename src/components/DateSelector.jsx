import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { toYesterday, toTomorrow, setToday } from '../stores/todaysDate'


function DateSelector() {

    const today = useSelector(state => state.todaysDate.today)
    const dispatch = useDispatch()



    return (
        <div className='col-xl-12'>
            <div className='row mt-5'>
                <div className='col-md-2 text-center'>
                    <button onClick={() => dispatch(toYesterday())} className='btn btn-warning m-3'>
                        <ArrowBackIosIcon />
                    </button>
                    <h5>Dün</h5>
                </div>
                <div className='col-md-8 text-center'>
                    <button className='btn m-3' onClick={() => dispatch(setToday())}>
                        <h5>{new Date(today).toLocaleDateString()}</h5>
                    </button>
                    <h5 style={{ 'marginTop': '-7px' }}>Bugün</h5>
                </div>
                <div className='col-md-2 text-center'>
                    <button onClick={() => dispatch(toTomorrow())} className='btn btn-warning m-3'>
                        <ArrowForwardIosIcon />
                    </button>
                    <h5>Yarın</h5>
                </div>
            </div>
        </div>
    )
}

export default DateSelector
