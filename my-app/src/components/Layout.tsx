import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
    return (
        <div className='min-h-screen pg-20 font-robot '>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout