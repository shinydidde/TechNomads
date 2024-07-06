import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

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
}));

const ServiceDetail = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Service Detail
      </Typography>
      <Typography variant="h6">Classic bathroom cleaning</Typography>
      <Typography variant="body1" paragraph>
        Detailed description of the service...
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/checkout"
      >
        Book Now
      </Button>
    </Container>
  );
};

export default ServiceDetail;
