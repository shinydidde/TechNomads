import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

const ServiceItem = ({ imageUrl, altText }) => {
    return (
        <Grid item xs={1}>
            <a href='/'>
                <img
                    className="ServiceItem"
                    src={imageUrl}
                    alt={altText}
                />
            </a>
        </Grid>
    );
};

ServiceItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

export default ServiceItem;
