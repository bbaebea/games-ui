import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { min_duration, status } from '../constants/gameconstants'
import gsap from 'gsap'
import $ from 'jquery'
import Save from '../dialogs/Save'
import { storeNumberMemory } from '../api/games'
import { toast } from 'react-toastify'

export default function NumberMemory() {
    const [gameStatus, setGameStatus] = useState(status.UNSTARTED)
    const [round, setRound] = useState(0)
    const [numbers, setNumbers] = useState([])
    const [answer, setAnswer] = useState("")
    const [save, setSave] = useState(false)
    const [loading, setLoading] = useState(false)
    const [warnings, setWarnings] = useState({})
    const [score, setScore] = useState(0)
    const input_field = useRef()


    const randomize = useCallback((round) => {
        const temp = []
        for (let i = 0; i < round; i++) {
            temp.push(Math.floor(Math.random() * 10))
        }
        setNumbers(temp)
    }, [])

    const onSubmitToLeaderBoards = useCallback((e) => {
        e.preventDefault()
        if(!loading){
            const body = {
                display_name: $("#display_name").val(),
                first_name: $("#first_name").val(),
                last_name: $("#last_name").val(),
                contact_number: $("#contact_number").val(),
                email: $("#email").val(),
                score: score
            }
            setLoading(true)
            storeNumberMemory(body).then(res => {
                if(res?.ok){
                    setGameStatus(status.UNSTARTED)
                    setScore(0)
                    setSave(false)
                    setWarnings({})
                    toast.success("Score is added to the leaderboard.")
                }
                else{
                    if(res?.errors){
                        setWarnings(res.errors)
                    }
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [score, loading])


    const gameStart = useCallback(() => {
        randomize(1)
        setRound(1)
        setGameStatus(status.REMEMBER)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if(input_field.current.value === numbers.join("")){
            setGameStatus(status.REST)
            setScore(score + round)
        }
        else{
            setGameStatus(status.ENDED)
            let tempScore = score
            input_field.current.value.split("").forEach((v, index) => {
                if(+v === numbers[index]){
                    tempScore += 1
                }
            })
            setScore(tempScore)
        }
        setAnswer(input_field.current.value)
        
    }
    const onNext = () => {
        randomize(round + 1)
        setRound(round + 1)
        setGameStatus(status.REMEMBER)
    }

    useEffect(() => {
        if(gameStatus === status.REMEMBER){
            gsap.to("#loading-bar", {
                width: 0,
                duration: Math.max(min_duration, numbers.length),
                onComplete: () => {
                    setGameStatus(status.INPUT)
                }
            })
        }
    }, [gameStatus, numbers])

    useEffect(() => {
        if(gameStatus === status.INPUT){
            $("#input_field").trigger("select")
        }
        else if(gameStatus === status.REST){
            $("#next-button").trigger("focus")
        }
    }, [gameStatus])
    return (
        <Box sx={{ background: '#6b82e2', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {gameStatus === status.UNSTARTED ?
                <>
                    <Typography align="center" variant="h1" color="white">
                        Number Memory
                    </Typography>
                    <Typography align="center" color="white" variant="h4">
                        The average person can only remember 7 digit numbers reliably, can you do more?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button sx={{ mt: 2 }} onClick={gameStart} color="warning" variant="contained">
                            Start
                        </Button>
                        <Link to="/">
                            <Button sx={{ mt: 2 }} color="error" variant="contained">
                                Exit
                            </Button>
                        </Link>
                    </Box>
                </>
                :
                (
                    gameStatus === status.REMEMBER ? (
                        <>
                            <Typography variant="h1" color="white" sx={{pb: 0, userSelect:'none'}} >
                                {numbers.join("")}
                            </Typography>
                            <Box id="loading-bar" sx={{width: '150px', borderTop: '5px solid white'}} />
                        </>
                    ) : 
                    (
                        gameStatus === status.INPUT ? (
                            <>
                                <Box onSubmit={onSubmit} component="form" sx={{display: 'flex', flexDirection: 'column'}}>
                                    <TextField autoFocus autoComplete="off" required sx={{width: '500px'}} inputProps={{sx: {textAlign: 'center', color: 'white', fontSize: 28}, ref: input_field, id: 'input_field'}} />
                                    <Box align="center">
                                        <Button type="submit" sx={{mt: 1}} color="warning" variant="contained">
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            </>
                        )
                        :
                        (
                            gameStatus === status.REST ?(

                                <>
                                    <Typography color="white" variant="h4"  sx={{fontWeight: 'normal'}}>
                                        Number
                                    </Typography>
                                    <Typography color="white" variant="h3">
                                        {numbers.join("")}
                                    </Typography>
                                    <Typography color="white" variant="h4"  sx={{fontWeight: 'normal'}}>
                                        Your Number
                                    </Typography>
                                    <Typography color="white" variant="h3">
                                        {answer}
                                    </Typography>
                                    <Typography sx={{my: 3}} color="white" variant="h2">
                                        Level {round}
                                    </Typography>
                                    <Box>
                                        <Button id="next-button" onClick={onNext} color="warning" variant="contained">
                                            Next
                                        </Button>
                                    </Box>
                                </>
                            )
                            :
                            <>
                            
                                <Typography color="white" variant="h4"  sx={{fontWeight: 'normal'}}>
                                    Number
                                </Typography>
                                <Typography color="white" variant="h3">
                                    {numbers.join("")}
                                </Typography>
                                <Typography color="white" variant="h4"  sx={{fontWeight: 'normal'}}>
                                    Your Number
                                </Typography>
                                <Typography color="white" variant="h3">
                                    {answer.split("").map((ans, index) => (
                                        <span key={index} style={{color: +ans === numbers[index] ? "white" : "#ee3333", textDecoration: +ans !== numbers[index] ?  'underline' : "none"}}>
                                            {ans}
                                        </span>
                                    ))}
                                </Typography>
                                <Typography sx={{my: 3}} color="white" variant="h2">
                                    Score {score}
                                </Typography>
                                <Box>
                                    <Box align="center">
                                        <Button onClick={() => setGameStatus(status.UNSTARTED)} color="warning" variant="contained">
                                            Try Again
                                        </Button>
                                    </Box>
                                    <Box sx={{textAlign: 'center'}}>
                                        <Button onClick={() => setSave(true)} color="success" variant="contained" sx={{mt: 2}}>
                                            Save
                                        </Button>
                                    </Box>
                                </Box>

                            </>
                        )
                    )
                )
            }
            <Save warnings={warnings} loading={loading} onSubmit={onSubmitToLeaderBoards} title={`Your score is ${score}`} open={save} onClose={() => setSave(false)} />
        </Box>
    )
}
