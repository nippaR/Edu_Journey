import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import IMG1 from '../../../src/Assets/c.png';

export default function CourseEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [course, setCourse] = useState({
        title: '',
        instructor: '',
        description: '',
        duration: '',
        keywords: '',
        level: ''
    });

    const loadCourse = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/api/course/${id}`);
            setCourse(result.data);
        } catch (error) {
            console.error("Error loading course:", error);
        }
    };

    const deleteCourse = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/course/${id}`);
            navigate('/coursedash');
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    useEffect(() => {
        loadCourse();
    }, [id]);

    const { title, instructor } = course;

    return (
        <Grid container direction="column" alignItems="center">
            <Box sx={{ backgroundColor: '#e2fefc', width: '100%', height: 300 }}>
                <Typography
                    variant='h3'
                    sx={{
                        fontSize: 40,
                        fontFamily: 'poppins',
                        fontWeight: 450,
                        paddingTop: 4,
                        paddingLeft: 4
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        mt: 4,
                        fontSize: 16,
                        fontFamily: 'poppins',
                        ml: 5
                    }}
                >
                    Instructor: {instructor}
                </Typography>
                <Button
                    variant='outlined'
                    color='success'
                    sx={{
                        ml: 5,
                        mt: 10,
                        width: 250,
                        height: 50,
                        fontSize: 15,
                        fontFamily: 'poppins',
                        fontWeight: 450
                    }}
                    onClick={() => navigate('/coursedash')}
                >
                    Enroll Now
                </Button>
            </Box>

            <img src={IMG1} alt="Course" style={{ width: '100%', height: 'auto' }} />

            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Box justifyContent="flex-end" sx={{ display: 'flex', gap: 2, my: 5 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate(`/courseEdit/${course.id}`)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteCourse}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
}
