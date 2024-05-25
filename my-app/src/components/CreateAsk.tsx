import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const CreateAsk: React.FC = () => {
    const [ask, setAsk] = useState<string>('')
    const [answerOne, setAnswerOne] = useState<any>()
    const [answerTwo, setAnswerTwo] = useState<any>()
    const [answerThree, setAnswerThree] = useState<any>()
    const [answerFour, setAnswerFour] = useState<any>()
    const [answerBoolOne, setAnswerBoolOne] = useState<boolean>(false)
    const [answerBoolTwo, setAnswerBoolTwo] = useState<boolean>(false)
    const [answerBoolThree, setAnswerBoolThree] = useState<boolean>(false)
    const [answerBoolFour, setAnswerBoolFour] = useState<boolean>(false)
    const [isAddAsk, setIsAddAsk] = useState<boolean>(false)
    const [mark, setMark] = useState<string>('')
    const [askList, setAskList] = useState<any>([])

    const { id } = useParams()

    useEffect(() => {
        let list: any = localStorage.getItem(`askList${id}`)
        list = JSON.parse(list)
        setAskList(list)
    }, [])

    const createAskAnswer = () => {
        let arr: any = localStorage.getItem(`askList${id}`) || []
        if (arr.length !== 0) {
            arr = JSON.parse(arr)
        }
        let correctOne = 'No'
        let correctTwo = 'No'
        let correctThree = 'No'
        let correctFour = 'No'
        if (answerBoolOne === true) {
            correctOne = 'Yes'
        } else if (answerBoolTwo === true) {
            correctTwo = 'Yes'
        } else if (answerBoolThree === true) {
            correctThree = 'Yes'
        } else if (answerBoolFour === true) {
            correctFour = 'Yes'
        }
        arr.push({ id: id, ask: ask, answer1: answerOne, answerCorrectOne: correctOne, answer2: answerTwo, answerCorrectTwo: correctTwo, answer3: answerThree, answerCorrectThree: correctThree, answer4: answerFour, answerCorrectFour: correctFour, mark: mark })
        localStorage.setItem(`askList${id}`, JSON.stringify(arr))
        setIsAddAsk(false)
    }

    const deleteAks = (ask: any) => {
        let newList = askList.filter((f: any) => f.ask !== ask)
        localStorage.setItem(`askList${id}`, JSON.stringify(newList))
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-96 h-auto flex flex-col justify-center items-center gap-10'>
                <div className='text-xl'>Create Ask {id}</div>
                <div className='text-black cursor-pointer' onClick={() => setIsAddAsk(true)}><IoMdAdd size={28} /></div>
                <div className='flex gap-10'>
                    {askList !== null ?
                        askList.map((item: any, idx: any) => (
                            <div key={idx}>
                                <div>{item.ask} <MdDeleteOutline onClick={() => deleteAks(item.ask)} size={22} /></div>
                                <div>
                                    <p>{item.answer1}: {item.answerCorrectOne}</p>
                                    <p>{item.answer2}: {item.answerCorrectTwo}</p>
                                    <p>{item.answer3}: {item.answerCorrectThree}</p>
                                    <p>{item.answer4}: {item.answerCorrectFour}</p>
                                </div>
                                <div>Mark:{item.mark}</div>
                            </div>
                        ))
                        :
                        <></>
                    }
                </div>
                {isAddAsk ?
                    <div className='flex flex-col gap-2'>
                        <label>Ask</label>
                        <input className='input' type="text" onChange={(e) => setAsk(e.target.value)} />
                        <div className='flex flex-col gap-2'>
                            <label>Answer 1</label>
                            <input className='input' type="text" onChange={(e) => setAnswerOne(e.target.value)} />
                            <div className='flex gap-2'>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolOne(true)} />
                                    <label>True</label>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolOne(false)} />
                                    <label>False</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Answer 2</label>
                            <input className='input' type="text" onChange={(e) => setAnswerTwo(e.target.value)} />
                            <div className='flex gap-2'>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolTwo(true)} />
                                    <label>True</label>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolTwo(false)} />
                                    <label>False</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Answer 3</label>
                            <input className='input' type="text" onChange={(e) => setAnswerThree(e.target.value)} />
                            <div className='flex gap-2'>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolThree(true)} />
                                    <label>True</label>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolThree(false)} />
                                    <label>False</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label>Answer 4</label>
                            <input className='input' type="text" onChange={(e) => setAnswerFour(e.target.value)} />
                            <div className='flex gap-2'>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolFour(true)} />
                                    <label>True</label>
                                </div>
                                <div className='flex gap-2'>
                                    <input type="radio" onChange={(e) => setAnswerBoolFour(false)} />
                                    <label>False</label>
                                </div>
                            </div>
                        </div>
                        Rating
                        <input className='input' type="text" onChange={(e) => setMark(e.target.value)} />
                        <button className='btn btn-green' onClick={createAskAnswer}>Add</button>
                    </div>
                    :
                    <></>}
            </div>
        </div>
    )
}

export default CreateAsk