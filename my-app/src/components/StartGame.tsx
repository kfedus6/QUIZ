import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const StartGame: React.FC = () => {
    const [isGame, setIsGame] = useState<boolean>(false)
    const [askList, setAskList] = useState<any>([])
    const [gameAskRandom, setGameAskRandom] = useState<any>()
    const [gamesAsks, setGamesAsks] = useState<any>([])
    const [resultAsk, setResultAsk] = useState<any>([])
    const [countQuestions, setCountQuestions] = useState<number>(1)
    const [yourChoose, setYourChoose] = useState<any>('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let list: any = localStorage.getItem(`askList${id}`)
        list = JSON.parse(list)
        setAskList(list)
    }, [])

    useEffect(() => {
        const random = Math.floor(Math.random() * askList.length)
        const randomGameQuestion = askList[random]
        setGameAskRandom(randomGameQuestion)
        const filteredGameAsk = askList.filter((item: any) => item.ask !== randomGameQuestion.ask)
        setGamesAsks(filteredGameAsk)
    }, [askList])

    const randomAsks = () => {
        let objQuestion = { id: gameAskRandom.id, ask: gameAskRandom.ask, answer1: gameAskRandom.answer1, answer2: gameAskRandom.answer2, answer3: gameAskRandom.answer3, answer4: gameAskRandom.answer4, answerCorrectOne: gameAskRandom.answerCorrectOne, answerCorrectTwo: gameAskRandom.answerCorrectTwo, answerCorrectThree: gameAskRandom.answerCorrectThree, answerCorrectFour: gameAskRandom.answerCorrectFour, mark: gameAskRandom.mark, yourAnswer: yourChoose }
        resultAsk.push(objQuestion)
        console.log(resultAsk, 'ARRASK')
        const random = Math.floor(Math.random() * gamesAsks.length)
        const randomGameQuestion = gamesAsks[random]
        setGameAskRandom(randomGameQuestion)
        const filteredGameQuestions = gamesAsks.filter((item: any) => item.ask !== randomGameQuestion.ask)
        setGamesAsks(filteredGameQuestions)
        setCountQuestions(countQuestions + 1)
        setYourChoose('')
    }

    return (
        <div className='h-96 w-full flex justify-center items-center'>
            <div className='w-1/2 flex flex-col justify-center items-center gap-5'>
                {!isGame ?
                    <div className='flex flex-col gap-5'>
                        <span className='text-lg'>Are you ready?</span>
                        <div className='flex gap-5'>
                            <button onClick={() => setIsGame(true)} className='btn btn-blue'>Yes</button>
                            <button onClick={() => navigate(-1)} className='btn btn-red'>No</button>
                        </div>
                    </div>
                    :
                    askList.length < countQuestions ? <>Hello</>
                        :
                        <div className='w-full flex flex-col gap-5'>
                            <div className='flex flex-col gap-3'>
                                <span className='text-xl'>{id} Quiz</span>
                                <span className='text-lg'>{!askList ? <></> : `Questions ${countQuestions}/${askList.length}`} </span>
                            </div>
                            <div>{!gameAskRandom ? <></> : gameAskRandom.ask}=?</div>
                            <form className='bg-slate-200 p-3 gap-3 rounded-md'>
                                {!gameAskRandom ? <></> :
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex gap-5'>
                                            <input id='radioOne' name='question' type="radio" checked={!gameAskRandom ? yourChoose : yourChoose === gameAskRandom.answer1} value={gameAskRandom.answer1} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioOne'>{!gameAskRandom ? <></> : gameAskRandom.answer1}</label>
                                        </div>
                                        <div className='flex gap-5'>
                                            <input id='radioTwo' name='question' type="radio" checked={yourChoose === gameAskRandom.answer2} value={gameAskRandom.answer2} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioTwo'>{!gameAskRandom ? <></> : gameAskRandom.answer2}</label>
                                        </div>
                                        <div className='flex gap-5'>
                                            <input id='radioThree' name='question' type="radio" checked={yourChoose === gameAskRandom.answer3} value={gameAskRandom.answer3} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioThree'>{!gameAskRandom ? <></> : gameAskRandom.answer3}</label>
                                        </div>
                                        <div className='flex gap-5'>
                                            <input id='radioFour' name='question' type="radio" checked={yourChoose === gameAskRandom.answer4} value={gameAskRandom.answer4} onChange={(e) => setYourChoose(e.target.value)} />
                                            <label htmlFor='radioFour'>{!gameAskRandom ? <></> : gameAskRandom.answer4}</label>
                                        </div>
                                    </div>
                                }
                            </form>
                            <div>
                                <button type='reset' className='btn btn-green' onClick={randomAsks}>Next</button>
                            </div>
                        </div>
                }
            </div>
        </div >
    )
}

export default StartGame