import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Paper, Box, Chip, Link, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Edit } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        position: 'relative'
    },
    link: {
        color: 'inherit'
    },
    bookingItem: {
        marginBottom: theme.spacing(2),
    },
    serviceItem: {
        marginLeft: theme.spacing(0),
    },
    activeChip: {
        backgroundColor: '#68b034 !important',
        color: 'black',
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        textTransform: 'capitalize'
    },
    inactiveChip: {
        backgroundColor: 'gray',
        color: 'black',
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        textTransform: 'capitalize'
    },
}));

const BookingsList = () => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const { t } = useTranslation();
    const [bookings, setBookings] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchBookings = useCallback(async () => {
        try {
            const response = await axios.get(`https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/mybookings/${currentUser.uid}`);
            setBookings(response.data.body.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            setIsLoggedIn(true);
            fetchBookings();
        } else {
            setIsLoggedIn(false);
        }
    }, [currentUser, fetchBookings]);

    if (!isLoggedIn) {
        return (
            <Container className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    {t('myBookings')}
                </Typography>
                <Paper className={classes.paper}>
                    <Typography variant="body1">{t('loginToViewBooking')}</Typography><br />
                    <GoogleLoginButton />
                </Paper>
            </Container>
        );
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {t('myBookings')}
            </Typography>
            {bookings.length === 0 ? (
                <Paper className={classes.paper}>
                    <Typography variant="body1">{t('noBookingsFound')}</Typography>
                </Paper>
            ) : (
                bookings.map((booking) => (
                    <Paper key={booking.bookingId} className={classes.paper}>
                        <Typography variant="h6" gutterBottom className={classes.bookingItem}>
                            { booking.status === 'active' ?
                                <Link className={classes.link} component={RouterLink} to={`/bookings/${booking.bookingId}/edit`} state={{ booking }}>
                                    {t('bookingId')}: {booking.bookingId}
                                    <IconButton
                                        color='secondary'
                                    ><Edit /></IconButton>
                                </Link>
                                :
                                <Link className={classes.link} disabled>
                                    {t('bookingId')}: {booking.bookingId}
                                </Link>
                            }
                        </Typography>
                        <Box className={classes.serviceItem}>
                            <Typography variant="body1" className={classes.bookingItem}>
                                {t('startDate')}: {booking.startDate}
                            </Typography>
                            <Typography variant="body1" className={classes.bookingItem}>
                                {t('endDate')}: {booking.endDate}
                            </Typography>
                            <Typography variant="body1" className={classes.bookingItem}>
                                {t('mobile')}: {booking.phoneNumber}
                            </Typography>
                        </Box>
                        <Typography mt={2} variant="h6" className={classes.bookingItem}>
                            {t('services')}
                        </Typography>
                        {booking.services.map((service, index) => (
                            <Box key={index} className={classes.serviceItem}>
                                <Typography variant="body1">
                                    {t(service.title)} - €{service.price} x {service.count}
                                </Typography>
                            </Box>
                        ))}
                        <Typography mt={2} variant="h6" className={classes.bookingItem}>
                            {t('totalAmount')}: €{booking.totalAmount}
                        </Typography>
                        <Chip size='small'
                            label={booking.status === 'active' ? t('active') : t('inactive')}
                            className={booking.status === 'active' ? classes.activeChip : classes.inactiveChip}
                        />
                    </Paper>
                ))
            )}
        </Container>
    );
};

export default BookingsList;
