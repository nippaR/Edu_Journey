import {React, useEffect, useState } from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
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
                    onClick={() => navigate('/jobCreate')}>
                Post a Job
            </Button>

            <h1>Job Dash</h1>
            <p>Welcome to the Job Dashboard!</p>

            <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                {jobs.map((job) => (
                    <Box key={job.id} sx={{backgroundColor:'#eee', width:400, height:450, borderRadius:5}}>
                        <Box sx={{alignItems:'center', display:'flex', flexDirection:'column', margin:2 }}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>Company: {job.company}</p>
                        <p>Location: {job.location}</p>
                        <p>Job Type: {job.jobType}</p>
                        <p>Workplace Type: {job.workplaceType}</p>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:2 }}>
                        <Button variant="contained" color="primary" onClick={() => alert(`Applied to ${job.title}`)}> Apply Now </Button>
                        <Button variant="outlined" color="secondary" onClick={() => alert(`Saved ${job.title}`)}> Edit </Button>
                        <Button variant='contained' color='error' onClick={() => alert(`Deleted ${job.title}`)}> Delete </Button>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Grid>
    )
}