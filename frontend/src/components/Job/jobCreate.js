import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function JobCreate() {

    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <Box>
            <Typography variant='h1' sx={{textAlign:'center', marginTop:10, fontSize:65, fontFamily:'poppins', fontWeight:450}}>
                Find your next <br/> great hire
            </Typography>
            <Typography variant='h6' sx={{textAlign:'center', marginTop:2, fontSize:16, fontFamily:'poppins', fontWeight:450}}>
                80% jobs get qualified applicant in one day
            </Typography>

            <form onSubmit={(e) => onSubmit(e)}>
            <Box sx={{display:'flex', justifyContent:'center', marginTop:5, flexDirection:'column', alignItems:'center'}}>

                <TextField
                    id="outlined-basic"
                    label="Job Title"
                    variant="outlined"
                    required
                    sx={{width:450, marginRight:2}}
                />

                <Button variant="contained" color="primary" sx={{height:45, width:350, fontSize:20, fontFamily:'poppins', fontWeight:450, marginTop:3, borderRadius:3}}
                        type='submit'
                        onClick={() => {
                            navigate('/jobCreate2');
                            handleRefresh();
                            alert('Job posted successfully!');
                        }}>
                    Post on my own
                </Button>
            </Box>
            </form>
            <Typography variant='h6' sx={{textAlign:'center', marginTop:5, fontSize:13, fontFamily:'poppins', fontWeight:450}}>
                Limits may apply to free job post <Link to={'/profile'}>  LearnMore</Link>
            </Typography>
        </Box>
    )
}