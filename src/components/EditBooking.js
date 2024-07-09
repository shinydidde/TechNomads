import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { DeleteOutline } from '@mui/icons-material';

const EditBooking = () => {
    const location = useLocation();
    const { booking } = location.state; // Retrieve the booking details from state
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState(booking.phoneNumber);
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [startDate, setStartDate] = useState(new Date(booking.startDate));
    const [endDate, setEndDate] = useState(new Date(booking.endDate));
    const [dateError, setDateError] = useState('');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handlePhoneNumberChange = (newPhoneNumber) => {
        setPhoneNumber(newPhoneNumber);
        if (!matchIsValidTel(newPhoneNumber)) {
            setPhoneNumberError(t('invalidPhoneNumber'));
        } else {
            setPhoneNumberError('');
        }
    };

    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);

    const handleStartDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        if (selectedDate < today) {
            setDateError(t('cannotSelectPastDate'));
            return;
        }
        setStartDate(selectedDate);
        const defaultEndDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
        setEndDate(defaultEndDate);
        setDateError('');
    };

    const handleEndDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        if (selectedDate <= startDate) {
            setDateError(t('endDateAfterStartDate'));
        } else {
            setEndDate(selectedDate);
            setDateError('');
        }
    };

    const handleSave = async () => {
        if (!matchIsValidTel(phoneNumber)) {
            setPhoneNumberError(t('invalidPhoneNumber'));
            return;
        }
        if (endDate <= startDate) {
            setDateError(t('endDateAfterStartDate'));
            return;
        }

        try {
            await axios.put(`https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/booking/${booking.bookingId}`, {
                ...booking,
                phoneNumber: phoneNumber,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            });
            navigate('/bookings');
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/booking/${booking.bookingId}`);
            navigate('/bookings');
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {t('editBooking')}
            </Typography>
            <Paper style={{ padding: '16px', marginBottom: '16px' }}>
                <Box>
                    <TextField
                        label={t('startDate')}
                        type="date"
                        name="startDate"
                        value={startDate.toISOString().slice(0, 10)}
                        onChange={handleStartDateChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: today.toISOString().slice(0, 10),
                        }}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label={t('endDate')}
                        type="date"
                        name="endDate"
                        value={endDate.toISOString().slice(0, 10)}
                        onChange={handleEndDateChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: minEndDate.toISOString().slice(0, 10),
                        }}
                        style={{ marginBottom: '16px' }}
                        error={Boolean(dateError)}
                        helperText={dateError}
                    />
                    <MuiTelInput
                        label={t('mobile')}
                        value={phoneNumber}
                        defaultCountry="IE"
                        onChange={handlePhoneNumberChange}
                        fullWidth
                        error={Boolean(phoneNumberError)}
                        helperText={phoneNumberError}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '16px' }}>
                        {t('save')}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        <DeleteOutline/>
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default EditBooking;
