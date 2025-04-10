import React from 'react'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function JobDash() {

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
        <Box sx={{ padding: 10 }}>
            <h1>Job Dash</h1>
            <p>Welcome to the Job Dashboard!</p>

            {jobs.map((job) => (
                <div key={job.id}>
                    <h2>{job.title}</h2>
                    <p>{job.description}</p>
                    <p>Company: {job.company}</p>
                    <p>Location: {job.location}</p>
                </div>
            ))}
        </Box>
    )
}