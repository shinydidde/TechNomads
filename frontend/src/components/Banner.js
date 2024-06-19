import React from 'react';
import { Container } from '@mui/material';


const Banner = ({ imageUrl }) => {

    return (
        <Container>
            <img src={imageUrl} alt='' width='100%'/>
        </Container>
    );
};

export default Banner;
