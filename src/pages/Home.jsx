import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import mfi_banner from '../assets/MFIat50_white_tagline_FA.png'
import background from '../assets/2.jpg'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { Widgets } from '@mui/icons-material'
import { leaderboards } from '../api/games'
import { toast } from 'react-toastify'

export default function Home() {
    const navigate = useNavigate()
    const [leaders, setLeaders] = useState({})
    const [isOnline, setIsOnline] = useState(false)
    useEffect(() => {
        leaderboards().then(res => {
            if(res?.ok){
                setLeaders(res.data)
                setIsOnline(true)
            }
            else{
                toast.error(res?.message ?? "Failed to fetch the leaderboards.")
            }
        })
    }, [])
    return (
        <>
            <Box>
                <Typography sx={{ textAlign: 'center', my: 2 }} variant="h2">
                    Games
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Box sx={{ background: '#666699', height: '300px', width: '400px', position: 'relative', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => navigate("/number")}>
                        <Typography color="white" align="center" variant="h3">
                            3050<sub style={{fontSize: 10}}>16</sub>
                        </Typography>
                        <Box sx={{ position: 'absolute', bottom: 0, width: 'inherit', background: 'rgba(0,0,0, .2)', color: 'white' }}>
                            <Typography align="center" fontSize={20} component="div">
                                Number Memory
                            </Typography>
                            <Typography align="center" fontSize={14} component="div">
                                Remember the longest number you can.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ background: '#7a67a6', height: '300px', width: '400px', position: 'relative', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => navigate("/sequence")}>
                        <Box>
                            <Widgets sx={{width: '100px', height: '100px', color: 'white'}} />
                        </Box>
                        <Box sx={{ position: 'absolute', bottom: 0, width: 'inherit', background: 'rgba(0,0,0, .2)', color: 'white' }}>
                            <Typography align="center" fontSize={20} component="div">
                                Sequence Memory
                            </Typography>
                            <Typography align="center" fontSize={14} component="div">
                                Remember an increasingly long pattern of button presses.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {
                    isOnline ? 
                    <Box sx={{my: 4}}>
                        <Typography align="center" variant="h2">
                            Leaderboards
                        </Typography>
                        <Box sx={{display: 'flex', justifyContent: 'center', gap: 3}}>
                            <Box sx={{width: '400px'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <Typography align="center" variant="h5">
                                                    Number Memory
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{background: 'grey'}}>
                                            <TableCell>
                                                <Typography sx={{fontWeight: 'bold'}} align="center">
                                                    Rank
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{fontWeight: 'bold'}} align="center">
                                                    Name
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{fontWeight: 'bold'}} align="center">
                                                    Score
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaders?.number_memory?.map((p, index) => (
                                            <TableRow sx={{color: index === 0 ? "gold" : (index === 1 ? "silver" : (index === 2 ? "#804a00" : "black")), background: "grey"}} key={p.id}>
                                                <TableCell sx={{color: 'inherit', textShadow: index === 0 ? "0px 0px 3px gold" : (index === 1 ? "0px 0px 3px silver" : (index === 2 ? "0px 0px 3px #804a00" : "none"))}} align="center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell sx={{color: 'inherit', textShadow: index === 0 ? "0px 0px 3px gold" : (index === 1 ? "0px 0px 3px silver" : (index === 2 ? "0px 0px 3px #804a00" : "none"))}} align="center">
                                                    {p.display_name}
                                                </TableCell>
                                                <TableCell sx={{color: 'inherit', textShadow: index === 0 ? "0px 0px 3px gold" : (index === 1 ? "0px 0px 3px silver" : (index === 2 ? "0px 0px 3px #804a00" : "none"))}} align="center">
                                                    {p.score}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                            
                            <Box sx={{width: '400px'}}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <Typography align="center" variant="h5">
                                                    Sequence Memory
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{background: 'grey'}}>
                                            <TableCell>
                                                <Typography sx={{fontWeight: 'bold'}} align="center">
                                                    Rank
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{fontWeight: 'bold'}} align="center">
                                                    Name
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography sx={{fontWeight: 'bold'}} align="center">
                                                    Score
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaders?.sequence_memory?.map((p, index) => (
                                            <TableRow sx={{color: index === 0 ? "gold" : (index === 1 ? "silver" : (index === 2 ? "#804a00" : "black")), background: "grey"}} key={p.id}>
                                                <TableCell sx={{color: 'inherit', textShadow: index === 0 ? "0px 0px 3px gold" : (index === 1 ? "0px 0px 3px silver" : (index === 2 ? "0px 0px 3px #804a00" : "none"))}} align="center">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell sx={{color: 'inherit', textShadow: index === 0 ? "0px 0px 3px gold" : (index === 1 ? "0px 0px 3px silver" : (index === 2 ? "0px 0px 3px #804a00" : "none"))}} align="center">
                                                    {p.display_name}
                                                </TableCell>
                                                <TableCell sx={{color: 'inherit', textShadow: index === 0 ? "0px 0px 3px gold" : (index === 1 ? "0px 0px 3px silver" : (index === 2 ? "0px 0px 3px #804a00" : "none"))}} align="center">
                                                    {p.score}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Box>
                    </Box>
                    :
                    <Box sx={{mt: 4}}>
                        <Typography variant="h3" align="center">
                            Waiting to connect to internet...
                        </Typography>
                    </Box>
                }
            </Box>
        </>
    )
}
