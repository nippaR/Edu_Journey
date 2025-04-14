import { Box, Stack, TextField, Typography, MenuItem, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import JobCreate3 from './JobCreate3';


const currencies = [
        {
        value: 'onsite',
        label: 'On-site',
        },
        {
        value: 'hybrid',
        label: 'Hybrid',
        },
        {
        value: 'remote',
        label: 'Remote',
        }
    ];

const jobType = [
        {
        value: 'fulltime',
        label: 'Full-time',
        },
        {
        value: 'partTime',
        label:'Part-Time',
        }
]


export default function JobCreate2() {

    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant='h1' sx={{marginLeft:10, marginTop:10, fontSize:25, fontFamily:'poppins', fontWeight:450}}>
                Job details*
            </Typography>
            <Box sx={{ marginTop:5, display:'flex', flexDirection:'column'}}>

                <Stack xs={1} direction="row" spacing={2} gap={5} sx={{ my:2, ml:10 }}>

                    <TextField /*id="filled-basic" label="Job Title" variant="filled"*/ disabled
                    sx={{
                        width:450,
                        marginRight:2,
                        marginLeft:10,
                        marginBottom:2
                    }}/>

                    <TextField id="filled-basic" label="Company" variant="filled"
                    sx={{
                        width:450,
                        my:5,
                        marginLeft:10,
                    }}/>

                </Stack>
                <Stack xs={1} direction="row" spacing={2} gap={5} sx={{ mt:5, ml:10 }}>
                    <TextField
                            id="filled-select-currency"
                            select
                            label="Workplace Type"
                            defaultValue="onsite"
                            helperText="Please select workplace type"
                            variant="filled"

                            sx={{
                                width:450,
                                marginLeft:10
                            }}

                            >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>


                    <TextField id="filled-basic" label="Job location" variant="filled"
                        sx={{
                            width:450,
                            marginLeft:10,
                        }}/>
                
                </Stack>

                <TextField
                            id="filled-select-currency"
                            select
                            label="Job Type"
                            defaultValue="fulltime"
                            helperText="Please select job type"
                            variant="filled"

                            sx={{
                                width:450,
                                marginLeft:10,
                                my:5
                            }}

                            >
                            {jobType.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                </TextField>

        {/* ===========================================Job Description=============================================== */}
        
                <Box sx={{
            
                }}>
                        <TextField
                                id="filled-multiline-flexible"
                                label="Job Description"
                                multiline
                                rows={15}
                                variant="filled"
                        sx={{
                            width:950,
                            marginRight:2,
                            marginLeft:10,
                            marginBottom:2
                        }}
                        />
                </Box>

                <JobCreate3/>
                
            </Box>

            <Stack direction="row" gap={5} justifyContent="flex-end" sx={{ mt:5, mr:10 }}>
                <Button variant='contained' color='primary' sx={{height:35, width:120, fontFamily:'poppins', fontWeight:450, my:5, borderRadius:1}}
                onClick={() => navigate('/jobdash')}>
                    Submit
                </Button>

                <Button variant='outlined' color='error' sx={{height:35, width:120,fontFamily:'poppins', fontWeight:450, my:5, borderRadius:1}}
                onClick={() => navigate('/jobCreate')}>
                    Cancel
                </Button>
                </Stack>
        </Box>
    )
}
