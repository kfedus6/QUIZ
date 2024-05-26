import React, { useEffect, useState } from 'react'

const History: React.FC = () => {
    const [listResultsQuiz, setListResultsQuiz] = useState<any>([])
    const [listHistoryQuiz, setListHistoryQuiz] = useState<any>([])
    const [isListHistoryQuiz, setIsListHistoryQuiz] = useState<boolean>(false)

    useEffect(() => {
        let list: any = localStorage.getItem('resultQuiz')
        list = JSON.parse(list)
        setListResultsQuiz(list)
    }, [])

    const getListHiatoryQuiz = (id: any) => {
        let list: any = localStorage.getItem('historyQuiz')
        list = JSON.parse(list)
        const filteredListHistoryQuiz = list.filter((item: any) => item.id === id)
        setListHistoryQuiz(filteredListHistoryQuiz)
        console.log(filteredListHistoryQuiz)
        setIsListHistoryQuiz(!isListHistoryQuiz)
    }

    return (
        <div className='h-96 w-full flex justify-center items-center'>
            <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                <div className='text-lg'>History</div>
                <div className='flex flex-col gap-5 relative'>
                    {listResultsQuiz.map((item: any, idx: any) => (
                        <div onClick={() => getListHiatoryQuiz(item.id)} className='flex gap-11 cursor-pointer bg-blue-200 hover:bg-blue-300 transform ease-out duration-300 p-3 rounded-md' key={idx}>
                            <span>Topic: {item.topic}</span>
                            <span>Correct: {item.correctAnswer}/{item.listLength}</span>
                            <span>Mark: {item.marks}/{item.marksAll}</span>
                            <span>Time: {item.minute < 10 ? '0' + item.minute : item.minute}:{item.second < 10 ? '0' + item.second : item.second}</span>
                        </div>
                    ))}
                    {!isListHistoryQuiz ? <></> :
                        <div className='absolute left-0 top-11 w-full bg-white m-0 p-0 shadow-inner z-50 rounded-md'>
                            {listHistoryQuiz.map((item: any, idx: any) => (
                                <div key={idx} className='p-2 flex flex-col gap-5 bg-blue-100'>
                                    <div>{item.question}</div>
                                    <div className='flex flex-col gap-2'>
                                        <div className={item.answer1 === item.yourAnswer && item.answerCorrectOne === "Yes" ? 'bg-green-300' : item.answer1 === item.yourAnswer && item.answerCorrectOne === "No" ? 'bg-rose-300' : item.answerCorrectOne === "Yes" ? 'bg-green-300' : ''}>{item.answer1}</div>
                                        <div className={item.answer2 === item.yourAnswer && item.answerCorrectTwo === "Yes" ? 'bg-green-300' : item.answer2 === item.yourAnswer && item.answerCorrectTwo === "No" ? 'bg-rose-300' : item.answerCorrectTwo === "Yes" ? 'bg-green-300' : ''}>{item.answer2}</div>
                                        <div className={item.answer3 === item.yourAnswer && item.answerCorrectThree === "Yes" ? 'bg-green-300' : item.answer3 === item.yourAnswer && item.answerCorrectThree === "No" ? 'bg-rose-300' : item.answerCorrectThree === "Yes" ? 'bg-green-300' : ''}>{item.answer3}</div>
                                        <div className={item.answer4 === item.yourAnswer && item.answerCorrectFour === "Yes" ? 'bg-green-300' : item.answer4 === item.yourAnswer && item.answerCorrectFour === "No" ? 'bg-rose-300' : item.answerCorrectFour === "Yes" ? 'bg-green-300' : ''}>{item.answer4}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default History