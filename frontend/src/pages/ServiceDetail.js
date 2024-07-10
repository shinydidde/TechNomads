import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const ServiceDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const classes = useStyles();
  const { addToCart, cart, removeFromCart } = useContext(CartContext);

  // Assuming your services are defined in translations
  const services = t('servicesList', { returnObjects: true });

  // Find the selected service by id
  const service = services.find((s) => s.id === parseInt(id));

  if (!service) {
    return (
      <Container className={classes.root}>
        <Typography variant="h4">{t('serviceNotFound')}</Typography>
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <motion.img
              src={service.image}
              alt={service.title}
              className={classes.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="h4">{t(service.title)}</Typography>
            <Typography variant="body1" mt={2}>
              {service.description}
            </Typography>
            <Typography variant="body1" mt={2}>
              {t('price')} : €{service.price}
            </Typography><br/>
              <Box>
              {isInCart ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleRemoveFromCart}
                  className={classes.button}
                >
                  {t('removeFromCart')}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  className={classes.button}
                >
                  {t('addToCart')}
                </Button>
              )}
              </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceDetail;
