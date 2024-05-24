import React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC = () => {
    return (
        <header className='flex items-center gap-44 bg-blue-600 p-4 shadow-sm backdrop-blur-sm'>
            <div>
                <span className='text-2xl text-white'>Quiz</span>
            </div>
            <nav className='flex items-center'>
                <ul className='flex items-center gap-10 text-white'>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/history'>History</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header