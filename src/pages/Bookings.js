import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
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
}));

const BookingsList = () => {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const { t } = useTranslation();
    const [bookings, setBookings] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/bookings/${currentUser.uid}`);
            setBookings(response.data.bookings);
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
                {t('My Bookings')}
            </Typography>
            {bookings.length === 0 ? (
                <Paper className={classes.paper}>
                    <Typography variant="body1">{t('No bookings found.')}</Typography>
                </Paper>
            ) : (
                bookings.map((booking) => (
                    <Paper key={booking.id} className={classes.paper}>
                        <Typography variant="h6" gutterBottom className={classes.bookingItem}>
                            {booking.bookingId}
                        </Typography>
                        <Typography variant="body1" className={classes.bookingItem}>
                            {t('Service')}: {booking.serviceName}
                        </Typography>
                        <Typography variant="body1" className={classes.bookingItem}>
                            {t('Start Date')}: {booking.startDate}
                        </Typography>
                        <Typography variant="body1" className={classes.bookingItem}>
                            {t('End Date')}: {booking.endDate}
                        </Typography>
                        {/* Add more details as needed */}
                    </Paper>
                ))
            )}
        </Container>
    );
};

export default BookingsList;
