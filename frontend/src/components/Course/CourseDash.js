import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import IMG1 from '../../Assets/Cbg1.jpg'

export default function CourseDash() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        console.log("CourseDash useEffect triggered");
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const result = await axios.get('http://localhost:8081/api/course');
            console.log("API Response:", result.data);

            if (Array.isArray(result.data)) {
                setCourses(result.data);
            } else {
                console.error("Expected an array but got:", result.data);
                setCourses([]);
            }
        } catch (error) {
            console.error("Error loading courses:", error);
            setCourses([]);
        }
    };
    
    return (
        <Box>
            <Box sx={{backgroundColor: '#e2fefc', width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundImage: `url(${IMG1})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
            <Stack direction="row" spacing={2} gap={110}>
            
                <Box>
                    <Typography sx={{color:'white', fontSize:40}}>Course Page</Typography>
                    <Box sx={{
                        width: '180px',
                        height: '2px',
                        backgroundColor: 'white',
                        alignSelf: 'stretch',
                        ml: 1.0
                    }} />
                </Box>

                <Box>
                    <Button
                        variant="contained"
                        startIcon={<AppRegistrationIcon />}
                        color="primary"
                        sx={{ mt: 5 }}
                        onClick={() => navigate('/courseCreate')}
                    >
                        Create Course
                    </Button>
                </Box>
            </Stack>
            </Box>
            <Box sx={{paddingLeft:5, paddingBottom:20, mt:10}}>
            <Stack direction="row" spacing={1} sx={{ mt:5,gap: 5, ml: 5, flexWrap: 'wrap' }}>
                {courses.map((course) => (
                    <Box key={course.id} sx={{ backgroundColor: '#e3f3fe', width: 420, height: 420, borderRadius: 5,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                                            '&:hover': {transform: 'scale(1.1)'}, transform: 'scale(1)',
                                            transition: 'transform 0.3s ease-in-out',
                    }}>
                        <Box sx={{ alignItems: 'left', display: 'flex', flexDirection: 'column', margin: 2 }}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <p>Instructor: {course.instructor}</p>
                            <p>Duration: {course.duration}</p>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate(`/courseview/${course.id}`)}
                            >
                                Enroll Now
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Stack>
            </Box>
        </Box>
    );
}
