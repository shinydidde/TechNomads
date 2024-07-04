import React from 'react';
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ServiceItem = ({ id, imageUrl, altText }) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card>
                <CardActionArea component={Link} to={`/services/${id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageUrl}
                        alt={altText}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Service {id}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default ServiceItem;
