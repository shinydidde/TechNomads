import React, { useContext } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';

const Services = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const services = t('servicesList', { returnObjects: true });
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleServiceClick = (service) => {
    navigate(`/service/${service.id}`);
  };

  const isInCart = (service) => {
    return cart.some(item => item.id === service.id);
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" gutterBottom>
          {t('ourServices')}
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card>
                <CardMedia component="img" height="140" image={service.image} alt={service.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 2 }}>
                    <Button size='small' variant="outlined" color="primary" onClick={() => handleServiceClick(service)}>
                      {t('viewDetails')}
                    </Button>
                    {isInCart(service) ? (
                      <Button
                        size='small'
                        variant="outlined"
                        color="primary"
                        onClick={() => removeFromCart(service.id)}
                      >
                        {t('removeFromCart')}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={() => addToCart(service)}
                      >
                        {t('addToCart')}
                      </Button>
                    )}
                  </Box>
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
