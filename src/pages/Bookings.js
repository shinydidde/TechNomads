import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    bookingItem: {
        marginBottom: theme.spacing(2),
    },
    serviceItem: {
        marginLeft: theme.spacing(2),
    },
}));

const BookingsList = () => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const { t } = useTranslation();
    const [bookings, setBookings] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/mybookings/${currentUser.uid}`);
            setBookings(response.data.body.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchBookings();
        }
    }, [currentUser, fetchBookings]);

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
                            {t('bookingId')}: {booking.bookingId}
                        </Typography>
                        <Typography variant="body1" className={classes.bookingItem}>
                            {t('startDate')}: {booking.startDate}
                        </Typography>
                        <Typography variant="body1" className={classes.bookingItem}>
                            {t('endDate')}: {booking.endDate}
                        </Typography>
                        <Typography variant="body1" className={classes.bookingItem}>
                            {t('mobile')}: {booking.phoneNumber}
                        </Typography>
                        <Typography variant="h6" className={classes.bookingItem}>
                            {t('services')}
                        </Typography>
                        {booking.services.map((service, index) => (
                            <Box key={index} className={classes.serviceItem}>
                                <Typography variant="body1">
                                    {t(service.title)} - €{service.price} x {service.count}
                                </Typography>
                            </Box>
                        ))}
                        <Typography variant="h6" className={classes.bookingItem}>
                            {t('totalAmount')}: €{booking.totalAmount}
                        </Typography>
                    </Paper>
                ))
            )}
        </Container>
    );
};

export default BookingsList;
