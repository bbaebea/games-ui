import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Save({ warnings, loading, onSubmit, title = 0, ...others }) {
    const [privacy, setPrivacy] = useState(false)
    return (
        <Dialog sx={{color: 'black'}} {...others}>
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <Box component="form" onSubmit={onSubmit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField autoComplete="off" required id="display_name" fullWidth inputProps={{ sx: { color: 'black' } }} InputLabelProps={{ sx: { color: 'black' } }} sx={{ color: 'black' }} label="Display Name (Leaderboards)" />
                            {
                                warnings?.display_name ?
                                    <Typography color="error.light">
                                        {warnings.display_name}
                                    </Typography>
                                    : null
                            }
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField autoComplete="off" required id="first_name" fullWidth inputProps={{ sx: { color: 'black' } }} InputLabelProps={{ sx: { color: 'black' } }} sx={{ color: 'black' }} label="First Name" />
                            {
                                warnings?.first_name ?
                                    <Typography color="error.light">
                                        {warnings.first_name}
                                    </Typography>
                                    : null
                            }
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField autoComplete="off" required id="last_name" fullWidth inputProps={{ sx: { color: 'black' } }} InputLabelProps={{ sx: { color: 'black' } }} sx={{ color: 'black' }} label="Last Name" />
                            {
                                warnings?.last_name ?
                                    <Typography color="error.light">
                                        {warnings.last_name}
                                    </Typography>
                                    : null
                            }
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField autoComplete="off" required id="contact_number" fullWidth inputProps={{ sx: { color: 'black' } }} InputLabelProps={{ sx: { color: 'black' } }} sx={{ color: 'black' }} label="Contact Number" />
                            {
                                warnings?.contact_number ?
                                    <Typography color="error.light">
                                        {warnings.contact_number}
                                    </Typography>
                                    : null
                            }
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField autoComplete="off" required id="email" type="email" fullWidth inputProps={{ sx: { color: 'black' } }} InputLabelProps={{ sx: { color: 'black' } }} sx={{ color: 'black' }} label="Email Address" />
                            {
                                warnings?.email ?
                                    <Typography color="error.light">
                                        {warnings.email}
                                    </Typography>
                                    : null
                            }
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                <Checkbox required checked={privacy} onChange={() => setPrivacy(!privacy)} id="checkbox-privacy" sx={{ color: 'black' }} />
                                <FormLabel htmlFor='checkbox-privacy' sx={{ color: 'black' }}>
                                    Accept MFI Polytechnic Institute Inc. <Link to="https://privacy.mfi.org.ph" target="_blank">Terms & Condition.</Link>
                                </FormLabel>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Button disabled={loading} type="submit" variant="contained" color="success" fullWidth>Submit</Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
