import React, { useContext, useState } from 'react';
import { Container, Typography, Box, Button, Divider, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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
  const { currentUser } = useAuth();
  const { cart, removeFromCart, calculateTotal } = useContext(CartContext);

  const [itemCounts, setItemCounts] = useState(cart.reduce((acc, item) => {
    acc[item.id] = 1;
    return acc;
  }, {}));

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

  const totalAmount = calculateTotal() + 49; // Example fixed tax and fee

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {!currentUser ? (
        <Paper className={classes.paper}>
          <Typography variant="body1">To book the service, please login or sign up</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.loginButton}
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Paper>
      ) : (
        <div>
          {cart.map((service) => (
            <Paper className={classes.paper} key={service.id}>
              <Typography variant="h6">{service.title}</Typography>
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
                    onClick={() => removeFromCart(service.id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </Paper>
          ))}
          <Paper className={classes.summary}>
            <Typography variant="h6">Payment summary</Typography>
            <Box className={classes.item}>
              <Typography variant="body1">Item total</Typography>
              <Typography variant="body1">₹{calculateTotal()}</Typography>
            </Box>
            <Box className={classes.item}>
              <Typography variant="body1">Taxes and Fee</Typography>
              <Typography variant="body1">₹49</Typography>
            </Box>
            <Divider className={classes.section} />
            <Box className={classes.item}>
              <Typography variant="body1">Total</Typography>
              <Typography variant="body1">₹{totalAmount}</Typography>
            </Box>
            <Box className={classes.item}>
              <Typography variant="body1" fontWeight="bold">Amount to pay</Typography>
              <Typography variant="body1" fontWeight="bold">₹{totalAmount}</Typography>
            </Box>
            <Button variant="text" color="primary">
              View breakup
            </Button>
          </Paper>
        </div>
      )}
    </Container>
  );
};

export default Checkout;
