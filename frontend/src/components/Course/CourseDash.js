import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

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
            <Box sx={{backgroundColor: '#e2fefc', width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack direction="row" spacing={2} gap={110}>
            
                <Box>
                    <h1>Course Page</h1>
                    <Box sx={{
                        width: '180px',
                        height: '2px',
                        backgroundColor: '#000',
                        alignSelf: 'stretch',
                        ml: 1.0
                    }} />
                </Box>

                <Box>
                    <Button
                        variant="outlined"
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
            <Box sx={{paddingLeft:5, paddingBottom:10}}>
            <Stack direction="row" spacing={1} sx={{ mt:5,ml:10,gap: 2, ml: 5, flexWrap: 'wrap' }}>
                {courses.map((course) => (
                    <Box key={course.id} sx={{ backgroundColor: '#eee', width: 400, height: 350, borderRadius: 5 }}>
                        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', margin: 2 }}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <p>Instructor: {course.instructor}</p>
                            <p>Duration: {course.duration}</p>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
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
