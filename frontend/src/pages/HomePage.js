import React from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import ServiceSearch from '../components/ServiceSearch';
import ServiceItem from '../components/ServiceItem';
import ImageSlider from '../components/ImageSlider';
import '../components/styles.css';
import MultiImagesSlider from '../components/MultiImagesSlider';
import Banner from '../components/Banner';
import { useAuth } from '../context/AuthContext';
import { imageUrls, sliderImageUrls } from '../services/images';

const useStyles = makeStyles((theme) => ({
    text: {
        textAlign: theme.direction === 'rtl' ? 'right' : 'left',
    },
}));

const HomePage = () => {
    const { t } = useTranslation();
    const services = t('servicesList', { returnObjects: true });
    const classes = useStyles();
    const { currentUser } = useAuth();

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Container>
                            {currentUser ? ( // Check if user is logged in
                                <div>
                                    <Typography className={classes.text} variant="h3">
                                        {t('welcomeMessage')}, {currentUser.displayName}
                                    </Typography>
                                    <br />
                                </div>
                            ) : (
                                <div>
                                    {/* If not logged in, show login options */}
                                    <Typography className={classes.text} variant="h3">
                                        {t('welcomeMessage')}
                                    </Typography>
                                    <br />
                                </div>
                            )}
                        </Container>
                        <ServiceSearch services={services} />
                        <br />
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">
                            {imageUrls.map((url, index) => (
                                <ServiceItem
                                    key={index}
                                    imageUrl={url}
                                    altText={`Category ${index + 1}`}
                                />
                            ))}
                        </Grid>
                        <br />
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={7}>
                                <ImageSlider images={sliderImageUrls} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Grid container spacing={2}>
                                    <img alt='test' width={'100%'} src='https://static.vecteezy.com/system/resources/previews/016/593/045/large_2x/air-conditioner-repairman-compressor-home-services-install-clean-maintenance-house-delivery-team-graphic-isometric-isolated-vector.jpg' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Typography textAlign='center' mb={5} variant="h4">
                                        {t('ourServices')}
                                    </Typography>
                        <MultiImagesSlider />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Banner imageUrl='https://static.vecteezy.com/system/resources/previews/019/572/885/large_2x/repair-furniture-and-building-icons-set-vector.jpg' />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MultiImagesSlider />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <Banner imageUrl='https://s3.achareh.co/production.achareh.ir/delegates/bannercollections/188d63d0-6f45-4323-9b9f-529dc230a836/f33e8dc8-3ba7-415a-89a7-65e06e3.jpg?x-img=v1/resize,w_1250/optimize,q_80,lossless_false/autorotate' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Banner imageUrl='https://s3.achareh.co/production.achareh.ir/delegates/bannercollections/720c23ec-c279-4657-86de-a8c960f69983/8170da8f-a38a-4ac2-a7e4-b59e94b.jpg?x-img=v1/resize,w_1250/optimize,q_80,lossless_false/autorotate' />
                    </Grid>
                </Grid>
                <br />
            </Box>
        </Container>
    );
};

export default HomePage;
