import { Box, Typography } from '@mui/material'
import React from 'react'

export default function SequenceMemoryRemember({onInputClick, round}) {
    return (
        <>
            <Box>
                <Typography sx={{fontSize: 30, color: 'white'}}>
                    Level {round}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box onClick={onInputClick} id="cell-7" data={7} className="sequence-cell" />
                <Box onClick={onInputClick} id="cell-8" data={8} className="sequence-cell" />
                <Box onClick={onInputClick} id="cell-9" data={9} className="sequence-cell" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box onClick={onInputClick} id="cell-4" data={4} className="sequence-cell" />
                <Box onClick={onInputClick} id="cell-5" data={5} className="sequence-cell" />
                <Box onClick={onInputClick} id="cell-6" data={6} className="sequence-cell" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Box onClick={onInputClick} id="cell-1" data={1} className="sequence-cell" />
                <Box onClick={onInputClick} id="cell-2" data={2} className="sequence-cell" />
                <Box onClick={onInputClick} id="cell-3" data={3} className="sequence-cell" />
            </Box>
        </>
    )
}
