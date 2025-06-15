import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

const FooterComponent = () => {
    return (
        <Box sx={{ bgcolor: '#1a1a2e', color: '#fff', py: 4 }}>
        <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize:25, color:'#048bf1' }}>
                Edu Journey
                </Typography>
            </Grid>

            <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ABOUT
                </Typography>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 1 }}>Edu Journey</Link>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block' }}>Tailwind CSS</Link>
            </Grid>

            <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                FOLLOW US
                </Typography>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 1 }}>Github</Link>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block' }}>Discord</Link>
            </Grid>

            <Grid item xs={12} md={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                LEGAL
                </Typography>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block', mb: 1 }}>Privacy Policy</Link>
                <Link href="#" underline="none" color="inherit" sx={{ display: 'block' }}>Terms & Conditions</Link>
            </Grid>
            </Grid>

            <Box sx={{ borderTop: '1px solid #333', mt: 4, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
                © 2025 Edu Journey™
            </Typography>
            <Box>
                <IconButton href="#" sx={{ color: '#fff' }}><FacebookIcon /></IconButton>
                <IconButton href="#" sx={{ color: '#fff' }}><InstagramIcon /></IconButton>
                <IconButton href="#" sx={{ color: '#fff' }}><TwitterIcon /></IconButton>
                <IconButton href="#" sx={{ color: '#fff' }}><GitHubIcon /></IconButton>
                <IconButton href="#" sx={{ color: '#fff' }}><LanguageIcon /></IconButton>
            </Box>
            </Box>
        </Container>
        </Box>
    );
};

export default FooterComponent;
