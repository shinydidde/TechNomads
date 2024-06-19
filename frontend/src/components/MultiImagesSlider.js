import React from 'react';
import { Container } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ServiceCard from './ServiceCard';
import '../components/styles.css';

const MultiImagesSlider = () => {

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
                    <ServiceCard
                        image="https://achareh.co/cdnimages/production.achareh.ir/listings/services/080b11de-c907-491f-93e6-c5de2a95c5cb/banner.jpg?x-img=v1/resize,w_600/optimize,q_80,lossless_false/autorotate"
                        title="Service 1"
                        description="Description of Service 1"
                    />
                    <ServiceCard
                        image="https://achareh.co/cdnimages/production.achareh.ir/listings/services/c37788fa-211b-4692-8553-80c7fc3b448e/banner.jpg?x-img=v1/resize,w_600/optimize,q_80,lossless_false/autorotate"
                        title="Service 1"
                        description="Description of Service 1"
                    />
                    <ServiceCard
                        image="https://achareh.co/cdnimages/production.achareh.ir/listings/services/84915787-6b50-4199-986f-88137d4b7734/banner.jpg?x-img=v1/resize,w_600/optimize,q_80,lossless_false/autorotate"
                        title="Service 1"
                        description="Description of Service 1"
                    />
                    <ServiceCard
                        image="https://achareh.co/cdnimages/production.achareh.ir/listings/services/4b4f661e-9775-4dbb-aaf4-7a7645f884f2/banner.jpg?x-img=v1/resize,w_600/optimize,q_80,lossless_false/autorotate"
                        title="Service 1"
                        description="Description of Service 1"
                    />
                    <ServiceCard
                        image="https://achareh.co/cdnimages/production.achareh.ir/listings/services/84915787-6b50-4199-986f-88137d4b7734/banner.jpg?x-img=v1/resize,w_600/optimize,q_80,lossless_false/autorotate"
                        title="Service 1"
                        description="Description of Service 1"
                    />
                    <ServiceCard
                        image="https://achareh.co/cdnimages/production.achareh.ir/listings/services/d5c4528c-04ce-41a9-b967-623f5f133049/banner.jpg?x-img=v1/resize,w_600/optimize,q_80,lossless_false/autorotate"
                        title="Service 1"
                        description="Description of Service 1"
                    />
            </Slider>
        </Container>
    );
};

export default MultiImagesSlider;
