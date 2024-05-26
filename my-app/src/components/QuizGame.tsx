import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Start: React.FC = () => {
    const [quizList, setQuizList] = useState<any>([])
    const [value, setValue] = useState<string>('')
    const [isOpen, setIsOpen] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        let list: any = localStorage.getItem('quiz')
        list = JSON.parse(list)
        setQuizList(list)
    }, [])

    const filteredQuiz = quizList.filter((item: any) => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    })

    const itemClickHandler = (e: any) => {
        setValue(e.target.textContent)
        setIsOpen(!isOpen)
    }

    const inputClickHandler = () => {
        setIsOpen(true)
    }

    return (
        <div className='h-96 w-full flex justify-center items-center'>
            <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                <div className='text-lg'>Choose a topic.</div>
                <div className='relative'>
                    <input
                        type="text"
                        className='input'
                        placeholder='Search a topic'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onClick={inputClickHandler}
                    />
                    <ul className='absolute left-0 top-12 w-full bg-white z-50'>
                        {value && isOpen
                            ?
                            filteredQuiz.map((item: any, idx: any) => (
                                <li key={idx} onClick={itemClickHandler} className='autocomplete-item'>{item.name}</li>
                            ))
                            :
                            null
                        }
                    </ul>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-5'>
                    {filteredQuiz.map((item: any, idx: any) => (
                        <div className='flex justify-between items-center bg-blue-200 hover:bg-blue-300 transform ease-out duration-300 p-2 gap-3 rounded-md' key={idx}>
                            <span className='text-lg cursor-pointer' onClick={() => navigate(`/startGame/${item.id}`)}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Start