import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    sliderImage: {
        width: '100%',
        height: 'auto',
    },
}));

const ImageSlider = ({ images }) => {
    const classes = useStyles();

    const settings = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear',
        arrows: false,
    };

    return (
        <Container>
            <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img width='100%' src={image} alt={`Slide ${index}`} className={classes.sliderImage} />
                            </div>
                        ))}
                    </Slider>
        </Container>
    );
};

export default ImageSlider;
