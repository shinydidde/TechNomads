import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(4),
    },
    formField: {
        marginBottom: theme.spacing(2),
    },
}));

const ContactUs = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={classes.formField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <br/><br/>
                    <TextField
                        className={classes.formField}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    /><br/><br/>
                    <TextField
                        className={classes.formField}
                        label="Message"
                        variant="outlined"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                        rows={4}
                        required
                    /><br/><br/>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ContactUs;
