import React from 'react'
import { useSelector } from 'react-redux';

function DailySummary() {


    const today = useSelector(state => state.todaysDate.today)

    const calorieIntake = useSelector(state => state.calories.calorieIntake)
    const carbTotal = useSelector(state => state.calories.totalCarb)
    const fatTotal = useSelector(state => state.calories.totalFat)
    const proteinTotal = useSelector(state => state.calories.totalProtein)
    const calorieBurned = useSelector(state => state.calories.calorieBurned)


    return (
        <div className="container text-white">
            <div className='card p-5' style={{ 'background': 'radial-gradient(circle, rgba(37,187,50,1) 0%, rgba(4,172,23,1) 35%)', 'borderRadius': '15px' }}>
                <div className='d-flex flex-row justify-content-between'>
                    <h2 className='px-4'>Gün Özeti</h2>
                    <h2 className='px-4'>{new Date(today).toLocaleDateString()}</h2>
                </div>
                <div className='card-body mt-5'>
                    <div className='row'>
                        <div className='col-lg-7 col-12'>
                            <div className='row text-center'>
                                <div className='col-lg-4 col-12 mt-2 mb-3'>
                                    <div className='d-flex flex-column'>
                                        <h4>{calorieIntake}</h4>
                                        <h5>Alınan</h5>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-12 mb-3'>
                                    <div className='d-flex flex-column'>
                                        <h2 style={{ 'color': '#C9CC3F' }}>{calorieIntake - calorieBurned}</h2>
                                        <h5>Kalan</h5>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-12 mt-2 mb-3'>
                                    <div className='d-flex flex-column'>
                                        <h4>{calorieBurned}</h4>
                                        <h5>Yakılan</h5>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-5 progress mb-3">
                                <div className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    aria-valuenow="75"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style="width: 75%" style={{ 'width': '75%' }}>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-1 col-12'></div>
                        <div className='col-lg-4 col-12'>
                            <div className='row'>

                                <div className='d-flex justify-content-between mb-5'>
                                    <h6>Adım Sayısı</h6>
                                    <h6>8699</h6>
                                </div>


                                <div className='d-flex justify-content-between'>
                                    <h6>Karbonhidrat</h6>
                                    <h6>{carbTotal} g</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <h6>Yağ</h6>
                                    <h6>{fatTotal} g</h6>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <h6>Protein</h6>
                                    <h6>{proteinTotal} g</h6>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DailySummary
