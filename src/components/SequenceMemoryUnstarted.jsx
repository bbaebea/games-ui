import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { status } from '../constants/gameconstants'

export default function SequenceMemoryUnstarted({setGameStatus, navigate}) {
  return (
    <>
        <Typography align="center" variant="h1" color="white">
            Sequence Memory
        </Typography>
        <Typography align="center" color="white" variant="h4">
            Remember the sequence.
        </Typography>
        <Box sx={{display: 'flex', gap: 2}}>
            <Button onClick={() => setGameStatus(status.REMEMBER)} variant="contained" color="warning">
                Start
            </Button>
            <Button onClick={() => navigate("/")} variant="contained" color="error">
                Exit
            </Button>
        </Box>
    </>
  )
}
