import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const CreateAsk: React.FC = () => {
    const [question, setQuestion] = useState<string>('')
    const [answerOne, setAnswerOne] = useState<any>()
    const [answerTwo, setAnswerTwo] = useState<any>()
    const [answerThree, setAnswerThree] = useState<any>()
    const [answerFour, setAnswerFour] = useState<any>()
    const [answerBoolOne, setAnswerBoolOne] = useState<boolean>(false)
    const [answerBoolTwo, setAnswerBoolTwo] = useState<boolean>(false)
    const [answerBoolThree, setAnswerBoolThree] = useState<boolean>(false)
    const [answerBoolFour, setAnswerBoolFour] = useState<boolean>(false)
    const [isAddQuestion, setIsAddQuestion] = useState<boolean>(false)
    const [mark, setMark] = useState<string>('')
    const [questionsList, setQuestionsList] = useState<any>([])

    const { id } = useParams()

    useEffect(() => {
        let list: any = localStorage.getItem(`list${id}`)
        list = JSON.parse(list)
        setQuestionsList(list)
    }, [])

    const createQuestionAnswer = () => {
        let arr: any = localStorage.getItem(`list${id}`) || []
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
        arr.push({ id: id, question: question, answer1: answerOne, answerCorrectOne: correctOne, answer2: answerTwo, answerCorrectTwo: correctTwo, answer3: answerThree, answerCorrectThree: correctThree, answer4: answerFour, answerCorrectFour: correctFour, mark: mark })
        localStorage.setItem(`list${id}`, JSON.stringify(arr))
        setIsAddQuestion(false)
    }

    const deleteQuestion = (question: any) => {
        let newList = questionsList.filter((f: any) => f.question !== question)
        localStorage.setItem(`list${id}`, JSON.stringify(newList))
    }

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-1/2 flex flex-col justify-center items-center gap-10'>
                <div className='text-xl'>Create Ask {id}</div>
                <div className='text-black cursor-pointer' onClick={() => setIsAddQuestion(true)}><IoMdAdd size={28} /></div>
                <div className='flex w-full flex-col gap-10'>
                    {questionsList !== null ?
                        questionsList.map((item: any, idx: any) => (
                            <div key={idx} className='w-full flex flex-col bg-slate-200 p-3 gap-3 rounded-md'>
                                <div className='flex gap-10'>{item.question} <MdDeleteOutline onClick={() => deleteQuestion(item.question)} size={22} /></div>
                                <div className='flex flex-col gap-1'>
                                    <p className={item.answerCorrectOne === "Yes" ? 'bg-green-300' : ''}>{item.answer1}</p>
                                    <p className={item.answerCorrectTwo === "Yes" ? 'bg-green-300' : ''}>{item.answer2}</p>
                                    <p className={item.answerCorrectThree === "Yes" ? 'bg-green-300' : ''}>{item.answer3}</p>
                                    <p className={item.answerCorrectFour === "Yes" ? 'bg-green-300' : ''}>{item.answer4}</p>
                                </div>
                                <div>Mark:{item.mark}</div>
                            </div>
                        ))
                        :
                        <></>
                    }
                </div>
                {isAddQuestion ?
                    <div className='flex flex-col gap-2'>
                        <label>Question</label>
                        <input className='input' type="text" onChange={(e) => setQuestion(e.target.value)} />
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
                        <button className='btn btn-green' onClick={createQuestionAnswer}>Add</button>
                    </div>
                    :
                    <></>}
            </div>
        </div>
    )
}

export default CreateAsk