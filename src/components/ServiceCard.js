import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
import { CartContext } from '../context/CartContext';

const ServiceCard = ({ service }) => {
  const { cart, addToCart } = useContext(CartContext);

  const isInCart = cart.some(item => item.id === service.id);

  if (!service) {
    return null;
  }

  return (
    <Grid key={service.title} container spacing={2} justifyContent="center">
      <Grid item xs={11}>
        <Card>
          <CardMedia
            component="img"
            alt={service.title}
            image={service.image}
            height={100}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {service.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {service.description}
            </Typography>
            <br/>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => addToCart(service)}
              disabled={isInCart}
            >
              {isInCart ? "Added" : "Add to Cart"}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceCard;
