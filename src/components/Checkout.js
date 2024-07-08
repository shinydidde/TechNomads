import React, { useContext, useState } from 'react';
import { Container, Typography, Box, Button, Divider, Paper, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

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
    summary: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[100],
    },
    loginButton: {
        marginTop: theme.spacing(2),
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemCount: {
        display: 'flex',
        alignItems: 'center',
    },
    itemCountButton: {
        minWidth: '20px',
        margin: theme.spacing(0, 1),
    },
    img: {
        width: '250px'
    },
    dateInput: {
        marginBottom: theme.spacing(2),
    },
}));

const Checkout = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { currentUser } = useAuth();
    const { cart, removeFromCart, calculateTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [itemCounts, setItemCounts] = useState(
        cart.reduce((acc, item) => {
            acc[item.id] = 1;
            return acc;
        }, {})
    );
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const defaultEndDate = new Date(startDate);
        defaultEndDate.setDate(startDate.getDate() + 1);
        return defaultEndDate;
    });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [open, setOpen] = useState(false); // State to control dialog

    const handleRemove = (id) => {
        removeFromCart(id);
        setItemCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts };
            delete updatedCounts[id];
            return updatedCounts;
        });
    };
    const totalAmount = calculateTotal() + 49; // Example fixed tax and fee

    const handlePhoneNumberChange = (newPhoneNumber) => {
        setPhoneNumber(newPhoneNumber);
        if (!matchIsValidTel(newPhoneNumber)) {
            setPhoneNumberError(t('Invalid phone number'));
        } else {
            setPhoneNumberError('');
        }
    };

    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1);

    const handleStartDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        setStartDate(selectedDate);

        const defaultEndDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
        setEndDate(defaultEndDate);

        if (selectedDate >= endDate) {
            setEndDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
        }
    };

    const handleEndDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        setEndDate(selectedDate);
    };

    const handleCheckout = async () => {
        if (!currentUser) {
            alert(t('loginToBook'));
            return;
        }
        if (!matchIsValidTel(phoneNumber)) {
            setPhoneNumberError(t('Invalid phone number'));
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/booking', {
                userId: currentUser.uid,
                services: cart.map((service) => ({
                    id: service.id,
                    title: service.title,
                    price: service.price,
                    count: itemCounts[service.id],
                })),
                startDate: startDate.toISOString(),
                endDate: endDate ? endDate.toISOString() : null,
                phoneNumber: phoneNumber,
            });

            clearCart();
            navigate('/confirmation');
        } catch (error) {
            console.error('Error during booking:', error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        handleCheckout();
        handleClose();
    };

    if (cart.length === 0) {
        navigate('/services');
        return null;
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {t('checkout')}
            </Typography>
            {!currentUser ? (
                <Paper className={classes.paper}>
                    <Typography variant="body1">{t('loginToBook')}</Typography><br />
                    <GoogleLoginButton />
                </Paper>
            ) : (
                <div>
                    {cart.map((service) => (
                        <Paper className={classes.paper} key={service.id}>
                            <Box className={classes.item}>
                                <img className={classes.img} src={service.image} alt='' />
                                <Typography variant="h6">{service.title} - ₹{service.price}</Typography>
                                <Box className={classes.itemCount}>
                                    <IconButton
                                        color='secondary'
                                        className={classes.itemCountButton}
                                        onClick={() => handleRemove(service.id)}
                                    ><DeleteIcon /></IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                    <Paper className={classes.paper}>
                        <Typography variant="h6">{t('Booking Details')}</Typography>
                        <br />
                        <Box>
                            <TextField
                                id="start-date"
                                label={t('Start Date')}
                                type="date"
                                value={startDate.toISOString().slice(0, 10)}
                                onChange={handleStartDateChange}
                                className={classes.dateInput}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 10),
                                }}
                            />
                            <TextField
                                id="end-date"
                                label={t('End Date')}
                                type="date"
                                value={endDate ? endDate.toISOString().slice(0, 10) : ''}
                                onChange={handleEndDateChange}
                                className={classes.dateInput}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: minEndDate.toISOString().slice(0, 10), // Minimum end date is the day after start date
                                }}
                            />
                            <MuiTelInput
                                id="phone-number"
                                label={t('Mobile')}
                                value={phoneNumber}
                                defaultCountry="IE"
                                onChange={handlePhoneNumberChange}
                                className={classes.dateInput}
                                required
                                error={Boolean(phoneNumberError)}
                                helperText={phoneNumberError}
                            />
                        </Box>
                    </Paper>
                    <Paper className={classes.summary}>
                        <Typography variant="h6">{t('paymentSummary')}</Typography>
                        <Box className={classes.item}>
                            <Typography variant="body1">{t('itemTotal')}</Typography>
                            <Typography variant="body1">₹{calculateTotal()}</Typography>
                        </Box>
                        <Box className={classes.item}>
                            <Typography variant="body1">{t('taxesAndFee')}</Typography>
                            <Typography variant="body1">₹49</Typography>
                        </Box>
                        <Divider className={classes.section} />
                        <Box className={classes.item}>
                            <Typography variant="body1">{t('total')}</Typography>
                            <Typography variant="body1">₹{totalAmount}</Typography>
                        </Box>
                        <Box className={classes.item}>
                            <Typography variant="body1" fontWeight="bold">
                                {t('amountToPay')}
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                ₹{totalAmount}
                            </Typography>
                        </Box><br />
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                            {t('checkout')}
                        </Button>
                    </Paper>
                </div>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('Confirm Your Booking')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('Please review your booking and cart details before confirming.')}
                    </DialogContentText><br/>
                    <Typography variant="h6">{t('Booking Details')}</Typography>
                    <Typography>{t('Start Date')}: {startDate.toISOString().slice(0, 10)}</Typography>
                    <Typography>{t('End Date')}: {endDate ? endDate.toISOString().slice(0, 10) : t('N/A')}</Typography>
                    <Typography>{t('Mobile')}: {phoneNumber}</Typography><br/>
                    <Typography variant="h6" className={classes.section}>{t('Cart Details')}</Typography>
                    {cart.map((service) => (
                        <Box key={service.id}>
                            <Typography>{service.title} - ₹{service.price}</Typography>
                        </Box>
                    ))}
                    <Typography>Taxes and Fee - ₹49</Typography>
                    <Divider className={classes.section} />
                    <Typography>{t('Total Amount')}: ₹{totalAmount}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('Cancel')}
                    </Button>
                    <Button onClick={handleConfirm} color="secondary">
                        {t('Confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Checkout;
