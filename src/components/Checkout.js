import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Divider, Paper, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleLoginButton from './GoogleLoginButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import i18n from '../i18n';

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
        width: '100px'
    },
    dateInput: {
        marginBottom: theme.spacing(2),
    },
}));

const Checkout = () => {
    const classes = useStyles();
    const { t } = useTranslation(); // Initialize the useTranslation hook

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
    const [expanded, setExpanded] = useState('panel1'); // Panel 2 (Booking Details) open by default
    const [mobileFieldFilled, setMobileFieldFilled] = useState(false); // State to track if mobile field is filled

    useEffect(() => {
        // Check if mobile field is filled
        setMobileFieldFilled(matchIsValidTel(phoneNumber));
    }, [phoneNumber]);

    const handleChange = (panel) => (event, isExpanded) => {
        // Check if mobile field is filled before allowing panel change
        if (!mobileFieldFilled) {
            setPhoneNumberError(t('fillMobileField'));
        } else {
            setExpanded(isExpanded ? panel : false);
            setPhoneNumberError('');
        }
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        setItemCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts };
            delete updatedCounts[id];
            return updatedCounts;
        });
    };

    const totalAmount = calculateTotal() + 4; // Example fixed tax and fee

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
            setPhoneNumberError(t('invalidPhoneNumber'));
            return;
        }

        try {
            // Translate the cart items to English before sending to the backend
            const translatedCart = cart.map((service) => ({
                id: service.id,
                title: i18n.t(service.title, { lng: 'en' }),
                price: service.price,
                count: itemCounts[service.id],
            }));

            const response = await axios.post('https://u13u7uffbc.execute-api.eu-west-1.amazonaws.com/Development/booking', {
                userId: currentUser.uid,
                services: translatedCart,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                phoneNumber: phoneNumber,
            });
            const { body: { uniqueIdentifier } } = response.data;
            clearCart();
            navigate(`/confirmation?bookingId=${uniqueIdentifier}`);
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
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>{t('bookingDetails')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper className={classes.paper}>
                                <Box>
                                    <TextField
                                        id="start-date"
                                        label={t('startDate')}
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
                                        label={t('endDate')}
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
                                        label={t('mobile')}
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
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {t('cartItems')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {mobileFieldFilled ? (
                                cart.map((service) => (
                                    <Paper className={classes.paper} key={service.id}>
                                        <Box className={classes.item}>
                                            <img className={classes.img} src={service.image} alt='' />
                                            <Typography variant="h6">{t(service.title)} - €{service.price}</Typography>
                                            <Box className={classes.itemCount}>
                                                <IconButton
                                                    color='secondary'
                                                    className={classes.itemCountButton}
                                                    onClick={() => handleRemove(service.id)}
                                                ><DeleteIcon /></IconButton>
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))
                            ) : (
                                <Typography variant="body1">{t('fillMobileToViewCart')}</Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {t('paymentSummary')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper className={classes.summary}>
                                <Box className={classes.item}>
                                    <Typography variant="body1">{t('itemTotal')}</Typography>
                                    <Typography variant="body1">€{calculateTotal()}</Typography>
                                </Box>
                                <Box className={classes.item}>
                                    <Typography variant="body1">{t('taxesAndFee')}</Typography>
                                    <Typography variant="body1">€4</Typography>
                                </Box>
                                <Divider className={classes.section} />
                                <Box className={classes.item}>
                                    <Typography variant="body1">{t('total')}</Typography>
                                    <Typography variant="body1">€{totalAmount}</Typography>
                                </Box>
                                <Box className={classes.item}>
                                    <Typography variant="body1" fontWeight="bold">
                                        {t('amountToPay')}
                                    </Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        €{totalAmount}
                                    </Typography>
                                </Box><br />
                                <Button variant="contained" color="secondary" onClick={handleClickOpen} disabled={!mobileFieldFilled}>
                                    {t('checkout')}
                                </Button>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                </div>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('confirmBooking')}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <DialogContentText>
                        {t('reviewBookingDetails')}
                    </DialogContentText><br />
                    <Typography variant="h6">{t('bookingDetails')}</Typography>
                    <Typography>{t('startDate')}: {startDate.toISOString().slice(0, 10)}</Typography>
                    <Typography>{t('endDate')}: {endDate ? endDate.toISOString().slice(0, 10) : t('N/A')}</Typography>
                    <Typography>{t('mobile')}: {phoneNumber}</Typography><br />
                    <Typography variant="h6" className={classes.section}>{t('cartDetails')}</Typography>
                    {cart.map((service) => (
                        <Box key={service.id}>
                            <Typography>{t(service.title)} - €{service.price}</Typography>
                        </Box>
                    ))}
                    <Typography>{t('taxesAndFee')} - €4</Typography>
                    <Divider className={classes.section} />
                    <Typography mt={2}><b>{t('totalAmount')}: €{totalAmount}</b></Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color="primary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleConfirm} variant='contained' color="secondary">
                        {t('confirm')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Checkout;
