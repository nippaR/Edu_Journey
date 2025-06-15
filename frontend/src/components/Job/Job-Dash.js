import {React, useEffect, useState } from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useNavigate } from 'react-router-dom';


export default function JobDash() {

    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);

    useEffect(() =>{
        console.log("JobDash useEffect");
        loadJobs();
    },[])

    const loadJobs = async () => {
        const result = await axios.get('http://localhost:8081/api/job')
        setJobs(result.data);
    }

    

    return (
        <Grid sx={{ padding: 10 }}>

            <Button variant="outlined" startIcon={<AppRegistrationIcon/>} color="primary" sx={{ marginBottom: 2 }} 
                    onClick={() => navigate('/jobCreate2')}>
                Post a Job
            </Button>

            <Typography sx={{fontSize:30, fontFamily:'poppins', textAlign:'center', fontWeight:450}}>Job Listings</Typography>
            <Typography sx={{fontFamily:'poppins', fontSize:20, textAlign:'center', mt:0.2, mb:5}}>Find your dream job</Typography>

            <Box sx={{mb:10, width:'100%'}}><hr/></Box>

            <Stack direction="row" spacing={1} sx={{marginBottom: 2, gap: 8, flexWrap: 'wrap' }}>
                {jobs.map((job) => (
                    <Box key={job.id} sx={{ width:350,
                                            height:400,
                                            borderRadius:5,
                                            backdropFilter:'blur(10)',
                                            backgroundColor: 'rgba(0, 208, 255, 0.4)',
                                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                            '&:hover': {transform: 'scale(1.1)'}, transform: 'scale(1)',
                                            transition: 'transform 0.3s ease-in-out',}}>

                        <Box sx={{alignItems:'center', display:'flex', flexDirection:'column', margin:2 }}>

                        <h2>{job.title}</h2>
                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Job Type: {job.jobType}</p>
                        <p>Workplace Type: {job.workplaceType}</p>

                        </Box>

                        <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:2 }}>
                        <Button variant="contained" color="primary" onClick={() => {navigate(`/jobView/${job.id}`) }}> Apply Now </Button>
                        </Box>
                        
                    </Box>
                ))}
            </Stack>
        </Grid>
    )
}