import React, { useContext, useState } from 'react';
import { Container, Typography, Box, Button, Divider, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  summary: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  loginButton: {
    marginTop: theme.spacing(2),
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCount: {
    display: 'flex',
    alignItems: 'center',
  },
  itemCountButton: {
    minWidth: '32px',
    margin: theme.spacing(0, 1),
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { cart, removeFromCart, calculateTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [itemCounts, setItemCounts] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const handleIncrease = (id) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  };

  const handleDecrease = (id) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max(prevCounts[id] - 1, 1),
    }));
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setItemCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[id];
      return updatedCounts;
    });
  };

  const totalAmount = calculateTotal() + 49; // Example fixed tax and fee

  const handleCheckout = async () => {
    if (!currentUser) {
      alert(t('loginToBook'));
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/booking', {
        userId: currentUser.uid,
        services: cart.map((service) => ({
          id: service.id,
          title: t(service.title), // Using translation key for service title
          price: service.price,
          count: itemCounts[service.id],
        })),
      });

      clearCart(); // Assuming clearCart function clears the cart in CartContext
      navigate('/confirmation'); // Navigate to confirmation page after successful booking
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  // Check if cart is empty
  if (cart.length === 0) {
    navigate('/services'); // Redirect to services page if cart is empty
    return null; // Optionally return a message or null to prevent rendering
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        {t('checkout')}
      </Typography>
      {!currentUser ? (
        <Paper className={classes.paper}>
          <Typography variant="body1">{t('loginToBook')}</Typography><br/>
          <GoogleLoginButton/>
        </Paper>
      ) : (
        <div>
          {cart.map((service) => (
            <Paper className={classes.paper} key={service.id}>
              <Typography variant="h6">{t(service.title)}</Typography>
              <Box className={classes.item}>
                <Typography variant="body1">₹{service.price}</Typography>
                <Box className={classes.itemCount}>
                  <Button
                    variant="outlined"
                    className={classes.itemCountButton}
                    onClick={() => handleDecrease(service.id)}
                  >
                    -
                  </Button>
                  <Typography variant="body1">{itemCounts[service.id]}</Typography>
                  <Button
                    variant="outlined"
                    className={classes.itemCountButton}
                    onClick={() => handleIncrease(service.id)}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.itemCountButton}
                    onClick={() => handleRemove(service.id)}
                  >
                    {t('remove')}
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}
          <Paper className={classes.summary}>
            <Typography variant="h6">{t('paymentSummary')}</Typography>
            <Box className={classes.item}>
              <Typography variant="body1">{t('itemTotal')}</Typography>
              <Typography variant="body1">₹{calculateTotal()}</Typography>
            </Box>
            <Box className={classes.item}>
              <Typography variant="body1">{t('taxesAndFee')}</Typography>
              <Typography variant="body1">₹49</Typography>
            </Box>
            <Divider className={classes.section} />
            <Box className={classes.item}>
              <Typography variant="body1">{t('total')}</Typography>
              <Typography variant="body1">₹{totalAmount}</Typography>
            </Box>
            <Box className={classes.item}>
              <Typography variant="body1" fontWeight="bold">
                {t('amountToPay')}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ₹{totalAmount}
              </Typography>
            </Box><br/>
            <Button variant="contained" color="secondary" onClick={handleCheckout}>
              {t('checkout')}
            </Button>
          </Paper>
        </div>
      )}
    </Container>
  );
};

export default Checkout;
