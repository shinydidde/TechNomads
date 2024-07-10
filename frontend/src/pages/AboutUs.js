import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImageSlider from '../components/ImageSlider';
import { sliderImageUrls } from '../services/images';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
    },
}));

const AboutUs = () => {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <ImageSlider images={sliderImageUrls} />
                    </Grid>
                </Grid>
                <Typography variant="body1" paragraph>
                    Welcome to our company! We are dedicated to providing the best services to our customers.
                </Typography>
                <Typography variant="body1" paragraph>
                    Our team is composed of skilled professionals who are passionate about their work and strive to deliver exceptional results.
                </Typography>
                <Typography variant="body1" paragraph>
                    Thank you for choosing us. We look forward to serving you!
                </Typography>
            </Paper>
        </Container>
    );
};

export default AboutUs;
