import { Box, Button } from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


export default function CourseDash() {

    const  navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    useEffect(() =>{
        console.log("CourseDash useEffect");
        loadCourses();
    })

    const loadCourses = async () => {
        const result = await axios.get('http://localhost:8081/api/course')
        setCourses(result.data);
    }

    return (
        <Box sx={{ padding: 10 }}>

            <Button variant="outlined" startIcon={<AppRegistrationIcon/>} color="primary" sx={{ marginBottom: 2 }} 
                    onClick={() => navigate('/courseCreate')}>
                Create Course
            </Button>
            <h1>Course Dash</h1>
            <p>Welcome to the Course Dashboard!</p>

            {courses.map((course) => (
                    <Box key={course.id} sx={{backgroundColor:'#eee', width:400, height:350, borderRadius:5}}>
                    <Box sx={{alignItems:'center', display:'flex', flexDirection:'column', margin:2 }}>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <p>Instructor: {course.instructor}</p>
                    <p>Duration: {course.duration}</p>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}
