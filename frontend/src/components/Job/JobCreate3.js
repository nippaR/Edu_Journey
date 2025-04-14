import { Box, Typography, TextField, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const contactMethod = [
    {
    value: 'email',
    label: 'By email',
    },
    {
    value: 'phone',
    label: 'By Phone',
    },
    {
    value: 'linkedin',
    label: 'By LinkedIn',
    },
];

export default function JobCreate3() {
const [contactLabel, setContactLabel] = useState('Contact Email');

const handleContactMethodChange = (event) => {
    const selectedValue = event.target.value;
    let newLabel = 'Contact Email';

    if (selectedValue === 'phone') {
        newLabel = 'Contact Phone';
    } else if (selectedValue === 'linkedin') {
        newLabel = 'LinkedIn Profile';
    }

    setContactLabel(newLabel);
};

    return (
        <Box>
        <Typography sx={{ fontFamily: 'poppins', fontSize: 25, fontWeight: 'semi-bold', ml: 10, mt: 5 }}>
            Applicant Collection
        </Typography>

        <TextField
            id="filled-select-currency"
            select
            label="Receive Applicant"
            defaultValue="email"
            helperText="Receive Applications by"
            variant="filled"
            onChange={handleContactMethodChange}
            sx={{
            width: 450,
            marginLeft: 10,
            my: 5,
            }}
        >
            {contactMethod.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
            ))}
        </TextField>

        <TextField
            id="filled-basic"
            label={contactLabel}
            variant="filled"
            sx={{
            width: 450,
            marginLeft: 10,
            my: 5,
            }}
        />
        </Box>
    );
}