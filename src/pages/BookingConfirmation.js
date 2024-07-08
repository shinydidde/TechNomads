import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

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

    // Simulated booking details (replace with actual data from API or state)
    const bookingDetails = {
        bookingId: '123456789',
        startDate: '2024-07-10',
        endDate: '2024-07-11',
        services: [
            { id: 1, title: 'Service 1', price: 100 },
            { id: 2, title: 'Service 2', price: 150 },
        ],
        totalAmount: 250,
        phoneNumber: '+1234567890',
        // Add more details as needed
    };

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
                        {service.title} - ₹{service.price}
                    </Typography>
                ))}
                <Typography variant="h6" className={classes.bookingDetails}>
                    {t('Total Amount')}: ₹{bookingDetails.totalAmount}
                </Typography>
            </Paper>
        </Container>
    );
};

export default BookingConfirmation;
