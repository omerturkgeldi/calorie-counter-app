import React from 'react'

import Routes from '../../Routes'
import Sidebar from '../sidebar/Sidebar'
import {
    Switch,
    Route,
} from "react-router-dom";

const Layout = () => {
    return (
        <div >
            <Routes />
        </div>
    )
}

export default Layout
