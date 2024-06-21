import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { sequence_animation, status } from '../constants/gameconstants'
import { useNavigate } from 'react-router-dom'
import SequenceMemoryRemember from '../components/SequenceMemoryRemember'
import SequenceMemoryUnstarted from '../components/SequenceMemoryUnstarted'
import gsap from 'gsap'
import Save from '../dialogs/Save'
import { store } from '../api/games'
import $ from 'jquery'
import { toast } from 'react-toastify'

export default function SequenceMemory() {
    const [gameStatus, setGameStatus] = useState(status.UNSTARTED)
    const navigate = useNavigate()
    const [round, setRound] = useState(1)
    const [pattern, setPattern] = useState([])
    const [input, setInput] = useState([])
    const [score, setScore] = useState(0)
    const [save, setSave] = useState(false)
    const [loading, setLoading] = useState(false)
    const [warnings, setWarnings] = useState({})
    const tl = gsap.timeline()
    const playAnimation = (arr) => {
        setTimeout(() => {
            arr.forEach((a, index) => {
                tl.to(`#cell-${a}`, {
                    background: '#ff6666dd',
                    duration: sequence_animation
                })
                tl.to(`#cell-${a}`, {
                    background: '#6b82e2',
                    duration: sequence_animation,
                    onStart: () => {
                        if (index + 1 === arr.length) {
                            setGameStatus(status.INPUT)
                        }
                    }
                })
            })
        }, 200)
    }

    const nextLevel = () => {
        setTimeout(() => {
            setRound(round + 1)
            setInput([])
            setGameStatus(status.REMEMBER)
        }, 1000)
    }

    const onInputClick = (e) => {
        if (gameStatus === status.INPUT) {
            const target = e.currentTarget
            const data = +target.getAttribute('data')
            const tempInput = [...input]
            if (data === pattern[tempInput.length]) {
                tempInput.push(data)
                setScore(score + 1)
                setInput(tempInput)
                if (tempInput.length === pattern.length) {
                    nextLevel()
                    gsap.to("#main-bg", {
                        background: '#66996699',
                        duration: .3,
                        onComplete: () => {
                            gsap.to("#main-bg", {
                                background: "#6b82e2",
                                duration: .2
                            })
                        }
                    })
                }
            }
            else {
                setGameStatus(status.ENDED)
            }
            gsap.to(target, {
                background: '#ffffff',
                duration: .3,
                onComplete: () => {
                    gsap.to(target, {
                        background: "#00000000",
                        duration: .2
                    })
                }
            })
        }
    }

    const onPlayAgain = () => {
        setRound(1)
        setPattern([])
        setInput([])
        setScore(0)
        setGameStatus(status.UNSTARTED)
    }

    const generatePattern = useCallback(() => {
        const arr = [...pattern]
        for (let i = pattern.length; i < round; i++) {
            arr.push(Math.floor(Math.random() * 9) + 1)
        }
        setPattern(arr)
        playAnimation(arr)
    }, [round, pattern])

    useEffect(() => {
        if (gameStatus === status.REMEMBER) {
            generatePattern()
        }
    }, [round, gameStatus])

    useEffect(() => {
        return () => {
            tl.kill()
        }
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
                score: score,
                game_id: 3,
            }
            setLoading(true)
            store(body).then(res => {
                if(res?.ok){
                    onPlayAgain()
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


    return (
        <>
            <Box id="main-bg" sx={{ minHeight: '100vh', background: '#6b82e2', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                {
                    gameStatus === status.UNSTARTED ? (
                        <SequenceMemoryUnstarted setGameStatus={setGameStatus} navigate={navigate} />
                    )
                        :
                        gameStatus === status.ENDED ?
                            <>
                                <Typography variant="h1" color="white">
                                    Score {score}
                                </Typography>
                                <Typography variant="h2" color="white">
                                    Game Over
                                </Typography>
                                <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                                    <Button onClick={onPlayAgain} variant="contained" color="warning">
                                        Play Again
                                    </Button>
                                    <Button onClick={() => setSave(true)} variant="contained" color="success">
                                        Save
                                    </Button>
                                </Box>
                                <Save warnings={warnings} onSubmit={onSubmitToLeaderBoards} title={`Score ${score}`} open={save} onClose={() => setSave(false)}  />
                            </>
                            :
                            <SequenceMemoryRemember round={round} onInputClick={onInputClick} />
                }
            </Box>
        </>
    )
}
