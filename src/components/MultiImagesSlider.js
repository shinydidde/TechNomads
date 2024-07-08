import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import ServiceCard from './ServiceCard';

const MultiImagesSlider = () => {
    const { t } = useTranslation();
    const services = t('services', { returnObjects: true }); // Assuming services are fetched from translations

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Container>
            <Slider {...settings}>
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </Slider>
        </Container>
    );
};

export default MultiImagesSlider;
