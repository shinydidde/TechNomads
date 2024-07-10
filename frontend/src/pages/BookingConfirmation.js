import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext to provide current user info
import GoogleLoginButton from '../components/GoogleLoginButton';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
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
    const { currentUser } = useAuth(); // Get the current user from AuthContext

    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        if (bookingId && currentUser) { // Only fetch booking details if the user is logged in
            // Make API call to fetch booking details
            axios.get(`https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/confirmation/${bookingId}`)
                .then(response => {
                    setBookingDetails(response.data.body);
                })
                .catch(error => {
                    console.error('Error fetching booking details:', error);
                });
        }
    }, [bookingId, currentUser]);

    if (!currentUser) {
        return (
            <Container className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    {t('bookingConfirmation')}
                </Typography>
                <Paper className={classes.paper}>
                    <Typography variant="body1">{t('loginToViewBooking')}</Typography><br />
                    <GoogleLoginButton />
                </Paper>
            </Container>
        );
    }

    if (!bookingDetails) {
        return (
            <Container className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    {t('bookingConfirmation')}
                </Typography>
                <Paper className={classes.paper}>
                    <Typography variant="body1">
                        {t('loadingBookingDetails')}
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {t('bookingConfirmation')}
            </Typography>
            <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.bookingDetails}>
                    {t('bookingId')}: {bookingDetails.bookingId}
                </Typography>
                <Typography variant="body1" className={classes.bookingDetails}>
                    {t('startDate')}: {bookingDetails.startDate}
                </Typography>
                <Typography variant="body1" className={classes.bookingDetails}>
                    {t('endDate')}: {bookingDetails.endDate}
                </Typography>
                <Typography variant="body1" className={classes.bookingDetails}>
                    {t('mobile')}: {bookingDetails.phoneNumber}
                </Typography>
                <Typography variant="h6" mt={2} className={classes.bookingDetails}>
                    {t('servicesBooked')}
                </Typography>
                {bookingDetails.services.map((service) => (
                    <Typography key={service.id} variant="body1" className={classes.bookingDetails}>
                        {t(service.title)} - €{service.price}
                    </Typography>
                ))}
                <Typography variant="h6" mt={2} className={classes.bookingDetails}>
                    {t('totalAmount')}: €{bookingDetails.totalAmount}
                </Typography>
            </Paper>
        </Container>
    );
};

export default BookingConfirmation;
