import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import AppError from '../pages/AppError'
import History from '../pages/History'
import Start from './Start'
import Create from './Create'

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/history' element={<History />} />
                <Route path='/start' element={<Start />} />
                <Route path='/create' element={<Create />} />
                <Route path='*' element={<AppError />} />
            </Route>
        </Routes>
    )
}

export default AppRouter