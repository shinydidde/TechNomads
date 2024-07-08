import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    bookingDetails: {
        marginBottom: theme.spacing(2),
    },
}));

const BookingConfirmation = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const location = useLocation();
    const bookingId = new URLSearchParams(location.search).get('bookingId'); // Extract bookingId from query param

    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        if (bookingId) {
            // Make API call to fetch booking details
            axios.get(`https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/confirmation/${bookingId}`)
                .then(response => {
                    setBookingDetails(response.data);
                })
                .catch(error => {
                    console.error('Error fetching booking details:', error);
                });
        }
    }, [bookingId]);

    if (!bookingDetails) {
        return null; // Optionally, show loading indicator or error message if data is being fetched
    }

    console.log(bookingDetails);

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {t('Booking Confirmation')}
            </Typography>
            <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.bookingDetails}>
                    {t('Booking ID')}: {bookingDetails.bookingId}
                </Typography>
                <Typography variant="body1" className={classes.bookingDetails}>
                    {t('Start Date')}: {bookingDetails.startDate}
                </Typography>
                <Typography variant="body1" className={classes.bookingDetails}>
                    {t('End Date')}: {bookingDetails.endDate}
                </Typography>
                <Typography variant="body1" className={classes.bookingDetails}>
                    {t('Mobile')}: {bookingDetails.phoneNumber}
                </Typography>
                <Typography variant="h6" className={classes.bookingDetails}>
                    {t('Services Booked')}
                </Typography>
                {bookingDetails.services.map((service) => (
                    <Typography key={service.id} variant="body1" className={classes.bookingDetails}>
                        {service.title} - €{service.price}
                    </Typography>
                ))}
                <Typography variant="h6" className={classes.bookingDetails}>
                    {t('Total Amount')}: €{bookingDetails.totalAmount}
                </Typography>
            </Paper>
        </Container>
    );
};

export default BookingConfirmation;
