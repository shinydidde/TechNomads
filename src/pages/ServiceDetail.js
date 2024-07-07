import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const ServiceDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const classes = useStyles();
  const { addToCart, cart, removeFromCart } = useContext(CartContext);

  // Assuming your services are defined in translations
  const services = t('services', { returnObjects: true });

  // Find the selected service by id
  const service = services.find((s) => s.id === parseInt(id));

  if (!service) {
    return (
      <Container className={classes.root}>
        <Typography variant="h4">Service not found</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(service);
  };

  const isInCart = cart.some((item) => item.id === service.id);

  const handleRemoveFromCart = () => {
    removeFromCart(service.id);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4">{service.title}</Typography>
      <Box mt={2}>
        <img src={service.image} alt={service.title} className={classes.image} />
      </Box>
      <Typography variant="body1" mt={2}>
        {service.description}
      </Typography>
      <Typography variant="body1" mt={2}>
        Price: ₹{service.price}
      </Typography>
      <Grid container justifyContent="flex-start" spacing={2} mt={4}>
        {isInCart ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRemoveFromCart}
            className={classes.button}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            className={classes.button}
          >
            Add to Cart
          </Button>
        )}
      </Grid>
    </Container>
  );
};

export default ServiceDetail;
