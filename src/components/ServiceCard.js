import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '500px'
    },
    media: {
        height: 150,
        objectFit: 'cover',
    },
    cardContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
}));

const ServiceCard = ({ service }) => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const classes = useStyles();

    const isInCart = cart.some(item => item.id === service.id);

    if (!service) {
        return null;
    }

    return (
        <Grid key={service.title} container spacing={2} justifyContent="center">
            <Grid item xs={11}>
                <Link className={classes.link} to={'/service/' + service.id}>
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt={service.title}
                            image={service.image}
                            className={classes.media}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="div">
                                {service.title} - €{service.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {service.description}
                            </Typography>
                            <Box className={classes.buttonContainer}>
                                <Button
                                    variant={isInCart ? "outlined" : "contained"}
                                    color="secondary"
                                    size="small"
                                    onClick={() => isInCart ? removeFromCart(service.id) : addToCart(service)}
                                >
                                    {isInCart ? "Remove from Cart" : "Add to Cart"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Link>
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
