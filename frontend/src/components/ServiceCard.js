import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '480px'
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
    const { t } = useTranslation();

    const isInCart = cart.some(item => item.id === service.id);

    if (!service) {
        return null;
    }

    return (
        <Grid key={service.title} container spacing={2} justifyContent="center">
            <Grid item xs={11}>
                    <Card className={classes.card}>
                        <Link className={classes.link} to={'/service/' + service.id}>
                        <CardMedia
                            component="img"
                            alt={service.title}
                            image={service.image}
                            className={classes.media}
                        />
                        </Link>
                        <CardContent className={classes.cardContent}>
                        <Link className={classes.link} to={'/service/' + service.id}>
                            <Typography gutterBottom variant="h5" component="div">
                                {t(service.title)} - €{service.price}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {service.description}
                            </Typography>
                            </Link>
                            <Box className={classes.buttonContainer}>
                                <Button
                                    variant={isInCart ? "outlined" : "contained"}
                                    color="primary"
                                    size="small"
                                    onClick={() => isInCart ? removeFromCart(service.id) : addToCart(service)}
                                >
                                    {isInCart ? t('removeFromCart') : t('addToCart')}
                                </Button>
                            </Box>
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
