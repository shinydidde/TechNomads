// frontend/src/pages/ServiceDetail.js
import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ServiceDetail = ({ service }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleBooking = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Add booking logic here, for now just alert
    alert(`Service booked for ${date} at ${time}`);
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {service.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {service.description}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Book this service
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Select Date"
                type="date"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Select Time"
                type="time"
                fullWidth
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Additional Information"
                multiline
                rows={4}
                fullWidth
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleBooking}>
                Book Now
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiceDetail;
