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
                Welcome to Genie, your ultimate destination for personalized services tailored to your needs. At Genie, we believe in the magic of convenience and excellence. Our platform connects you with a wide range of professional services, ensuring that whatever you need, we can make it happen.
                </Typography>
                <Typography variant="body1" paragraph>
                Whether you’re looking for home services, event planning, or personal care, Genie offers a curated selection of top-rated professionals ready to deliver exceptional results. Our easy-to-use interface allows you to browse, book, and manage your services seamlessly.
                Our team is composed of skilled professionals who are passionate about their work and strive to deliver exceptional results.
                </Typography>
                <Typography variant="body1" paragraph>
                At Genie, your satisfaction is our top priority. We strive to provide an unparalleled experience, making your life easier and more enjoyable. Join our community of satisfied customers and experience the magic of Genie today!
                Thank you for choosing us. We look forward to serving you!
                </Typography>
            </Paper>
        </Container>
    );
};

export default AboutUs;
