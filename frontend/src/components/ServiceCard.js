import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';

const ServiceCard = ({ image, title, description }) => {
    return (
        <Grid key={title} container spacing={2} justifyContent="center">
            <Grid item xs={11}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image={image}
                        height={100}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="small" component="div">
                            {description}
                        </Typography>
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    );
};

export default ServiceCard;
