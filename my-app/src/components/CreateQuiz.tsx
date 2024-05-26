import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { RiExchangeLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Create: React.FC = () => {
    const [isUpdate, setIsUpdate] = useState<boolean>(false)
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [quizList, setQuizList] = useState([])
    const [title, setTitle] = useState<string>('')
    const [newTitle, setNewTitle] = useState<string>('')

    const navigate = useNavigate()

    useEffect(() => {
        let list: any = localStorage.getItem('quiz')
        list = JSON.parse(list)
        setQuizList(list)
    }, [])

    const addTitle = () => {
        let arr: any = localStorage.getItem('quiz') || []
        if (arr.length !== 0) {
            arr = JSON.parse(arr)
        }
        arr.push({ id: title, name: title })
        localStorage.setItem('quiz', JSON.stringify(arr))
        setIsAdd(false)
    }

    const deleteQuiz = (id: any) => {
        let newList = quizList.filter((f: any) => f.id !== id)
        localStorage.setItem('quiz', JSON.stringify(newList))
    }

    const updateTitle = () => {
        let updateList: any = quizList.filter((f: any) => f.name !== title)
        updateList.push({ id: newTitle, name: newTitle })
        setQuizList(updateList)
        localStorage.setItem('quiz', JSON.stringify(updateList))
        setIsUpdate(false)
    }

    return (
        <div className='h-96 flex justify-center items-center'>
            <div className='w-96 h-auto flex flex-col justify-center items-center gap-10'>
                <div className='text-xl'>Create</div>
                <div className='flex flex-col justify-center items-center gap-10'>
                    <div className='flex flex-wrap justify-center items-center gap-5'>
                        {quizList.map((item: any, idx: any) => (
                            <div className='flex justify-between items-center bg-blue-200 hover:bg-blue-300 transform ease-out duration-300 p-2 gap-3 rounded-md' key={idx}>
                                <span className='text-lg cursor-pointer' onClick={() => navigate(`/createAsk/${item.id}`)}>{item.name}</span>
                                <span className='cursor-pointer' onClick={() => { setIsUpdate(true); setTitle(item.id) }}><RiExchangeLine size={22} /></span>
                                <span className='cursor-pointer' onClick={() => deleteQuiz(item.id)}><MdDeleteOutline size={24} /></span>
                            </div>
                        ))}
                        <div className='text-black cursor-pointer' onClick={() => setIsAdd(true)}><IoMdAdd size={28} /></div>
                    </div>
                    {isAdd ?
                        <div>
                            <input className='input' type="text" onChange={(e) => setTitle(e.target.value)} />
                            <button className='btn btn-green' onClick={addTitle}>Add</button>
                        </div>
                        :
                        <></>}
                    {isUpdate ?
                        <div>
                            <input className='input' type="text" onChange={(e) => setNewTitle(e.target.value)} />
                            <button className='btn btn-green' onClick={updateTitle}>Update</button>
                        </div>
                        :
                        <></>}
                </div>
            </div>
        </div>
    )
}

export default Create