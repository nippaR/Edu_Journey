import { useState, useEffect } from 'react'
import {Box, Typography, Grid, TextField, Stack, Button} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function CourseEdit() {

    const navigate = useNavigate();
    const handleRefresh = () => {
        window.location.reload();
    }

    const [course, setCourse] = useState({
        title:'',
        instructor:'',
        description:'',
        duration:'',
        keywords:'',
        level:''
    })

    const { id } = useParams();

    const { title, instructor, description, duration, keywords, level } = course;

    const onInputChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/api/course/${id}`, course);
        navigate('/coursedash');
    }

    const loadCourse = async () => {
        const result = await axios.get(`http://localhost:8081/api/course/${id}`)
        setCourse(result.data);
    }
    useEffect(() => {
        loadCourse();
    }, []);

    return (
        <Grid>
            <form onSubmit={(e) => onSubmit(e)}>
            <Box sx={{ backgroundColor: '#00facc', width: '100%', height: 300 }}>

                <Typography variant='h1' sx={{ textAlign: 'center', fontSize: 65, fontFamily: 'poppins', fontWeight: 450, padding: 4 }}>
                    Share your knowledge  <br /> with our community
                </Typography>
                <Typography variant='h6' sx={{ textAlign: 'center', mt: 1, fontSize: 16, fontFamily: 'poppins', fontWeight: 450 }}>
                    80% jobs get qualified applicant in one day
                </Typography>
            </Box>

            <Box>
                <Typography sx={{ ml: 2, mt: 5, fontSize: 10, fontFamily: 'poppins', fontWeight: 450 }}>
                    * indicates required field
                </Typography>
        </Box>

        <Box sx={{  display: 'flex',
                    flexDirection: 'column',
                    my: 5, ml: 15,
                    border: '3px solid #aff99ff', borderRadius: 2, padding: 2,
                    width:'80%', boxShadow: 2
                    }}>
        
        <Typography sx={{ ml: 2, my: 3, fontSize: 20, fontFamily: 'poppins', fontWeight: 450, textAlign: 'center' }}>
            Course About Section*
        </Typography>

        <Stack  display='flex' justifyContent='center' direction= 'row' gap={15} sx={{flexWrap:'wrap'}}>
            <TextField
                    id="course-title"
                    label="Course Title"
                    variant="filled"
                    name="title"
                    value={title}
                    color='success'
                    onChange={onInputChange}
                    required
                    sx={{
                        width: 450,
                        ml: 5,
                        mt: 3,
                        backgroundColor:'#d8fff8'
                    }} />

            <TextField
                    id="course-title"
                    label="Instructor Name"
                    variant="filled"
                    name="instructor"
                    value={instructor}
                    color='success'
                    onChange={onInputChange}
                    required
                    sx={{
                        width: 450,
                        ml: 5,
                        mt: 3,
                        backgroundColor:'#d8fff8'
                    }} />

            <TextField
                    id="course-title"
                    label="Description"
                    variant="filled"
                    name="description"
                    value={description}
                    color='success'
                    onChange={onInputChange}
                    required
                    sx={{
                        width: 450,
                        ml: 5,
                        backgroundColor:'#d8fff8'
                    }} />
            <Box>
            <TextField
                    id="course-title"
                    label="Duration"
                    variant="filled"
                    name="duration"
                    value={duration}
                    color='success'
                    required
                    onChange={onInputChange}
                    sx={{
                        width: 450,
                        ml: 5,
                        backgroundColor:'#d8fff8'
                    }}
                    />
            </Box>
            <TextField
                    id="course-title"
                    label="Key Words"
                    variant="filled"
                    name="keywords"
                    value={keywords}
                    onChange={onInputChange}
                    color='success'
                    required
                    sx={{
                        width: 450,
                        ml: 5,
                        mb:5,
                        backgroundColor:'#d8fff8'
                    }}
                    />

            <TextField
                    id="course-title"
                    label="Level"
                    variant="filled"
                    name="level"
                    value={level}
                    color='success'
                    onChange={onInputChange}
                    required
                    sx={{
                        width: 450,
                        ml: 5,
                        mb:5,
                        backgroundColor:'#d8fff8'
                    }} />
        </Stack>
        </Box>

        <Stack direction="row" gap={5} justifyContent="flex-end" sx={{ mr: 10 }}>
                <Button
                    variant="contained"
                    type='submit'
                    color="primary"
                    sx={{ height: 35, width: 120, fontFamily: 'poppins', fontWeight: 450,mb:5, borderRadius: 1 }}>
                    Submit
                </Button>
        
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ height: 35, width: 120, fontFamily: 'poppins', fontWeight: 450, mb: 5, borderRadius: 1 }}
                    onClick={() => {handleRefresh();
                                    navigate('/courseCreate')}
                    }>
                    Clear
                </Button>
        </Stack>
        </form>
        </Grid>
    )
}