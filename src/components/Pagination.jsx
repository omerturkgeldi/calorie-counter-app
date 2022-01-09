import React from 'react'
import { useState } from 'react';

function Pagination({ postsPerPage, totalPosts, paginate }) {

    const pageNumbers = [];

    const [activePage, setActivePage] = useState(1);


    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }



    const customPaginationFunc = ((number) => {
        paginate(number)
        setActivePage(number);
        console.log(activePage)
    })



    const changeActiveState = ((e) => {

        let listLength = e.target.parentNode.parentNode.childNodes.length;

        for (let i = 0; i < listLength; i++) {
            e.target.parentNode.parentNode.childNodes[i].className = " page-item "
        }
        // e.target.parentNode.parentNode.childNodes[0].setAttribute( 'class', " page-item ");
        // console.log(e.target.parentNode.parentNode.childNodes[0].className = "page-item")
        // console.log(e.target.parentNode.parentNode.childNodes.length)
        e.target.parentNode.className += " active"
    })

    return (
        <div className='container'>
            <nav>
                <ul className='pagination col-md-12'>
                    {/* <li onClick={(e) => changeActiveState(e)} class="page-item">
                    <a onClick={() => customPaginationFunc(activePage-1)} class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li> */}
                    {pageNumbers.map(number => (
                        <li onClick={(e) => changeActiveState(e)} key={number} className='page-item'>
                            <a onClick={() => customPaginationFunc(number)} className='page-link'>
                                {number}
                            </a>
                        </li>


                    ))}
                    {/* <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li> */}
                </ul>
            </nav>
        </div>

    )
}

export default Pagination
