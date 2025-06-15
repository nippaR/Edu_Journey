import { Box, Stack, TextField, Typography, MenuItem, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import JobCreate3 from './JobCreate3';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import IMG1 from '../../Assets/jobcc1.png'



export default function JobEdit() {

const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    workplaceType: '',
    jobType: '',
    description: ''
    });

const deleteJob = async (id) => {
        await axios.delete(`http://localhost:8081/api/job/${id}`)
        loadJob();
    };

useEffect(() =>{
        console.log("JobDash useEffect");
        loadJob();
    },[])

const navigate = useNavigate();

const {id} = useParams();

const { title, company, location, workplaceType, jobType, description } = job;


const loadJob = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/api/job/${id}`);
            setJob(result.data);
        } catch (error) {
            console.error("Error loading course:", error);
        }
    };

useEffect(() => {
    loadJob();
}, []);



    return (
        <Box>
        <Typography
            variant="h1"
            sx={{ marginLeft: 10, marginTop: 10, fontSize: 25, fontFamily: 'poppins', fontWeight: 450 }}
        >
            Job details
        </Typography>

            <Typography
                    variant='h3'
                    sx={{
                        fontSize: 40,
                        fontFamily: 'poppins',
                        fontWeight: 450,
                        paddingTop: 4,
                        paddingLeft: 77
                    }}
                >
                    {title}
                </Typography>

                <Stack direction="row" spacing={1} sx={{mt: 8, justifyContent:'flex-end',mr:10, gap: 2, flexWrap: 'wrap'}}>
                    <Chip label={company} color="primary" variant="outlined" />
                    <Chip label={location} color="primary" variant="outlined" />
                    <Chip label={workplaceType} color="primary" variant="outlined" />
                    <Chip label={jobType} color="primary" variant="outlined" />
                </Stack>
                <Box sx={{width:'80%'}}>
                <Typography sx={{
                    fontSize: 18,
                    fontFamily: 'poppins',
                    fontWeight: 350,
                    my: 7,
                    TextAlign: 'left',
                    ml:10
                }}>
                    {description}
                </Typography>
                </Box>

                <img src={IMG1} alt="Course" style={{ width: '80', height: 'auto', marginLeft:100 }} />

                <Box gap={2} sx={{display:'flex', justifyContent:'flex-end', marginBottom:2, mr:10 }}>
                    <Button variant="outlined" color="secondary" onClick={() => navigate(`/jobEdit/${job.id}`)}> Edit </Button>
                    <Button variant='contained' color='error' onClick={() => deleteJob(job.id)}> Delete </Button>
                </Box>
        
        </Box>
    );
}
