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
    const imageUrls = [
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/83a1b4c3-8114-4d19-892d-408ed758a1ea/3f411371-af7f-4b28-921f-8883c5c5126a-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/2812d427-3be1-4e43-81df-189eaca3f9e8/d838a3bf-77bb-426b-96ae-47105f260887-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/b17c756d-99f6-4fe5-9107-48e6ec222671/ee0d09f7-1f3b-4f70-bb1b-08e83d74ea1b-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/e4abcb30-582c-4072-8b97-8819ad7d9ac8/f590780f-eeec-4a24-9eaf-2dada93459bb-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/2eb0bd84-a3f5-4e1a-b7ba-e1d8a611111f/f68626e2-0dba-4df4-a79c-8dfb8938ff3e-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/8646e5eb-ac3e-4f4c-864d-1f16adc76c72/08a5087d-cd08-49a2-82dd-4738cb2182bd-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/d0cf4d2a-bf43-4ce1-95b0-9992f01901bf/f842e927-824f-49f6-8710-124e7f517ed6-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/listings/maincategories/31033cd2-dd2b-4621-9317-8b64162a33af/fa560df5-8ea4-4625-a6c6-aa0cd0b36968-mainCategory-icon.png?x-img=v1/resize,w_250/optimize,q_80,lossless_false/autorotate',
    ];

    const sliderImageUrls = [
        'https://achareh.co/cdnimages/production.achareh.ir/delegates/slidercollections/206686a9-7288-4a42-ab85-4b2867de3ad1/370786fb-a43d-4621-abed-3640adb.jpg?x-img=v1/resize,w_2000/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/delegates/slidercollections/d6b59d91-ed92-49ab-b348-439bf664854e/93f69fbd-5ecd-46be-a4cf-5774d56.jpg?x-img=v1/resize,w_2000/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/delegates/slidercollections/b2a17e1b-1c19-430e-b72c-20954793f065/4bf107a8-d6e2-4e26-9910-fec25b2.jpg?x-img=v1/resize,w_2000/optimize,q_80,lossless_false/autorotate',
        'https://achareh.co/cdnimages/production.achareh.ir/delegates/slidercollections/ad25b7e4-bb02-4977-b8c8-e132d8d784f3/75ece76e-82a8-4054-b710-437f426.jpg?x-img=v1/resize,w_2000/optimize,q_80,lossless_false/autorotate',
    ];

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Container>
                        {currentUser ? ( // Check if user is logged in
                            <div>
                                <Typography className={classes.text} variant="h2">
                                    {t('welcomeMessage')}, {currentUser.displayName}
                                </Typography>
                                <br/>
                            </div>
                        ) : (
                            <div>
                                {/* If not logged in, show login options */}
                                <Typography className={classes.text} variant="h2">
                                    {t('welcomeMessage')}
                                </Typography>
                                <br/>
                            </div>
                        )}
                        </Container>
                        <ServiceSearch services={services}/>
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
                            <Grid item xs={8}>
                                <ImageSlider images={sliderImageUrls} />
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <img alt='test' width={'95%'} height={95} src='https://achareh.co/cdnimages/production.achareh.ir/delegates/slidercollections/ad25b7e4-bb02-4977-b8c8-e132d8d784f3/75ece76e-82a8-4054-b710-437f426.jpg?x-img=v1/resize,w_2000/optimize,q_80,lossless_false/autorotate' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <img alt='test' width={'95%'} height={95} src='https://achareh.co/cdnimages/production.achareh.ir/delegates/slidercollections/ad25b7e4-bb02-4977-b8c8-e132d8d784f3/75ece76e-82a8-4054-b710-437f426.jpg?x-img=v1/resize,w_2000/optimize,q_80,lossless_false/autorotate' />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MultiImagesSlider />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Banner imageUrl='https://s3.achareh.co/production.achareh.ir/delegates/bannercollections/15e49f2c-117d-4782-9cbe-d3e06559fbb1/1c09c7a5-059a-4b3a-aadb-47b6e16.jpg?x-img=v1/resize,w_2500/optimize,q_80,lossless_false/autorotate' />
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
                    <Grid item xs={6}>
                        <Banner imageUrl='https://s3.achareh.co/production.achareh.ir/delegates/bannercollections/188d63d0-6f45-4323-9b9f-529dc230a836/f33e8dc8-3ba7-415a-89a7-65e06e3.jpg?x-img=v1/resize,w_1250/optimize,q_80,lossless_false/autorotate' />
                    </Grid>
                    <Grid item xs={6}>
                        <Banner imageUrl='https://s3.achareh.co/production.achareh.ir/delegates/bannercollections/720c23ec-c279-4657-86de-a8c960f69983/8170da8f-a38a-4ac2-a7e4-b59e94b.jpg?x-img=v1/resize,w_1250/optimize,q_80,lossless_false/autorotate' />
                    </Grid>
                </Grid>
                <br />
            </Box>
        </Container>
    );
};

export default HomePage;
