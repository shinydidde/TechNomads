import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    name: 'Service 1',
    description: 'Description of service 1',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Service 2',
    description: 'Description of service 2',
    imageUrl: 'https://via.placeholder.com/150',
  },
  // Add more services as needed
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate(`/service/${service.id}`);
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card>
                <CardMedia component="img" height="140" image={service.imageUrl} alt={service.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => handleServiceClick(service)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Services;
