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
        'https://static.vecteezy.com/system/resources/previews/010/718/038/non_2x/woman-painter-painting-wall-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/010/718/343/non_2x/carpenter-working-in-a-workshop-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/012/047/951/non_2x/woman-getting-hair-incubation-at-hairdresser-shop-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/001/984/801/large_2x/housekeeping-team-with-cleaning-equipment-free-vector.jpg',
        'https://cdni.iconscout.com/illustration-pack/preview/hair-salon-18-155393.png',
        'https://static.vecteezy.com/system/resources/previews/007/784/048/non_2x/plumber-workers-working-in-the-home-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/010/719/386/non_2x/construction-workers-building-the-wall-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/025/452/599/non_2x/contractor-oversees-hvac-installation-in-office-building-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/012/047/937/non_2x/carpenter-working-in-a-workshop-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/005/051/177/non_2x/plumber-workers-working-in-the-home-illustration-concept-flat-illustration-isolated-on-white-background-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/008/516/700/non_2x/construction-workers-arranging-interior-vector.jpg',
        'https://static.vecteezy.com/system/resources/previews/013/612/644/large_2x/lighting-and-electricity-energy-maintenance-service-panel-cabinet-of-technician-electrical-work-on-flat-cartoon-hand-drawn-templates-illustration-vector.jpg'
    ];

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
                                    <img alt='test' width={'70%'} src='https://static.vecteezy.com/system/resources/previews/016/593/045/large_2x/air-conditioner-repairman-compressor-home-services-install-clean-maintenance-house-delivery-team-graphic-isometric-isolated-vector.jpg' />
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
