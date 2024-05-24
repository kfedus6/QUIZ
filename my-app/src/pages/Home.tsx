import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className='h-96 flex justify-center items-center gap-5'>
            <button className='btn btn-blue' onClick={() => navigate('/start')}>Start</button>
            <button className='btn btn-green' onClick={() => navigate('/create')}>Create</button>
        </div>
    )
}

export default Home