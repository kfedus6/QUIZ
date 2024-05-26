import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 } from 'uuid';

const StartGame: React.FC = () => {
    const [isGame, setIsGame] = useState<boolean>(false)
    const [questionList, setQuestionList] = useState<any>([])
    const [gameQuestionRandom, setGameQuestionRandom] = useState<any>()
    const [gamesQuestions, setGamesQuestions] = useState<any>([])
    const [resultQuestion, setResultQuestion] = useState<any>([])
    const [resultQuiz, setResultQuiz] = useState<any>([])
    const [countQuestions, setCountQuestions] = useState<number>(1)
    const [yourChoose, setYourChoose] = useState<any>('')
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [marksAlls, setMarksAlls] = useState<number>(0)
    const [customId, setCustomId] = useState<any>('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let list: any = localStorage.getItem(`list${id}`)
        list = JSON.parse(list)
        setQuestionList(list)
    }, [])

    useEffect(() => {
        const random = Math.floor(Math.random() * questionList.length)
        const randomGameQuestion = questionList[random]
        setGameQuestionRandom(randomGameQuestion)
        const filteredGameQuestion = questionList.filter((item: any) => item.question !== randomGameQuestion.question)
        setGamesQuestions(filteredGameQuestion)
    }, [questionList])

    const randomQuestions = () => {
        let objResultQuestion = { id: customId, question: gameQuestionRandom.question, answer1: gameQuestionRandom.answer1, answer2: gameQuestionRandom.answer2, answer3: gameQuestionRandom.answer3, answer4: gameQuestionRandom.answer4, answerCorrectOne: gameQuestionRandom.answerCorrectOne, answerCorrectTwo: gameQuestionRandom.answerCorrectTwo, answerCorrectThree: gameQuestionRandom.answerCorrectThree, answerCorrectFour: gameQuestionRandom.answerCorrectFour, mark: gameQuestionRandom.mark, yourAnswer: yourChoose }
        resultQuestion.push(objResultQuestion)
        let arr: any = localStorage.getItem('historyQuiz') || []
        if (arr.length !== 0) {
            arr = JSON.parse(arr)
        }
        arr.push(objResultQuestion)
        localStorage.setItem('historyQuiz', JSON.stringify(arr))
        let marksResult: any = 0
        let correctAnswer: any = 0
        if (questionList.length <= countQuestions) {
            resultQuestion.map((item: any, idx: any) => {
                if (item.answer1 === item.yourAnswer && item.answerCorrectOne === "Yes") {
                    marksResult += +item.mark
                    correctAnswer++
                } else if (item.answer2 === item.yourAnswer && item.answerCorrectTwo === "Yes") {
                    marksResult += +item.mark
                    correctAnswer++
                } else if (item.answer3 === item.yourAnswer && item.answerCorrectThree === "Yes") {
                    marksResult += +item.mark
                    correctAnswer++
                } else if (item.answer4 === item.yourAnswer && item.answerCorrectFour === "Yes") {
                    marksResult += +item.mark
                    correctAnswer++
                }
            })
            let marksAll = resultQuestion.reduce((prev: any, acc: any) => prev += +acc.mark, 0)
            let result = { id: customId, topic: id, second: seconds, minute: minutes, marks: marksResult, correctAnswer: correctAnswer, listLength: questionList.length, marksAll: marksAll }
            let arr: any = localStorage.getItem('resultQuiz') || []
            if (arr.length !== 0) {
                arr = JSON.parse(arr)
            }
            arr.push(result)
            localStorage.setItem('resultQuiz', JSON.stringify(arr))
            setResultQuiz(result)
            setMarksAlls(marksAll)
        }
        const random = Math.floor(Math.random() * gamesQuestions.length)
        const randomGameQuestion = gamesQuestions[random]
        setGameQuestionRandom(randomGameQuestion)
        const filteredGameQuestions = gamesQuestions.filter((item: any) => item.question !== randomGameQuestion.question)
        setGamesQuestions(filteredGameQuestions)
        setCountQuestions(countQuestions + 1)
        setYourChoose('')
    }

    useEffect(() => {
        let timer: any = setInterval(() => {
            setSeconds(seconds + 1)

            if (seconds === 59) {
                setMinutes(minutes + 1)
                setSeconds(0)
            }
        }, 1000)

        if (questionList.length < countQuestions) {
            clearInterval(timer)
        } else {
            return () => clearInterval(timer)
        }
    }, [isGame, seconds])

    const uuidCustom = () => {
        const id = v4()
        setCustomId(id)
        setIsGame(true)
    }

    return (
        <div className='h-96 w-full flex justify-center items-center'>
            <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                {!isGame ?
                    <div className='flex flex-col gap-5'>
                        <span className='text-lg'>Are you ready?</span>
                        <div className='flex gap-5'>
                            <button onClick={uuidCustom} className='btn btn-blue'>Yes</button>
                            <button onClick={() => navigate(-1)} className='btn btn-red'>No</button>
                        </div>
                    </div>
                    :
                    questionList.length < countQuestions ?
                        <div className='flex flex-col gap-5'>
                            <div className='text-xl'>Your Result</div>
                            <div className='flex gap-3 text-md'>
                                <span>Topic: {id}</span>
                                <span>Correct: {resultQuiz.correctAnswer}/{questionList.length}</span>
                                <span>Mark: {resultQuiz.marks}/{marksAlls}</span>
                                <span>Time: {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
                            </div>
                            <div className='flex gap-5'>
                                <button className='btn btn-blue' onClick={() => navigate('/history')}>History</button>
                                <button className='btn btn-red' onClick={() => navigate('/')}>Back</button>
                            </div>
                        </div>
                        :
                        <div className='w-full flex flex-col gap-5'>
                            <div className='flex flex-col gap-3'>
                                <span className='text-xl'>{id} Quiz</span>
                                <span className='text-lg'>{!questionList ? <></> : `Questions ${countQuestions}/${questionList.length}`} </span>
                            </div>
                            <div>{!gameQuestionRandom ? <></> : gameQuestionRandom.question}</div>
                            <form className='bg-slate-200 p-3 gap-3 rounded-md'>
                                {!gameQuestionRandom ? <></> :
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex gap-5'>
                                            <input id='radioOne' name='question' type="radio" checked={!gameQuestionRandom ? yourChoose : yourChoose === gameQuestionRandom.answer1} value={gameQuestionRandom.answer1} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioOne'>{!gameQuestionRandom ? <></> : gameQuestionRandom.answer1}</label>
                                        </div>
                                        <div className='flex gap-5'>
                                            <input id='radioTwo' name='question' type="radio" checked={yourChoose === gameQuestionRandom.answer2} value={gameQuestionRandom.answer2} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioTwo'>{!gameQuestionRandom ? <></> : gameQuestionRandom.answer2}</label>
                                        </div>
                                        <div className='flex gap-5'>
                                            <input id='radioThree' name='question' type="radio" checked={yourChoose === gameQuestionRandom.answer3} value={gameQuestionRandom.answer3} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioThree'>{!gameQuestionRandom ? <></> : gameQuestionRandom.answer3}</label>
                                        </div>
                                        <div className='flex gap-5'>
                                            <input id='radioFour' name='question' type="radio" checked={yourChoose === gameQuestionRandom.answer4} value={gameQuestionRandom.answer4} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioFour'>{!gameQuestionRandom ? <></> : gameQuestionRandom.answer4}</label>
                                        </div>
                                    </div>
                                }
                            </form>
                            <div className='flex justify-between items-center'>
                                <button type='reset' className='btn btn-green' onClick={randomQuestions}>Next</button>
                                <div>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
                            </div>
                        </div>
                }
            </div>
        </div >
    )
}

export default StartGame