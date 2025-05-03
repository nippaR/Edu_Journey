import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function CourseDash() {
    const navigate = useNavigate();


    const [courses, setCourses] = useState([]);

    useEffect(() => {
        console.log("CourseDash useEffect triggered");
        loadCourses();
    }, []); // Add dependency array to avoid infinite loop

    const loadCourses = async () => {
        try {
            const result = await axios.get('http://localhost:8081/api/course');
            console.log("API Response:", result.data);

            if (Array.isArray(result.data)) {
                setCourses(result.data);
            } else {
                console.error("Expected an array but got:", result.data);
                setCourses([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error loading courses:", error);
            setCourses([]);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/course/${id}`);
            loadCourses(); // Refresh course list after deletion
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return (
        <Box sx={{ padding: 10 }}>
            <Stack direction="row" spacing={2} gap={110}>
                <Box>
                    <h1>Course Dash</h1>
                    <p>Welcome to the Course Dashboard!</p>
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

            <Stack direction="row" spacing={1} sx={{ mt: 8, gap: 2, ml:5, flexWrap: 'wrap' }}>
                {courses.map((course) => (
                    <Box key={course.id} sx={{ backgroundColor: '#eee', width: 400, height: 350, borderRadius: 5 }}>
                        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', margin: 2 }}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <p>Instructor: {course.instructor}</p>
                            <p>Duration: {course.duration}</p>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: 2 }}>
                            <Button variant="outlined" color="secondary" onClick={() =>  navigate(`/courseEdit/${course.id}`) }>
                                Edit
                            </Button>
                            <Button variant="contained" color="error" onClick={() => deleteCourse(course.id)}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
