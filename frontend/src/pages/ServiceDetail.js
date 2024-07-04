import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const service = {
        id: id,
        name: `Service ${id}`,
        description: `This is a detailed description for Service ${id}.`,
        price: 50,
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">{service.name}</Typography>
                    <Typography>{service.description}</Typography>
                    <Typography variant="h6">{t('price')}: ${service.price}</Typography>
                    <Button variant="contained" color="primary" component={Link} to={`/services/${id}/book`}>
                        {t('bookService')}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ServiceDetail;
