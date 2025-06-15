import { Box, Stack, TextField, Typography, MenuItem, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import JobCreate3 from './JobCreate3';
import axios from 'axios';

const currencies = [
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'remote', label: 'Remote' }
];

const jobsType = [
    { value: 'fulltime', label: 'Full-time' },
    { value: 'partTime', label: 'Part-Time' }
];

export default function JobEdit() {
const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    workplaceType: '',
    jobType: '',
    description: ''
    });

const navigate = useNavigate();

const {id} = useParams();

const { title, company, location, workplaceType, jobType, description } = job;

const onInputChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    };

const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8081/api/job/${id}`, job);
    navigate(`/jobView/${job.id}`);
};

const loadJob = async () => {
    const result = await axios.get(`http://localhost:8081/api/job/${id}`)
    setJob(result.data);
}
useEffect(() => {
    loadJob();
}, []);



    return (
        <Box>
        <Typography
            variant="h1"
            sx={{ marginLeft: 10, marginTop: 10, fontSize: 25, fontFamily: 'poppins', fontWeight: 450 }}
        >
            Job details*
        </Typography>

        <form onSubmit={(e) => onSubmit(e)}>

            <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" spacing={2} gap={5} sx={{ my: 2, ml: 10 }}>
                <TextField
                    id="job-title"
                    label="Job Title"
                    variant="filled"
                    name="title"
                    value={title}
                    onChange={onInputChange}
                    required
                    sx={{
                    width: 450,
                    marginRight: 2,
                    marginLeft: 10,
                    marginBottom: 2
                    }}
                />

                <TextField
                    id="company"
                    label="Company"
                    variant="filled"
                    name="company"
                    value={company}
                    onChange={onInputChange}
                    required
                    sx={{
                    width: 450,
                    my: 5,
                    marginLeft: 10
                    }}
                />
                </Stack>

                <Stack direction="row" spacing={2} gap={5} sx={{ mt: 5, ml: 10 }}>
                <TextField
                    id="workplaceType"
                    select
                    label="Workplace Type"
                    name="workplaceType"
                    helperText="Please select workplace type"
                    variant="filled"
                    value={workplaceType}
                    onChange={onInputChange}
                    required
                    sx={{ width: 450, marginLeft: 10 }}
                >
                    {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="location"
                    label="Job location"
                    variant="filled"
                    name="location"
                    value={location}
                    onChange={onInputChange}
                    required
                    sx={{ width: 450, marginLeft: 10 }}
                />
                </Stack>

                <TextField
                id="jobType"
                select
                label="Job Type"
                name="jobType"
                helperText="Please select job type"
                variant="filled"
                value={jobType}
                onChange={onInputChange}
                required
                sx={{ width: 450, marginLeft: 10, my: 5 }}
                >
                {jobsType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>

                {/* Job Description */}
                <Box>
                <TextField
                    id="description"
                    label="Job Description"
                    name="description"
                    multiline
                    rows={15}
                    variant="filled"
                    value={description}
                    onChange={onInputChange}
                    required
                    sx={{
                    width: 950,
                    marginRight: 2,
                    marginLeft: 10,
                    marginBottom: 2
                    }}
                />
                </Box>

                {/* <JobCreate3 /> */}
            </Box>

            <Stack direction="row" gap={5} justifyContent="flex-end" sx={{ mt: 5, mr: 10 }}>
                <Button
                variant="contained"
                type='submit'
                color="primary"
                sx={{ height: 35, width: 120, fontFamily: 'poppins', fontWeight: 450, my: 5, borderRadius: 1 }}>
                Submit
                </Button>

                <Button
                variant="outlined"
                color="error"
                sx={{ height: 35, width: 120, fontFamily: 'poppins', fontWeight: 450, my: 5, borderRadius: 1 }}
                onClick={() => navigate('/jobCreate')}
                >
                Cancel
                </Button>
            </Stack>
        </form>
        </Box>
    );
}
