import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/styles
import { CartContext } from '../context/CartContext';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 300, // Adjust the height as per your requirement
  },
  media: {
    height: 150, // Adjust the image height within the card
    objectFit: 'cover', // Ensure the image covers the designated area
  },
}));

const ServiceCard = ({ service }) => {
  const { cart, addToCart } = useContext(CartContext);
  const classes = useStyles();

  const isInCart = cart.some(item => item.id === service.id);

  if (!service) {
    return null;
  }

  return (
    <Grid key={service.title} container spacing={2} justifyContent="center">
      <Grid item xs={11}>
        <Card className={classes.card}>
          <CardMedia
            component="img"
            alt={service.title}
            image={service.image}
            className={classes.media}
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
              size='small'
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
